import { Comic } from "../classes/Comic";
import { DATE_FORMAT_COMPARE } from "../constants/cons";
import moment from "moment";

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