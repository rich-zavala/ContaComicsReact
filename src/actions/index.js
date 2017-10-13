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
  return {
    type: ACTIONS.YEAR_SELECTED,
    payload: db.getRecordsFromYear(year)
  };
}

export function addRecord(comic) {
  return {
    type: ACTIONS.ADD_RECORD,
    payload: db.addRecord(comic)
  }
}

export function updateYear(year) {
  return {
    type: ACTIONS.YEAR_UPDATE,
    payload: db.getYear(year)
  }
}

export function updateDateRecords(year) {
  return {
    type: ACTIONS.YEAR_SELECTED,
    payload: db.getRecordsFromYear(year)
  }
}