import { ACTIONS } from "../constants/cons";
import { DB } from "../DBHandlers/DB.Firebase";

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

export function addRecord(record) {
  return {
    type: ACTIONS.ADD_RECORD,
    payload: db.addRecord(record)
  }
}

export function recordAdded(record) {
  return {
    type: ACTIONS.RECORD_ADDED,
    payload: record
  }
}

export function updateYear(year, newRecord) {
  return {
    type: ACTIONS.YEAR_UPDATE,
    payload: db.getYear(year, newRecord)
  }
}

export function updateRecord(record) {
  return {
    type: ACTIONS.RECORD_UPDATE,
    payload: db.updateRecord(record)
  }
}

export function deleteRecord(record) {
  return {
    type: ACTIONS.RECORD_DELETE,
    payload: db.deleteRecord(record)
  }
}

export function getTitles() {
  return {
    type: ACTIONS.GET_TITLES,
    payload: db.getTitles()
  }
}

export function getRecordsByTitle(title) {
  console.log("getRecordsByTitle", title);
  return {
    type: ACTIONS.GET_TITLES_RECORDS,
    payload: db.getRecordsByTitle(title)
  }
}

export function collapseTitleList(title) {
  return {
    type: ACTIONS.COLLAPSE_TITLE_LIST,
    payload: title
  }
}