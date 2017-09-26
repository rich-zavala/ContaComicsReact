import { Comic } from "../classes/Comic";
import { Year } from "./DBYear";
import { DB_NAME } from "../constants/cons";
import _ from "lodash";

export class DB {
  records = [];
  recordsObjects = [];
  years = [];

  constructor() {
    this.getComics();
  }

  getComics() {
    console.warn("Calling getComics from DB!!");
    this.records = [];
    this.recordsObjects = [];
    this.years = [];
    let data = localStorage.getItem(DB_NAME);
    if (data) {
      this.records = JSON.parse(data);
      this.recordsObjects = this.records.map(c => {
        let comic = new Comic(c);
        this.addRecordYear(comic);
        this.years.sort((a, b) => a.name > b.name);
        return comic;
      });
      console.warn("Year array", this.years);
      return this.recordsObjects;
    } else {
      return [];
    }
  }

  save() {
    localStorage.setItem(DB_NAME, JSON.stringify(this.records));
    return true;
  }

  addRecord(record) {
    if (this.records.filter(r => r.id === record.id).length === 0) {
      console.group("Adding > ", record.id);
      this.records.push(record.storable);
      this.recordsObjects.push(record);
      this.addRecordYear(record);
      console.log("Years > ", this.years);
      console.groupEnd();
      return this.save();
    } else {
      return false;
    }
  }

  addRecordYear(record) {
    let recordYear = record.date.year();
    let yearInCatalog = this.getRecordYear(recordYear);
    if (!yearInCatalog) {
      yearInCatalog = new Year(recordYear);
      yearInCatalog.addRecord(record);
      this.years.push(yearInCatalog);
    }
    yearInCatalog.addRecord(record);
  }

  getRecordYear(year) {
    return _.first(this.years.filter(y => y.name === year));
  }
}