import { Comic } from "../classes/Comic";
// import { Day } from "../classes/Day";
import { DATE_FORMAT_COMPARE } from "../constants/cons";
import _ from "lodash";

export class Year {
  name;
  dates = [];

  constructor(name) {
    this.name = _.toNumber(name);
  }

  /**
   * 
   * @param {moment} date 
   */
  addDate(date) {
    let dateYear = date.year();
    if (dateYear === this.name) {
      this.dates.push(date.format(DATE_FORMAT_COMPARE));
      this.dates = _.uniq(this.dates)
      return this.dates;
    } else {
      throw new Error("This date's year is different to " + this.name + ": " + dateYear);
    }
  }

  addRecord(record) {
    record = new Comic(record);
    this.addDate(record.date).addRecord(record);
  }



  // getDay(date) {
  //   return _.first(this.dates.filter(dateRecord => dateRecord.dateStr === date));
  // }

  /**
   * Attach an array of "Day" typed elements to this.dates
   */
  setDates(dates) {
    // this.dates = dates.map(date => new Day(dates.date, dates.records));
    this.dates = dates;
    return this;
  }
}
