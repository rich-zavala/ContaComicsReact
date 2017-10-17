import Dexie from 'dexie';
import { Comic } from "../classes/Comic";
import { Year } from "../classes/Year";
import { DB_NAME } from "../constants/cons";
import moment from "moment";

const db = new Dexie(DB_NAME);
db.version(1).stores({
  years: "&name",
  records: "&id, date"
});

export class DB {
  addYear(year) {
    if (!(year instanceof Year)) {
      year = new Year({ name: year });
    }
    return db.years.put(year);
  }

  addDate(date) {
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
    if (!(record instanceof Comic)) {
      record = new Comic(record);
    }

    return db.records.add(record.storable)
      .then(() => {
        return this.addDate(record.date);
      });
  }

  getYears() {
    return db.years.reverse().toArray();
  }

  getYear(year) {
    return db.years.filter(record => record.name.toString() === year.toString()).toArray();
  }

  storable(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  getRecordsFromYear(year) {
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
    return db.records.update({ id: record.id }, record.storable);
  }

  deleteRecord(record) {
    let res = {
      removedRecord: record,
      removedDate: false,
      removedYear: false,
      updatedDate: record.dateStr
    };
    return db.records.delete(record.id)
      .then(() => {
        return db.records.where({ date: res.updatedDate })
          .count()
          .then(count => {
            if (count === 0) { // Delete this date from years
              res.removedDate = true;
              return this.getYear(record.date.year())
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
  }

  updateYear(year) {
    return db.years.update({ name: year.name }, this.storable(year));
  }

  deleteYear(year) {
    return db.years.delete(year.name);
  }

  clearYear() {
    return db.years.clear();
  }

  clearRecords() {
    return db.records.clear();
  }
}
