import Dexie from 'dexie';
import { Comic } from "../classes/Comic";
import { Year } from "../classes/Year";
import { DB_NAME } from "../constants/cons";
import moment from "moment";

const db = new Dexie(DB_NAME);
db.version(1).stores({
  years: "&name",
  records: "&id"
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

  clearYear() {
    return db.years.clear();
  }

  clearRecords() {
    return db.records.clear();
  }
}
