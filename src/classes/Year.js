import { Comic } from "../classes/Comic";
// import { Day } from "../classes/Day";
import { DATE_FORMAT_COMPARE } from "../constants/cons";
import _ from "lodash";
import moment from "moment";

export class Year {
  name;
  dates = [];

  constructor(o) {
    this.name = _.toNumber(o.name);
    this.dates = o.dates || [];
  }

  /**
   * 
   * @param {moment} date 
   */
  addDate(date) {
    let dateYear = date.year();
    if (dateYear === this.name) {
      this.dates.push(date.format(DATE_FORMAT_COMPARE));
      this.dates = _.uniq(this.dates);
      this.dates.sort((a, b) => parseInt(moment(b).valueOf(), 10) - parseInt(moment(a).valueOf(), 10));
      return this.dates;
    } else {
      throw new Error("This date's year is different to " + this.name + ": " + dateYear);
    }
  }

  addRecord(record) {
    record = new Comic(record);
    this.addDate(record.date).addRecord(record);
  }

  /**
   * Attach an array of "Day" typed elements to this.dates
   */
  setDates(dates) {
    // this.dates = dates.map(date => new Day(dates.date, dates.records));
    this.dates = dates;
    _.reverse(this.dates);
    return this;
  }

  removeDate(date) {
    this.dates = _.remove(this.dates, ydate => {
      return ydate !== date;
    });
  }
}
