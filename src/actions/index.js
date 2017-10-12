import { ACTIONS } from "../constants/cons";
import { DB } from "../DBHandlers/DB";

const db = new DB();

export function getYears() {
  const yearsList = db.getYears();
  return {
    type: ACTIONS.YEARS_LIST,
    payload: yearsList
  };
}

export function selectYear(year) {
  console.log("A year have been selected", year);
  
  // selectYear is an ActionCreator so it needs to return an action,
  // as an object with a "type" property
  return {
    type: ACTIONS.YEAR_SELECTED,
    payload: db.getRecordsFromYear(year)
  };
}
