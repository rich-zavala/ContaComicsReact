import { Comic } from "../classes/Comic";
import { DATE_FORMAT_COMPARE } from "../constants/cons";
import moment from "moment";
import _ from "lodash";

export class Day {
  date;
  dateStr;
  records = [];

  constructor(date, records = []) {
    this.date = moment(date);
    this.dateStr = this.date.format(DATE_FORMAT_COMPARE);
    this.records = records.map(record => new Comic(record));
  }

  addRecord(record) {
    if (this.dateStr === record.dateStr) {
      this.records.push(record);
    } else {
      throw new Error("This record is not of the same date. This date: " + this.dateStr + " VS Record's date: " + record.dateStr);
    }
  }
}

export class Year {
  name;
  dates = [];

  constructor(name) {
    this.name = _.toNumber(name);
  }

  addDate(date) {
    let dateYear = date.year();
    if (dateYear === this.name) {
      let dateInCollection = this.getDay(date.format(DATE_FORMAT_COMPARE));
      if (!dateInCollection) {
        dateInCollection = new Day(date);
        this.dates.push(dateInCollection);
      }
      return dateInCollection;
    } else {
      throw new Error("This date's year is different to " + this.name + ": " + dateYear);
    }
  }

  addRecord(record) {
    record = new Comic(record);
    this.addDate(record.date).addRecord(record);
  }

  getDay(date) {
    return _.first(this.dates.filter(dateRecord => dateRecord.dateStr === date));
  }
}