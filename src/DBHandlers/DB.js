import Dexie from 'dexie';
import { Comic } from "../classes/Comic";
import { Year } from "../classes/Year";
import { DB_NAME } from "../constants/cons";
import moment from "moment";

const db = new Dexie(DB_NAME);
db.version(1).stores({
  years: "&name",
  records: "&id, date, title",
  titles: "&title"
});

export class DB {
  addYear(year) {
    this.c('addYear');
    if (!(year instanceof Year)) {
      year = new Year({ name: year });
    }
    return db.years.put(year);
  }

  addDate(date) {
    this.c('addDate');
    date = moment(date);
    let dateYear = date.year();
    return db.years.get(dateYear)
      .then(dbYear => {
        if (dbYear) {
          let year = new Year(dbYear);
          year.addDate(date);
          return db.years.put(this.storable(year))
            .then(() => this.getYears());
        } else {
          return this.addYear(dateYear)
            .then(() => {
              return this.addDate(date);
            });
        }
      });
  }

  addRecord(record) {
    this.c('addRecord');
    if (!(record instanceof Comic)) {
      record = new Comic(record);
    }

    return db.records.add(record.storable)
      .then(() => {
        this.addTitle(record);
        return this.addDate(record.date);
      });
  }

  getYears() {
    this.c('getYears');
    return db.years.reverse().toArray()[0];
  }

  getYear(year) {
    this.c('getYear');
    return db.years.filter(record => record.name.toString() === year.toString()).toArray()[0];
  }

  storable(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  getRecordsFromYear(year) {
    this.c('getRecordsFromYear');
    if (year instanceof Year) {
      year = year.name;
    }

    return db.records
      .filter(record => {
        return record.date.split("-")[0] === year.toString();
      })
      .toArray();
  }

  updateRecord(record) {
    this.c('updateRecord');
    return db.records.update({ id: record.id }, record.storable).then(() => record);
  }

  deleteRecord(record) {
    this.c('deleteRecord');
    let res = {
      removedRecord: record,
      removedDate: false,
      removedYear: false,
      removedTitle: false,
      updatedDate: record.dateStr
    };
    return db.records.delete(record.id)
      .then(() => {
        return this.deleteTitle(record.title)
          .then(removedTitle => {
            res.removedTitle = removedTitle;
            return db.records.where({ date: res.updatedDate })
              .count()
              .then(count => {
                if (count === 0) { // Delete this date from years
                  res.removedDate = true;
                  return this.getYear(record.year)
                    .then(year => {
                      year = new Year(year[0]);
                      year.removeDate(res.updatedDate);
                      res.year = year;
                      let execution;
                      if (year.dates.length > 0) { // Update year
                        execution = this.updateYear;
                      } else { // Delete year
                        res.removedYear = true;
                        execution = this.deleteYear;
                      }

                      return execution.bind(this)(year).then(() => res);
                    });
                } else {
                  return res;
                }
              });
          });
      });
  }

  updateYear(year) {
    this.c('updateYear');
    return db.years.update({ name: year.name }, this.storable(year));
  }

  deleteYear(year) {
    this.c('deleteYear');
    return db.years.delete(year.name);
  }

  addTitle(record) {
    this.c('addTitle');
    return this.updateTitle(record.title)
      .then(data => db.titles.put({ title: record.title, total: data.total, last: data.last }));
  }

  getTitles() {
    this.c('getTitles');
    return db.titles.orderBy("title").toArray();
  }

  deleteTitle(title) {
    this.c('deleteTitle');
    return this.getRecordsByTitle(title)
      .then(records => {
        if (records.length === 0) {
          return db.titles.delete(title).then(() => true);
        } else {
          return this.updateTitle(title).then(() => false);
        }
      });
  }

  updateTitle(title) {
    return this.getRecordsByTitle(title)
      .then(records => {
        let last = 0;
        let sum = 0;
        if (records.length > 0) {
          sum = records
            .map(record => {
              if (record.volumen > last) {
                last = record.volumen;
              }
              return record.price;
            })
            .reduce((total, record) => total + record);
        }
        return {
          title: title,
          total: sum,
          last: last
        };
      });
  }

  getRecordsByTitle(title) {
    this.c('getRecordsByTitle');
    return db.records.filter(record => record.title === title).toArray();
  }

  clearYear() {
    this.c('clearYear');
    db.titles.clear();
    return db.years.clear();
  }

  clearRecords() {
    this.c('clearRecords');
    return db.records.clear();
  }

  c(msg) {
    // console.log('DB-Call', msg);
  }
}
