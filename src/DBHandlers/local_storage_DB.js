import { Comic } from "../classes/Comic";
import { Year } from "../classes/Year";
import { DB_NAME } from "../constants/cons";
import _ from "lodash";

export class DB {
  years = [];

  constructor() {
    this.getYears(true);
  }

  getYears(force = false) {
    if (force === true) {
      this.years = this.getYearsFromDB().map(year => new Year(year));
    }
    return this.years;
  }

  save() {
    localStorage.setItem(DB_NAME, JSON.stringify(this.years));
    console.log("Records stored > ", this.years);
    return true;
  }

  getFromDB() {
    console.warn("Calling DB data!!");
    let data = localStorage.getItem(DB_NAME);
    if (data) {
      return JSON.parse(data);
    } else {
      localStorage.setItem(DB_NAME, []);
      return [];
    }
  }

  getYearsFromDB() {
    return this.getFromDB().map(year => year.name);
  }

  /**
   * @param {Comic} record 
   */
  addRecord(record, save = true) {
    if (!(record instanceof Comic)) {
      record = new Comic(record);
    }

    if (this.recordAllowed(record)) {
      console.groupCollapsed("Adding > ", record.id);
      let recordYear = record.date.year();
      let yearInCatalog = this.getRecordYear(recordYear);
      if (!yearInCatalog) {
        yearInCatalog = new Year(recordYear);
        this.years.push(yearInCatalog);
      }
      yearInCatalog.addRecord(record);
      console.log("Years > ", this.years);
      console.groupEnd();
      if (save !== false) {
        return this.save();
      }
      return true;
    }
    return false;
  }

  /**
   * @param {Comic} record 
   */
  recordAllowed(record) {
    let duplicates = [];
    this.years.forEach(year =>
      year.dates.forEach(date =>
        date.records.forEach(dateRecord => {
          if (dateRecord.id === record.id) {
            duplicates.push(dateRecord);
          }
        })
      )
    );

    return duplicates.length === 0;
  }

  /**
   * Check if a year exists in this instance
   * @param {number} year 
   * @returns {Year}
   */
  getRecordYear(year) {
    return _.first(this.years.filter(y => y.name === year));
  }

  /**
   * 
   * @param {number} year 
   */
  populateYear(year) {
    let yearInRecords = this.getRecordYear(year);
    if (yearInRecords) {
      this.getFromDB()
        .filter(dbYear => dbYear.name === year)
        .forEach(dbYear => {
          yearInRecords.setDates(dbYear.dates);
        });
    } else {
      throw new Error("Year is not in DB.");
    }
  }
}