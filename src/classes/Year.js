import { Comic } from "../classes/Comic";
import { Day } from "../classes/Day";
import { DATE_FORMAT_COMPARE } from "../constants/cons";
import _ from "lodash";

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