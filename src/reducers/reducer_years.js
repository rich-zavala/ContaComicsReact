import { Year } from "../classes/Year";
import { ACTIONS } from "../constants/cons";
import * as _ from "lodash";

let yearsCatalog = [];
export default function (state = [], action) {
  // if (!action.type.includes("@@")) {
  //   console.group("reducer_years");
  //   console.warn("state > ", state)
  //   console.log("action > ", action)
  //   console.groupEnd();
  // }

  switch (action.type) {
    case ACTIONS.YEARS_LIST:
      yearsCatalog = action.payload.map(year => new Year(year));
      // return [...yearsCatalog, ...state];
      return [...yearsCatalog];

    case ACTIONS.YEAR_UPDATE:
      let updatedYear = new Year(action.payload);
      let index = _.findIndex(yearsCatalog, year => year.name === updatedYear.name);
      if (index >= 0) { // Year exists
        yearsCatalog[index] = updatedYear;
      } else { // Add year and sort
        yearsCatalog.push(updatedYear);
        yearsCatalog = yearsCatalog.sort((a, b) => b.name - a.name);
      }
      return [...yearsCatalog];

    case ACTIONS.RECORD_DELETE:
      if (action.payload.removedDate) {
        yearsCatalog.forEach((year, index) => {
          if (year.name === action.payload.year.name) {
            yearsCatalog[index] = action.payload.year;

            if (action.payload.removedYear) {
              yearsCatalog.splice(index, 1);
              return;
            }
          }
        });
      }
      // console.log("yearsCatalog", [...yearsCatalog]);
      return [...yearsCatalog];

    default:
      return state;
  }
}