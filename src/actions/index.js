import { ACTIONS } from "../constants/cons";

export function selectYear(year) {
  console.log("A year have been selected", year);
  // selectYear is an ActionCreator so it needs to return an action,
  // as an object with a "type" property
  return {
    type: ACTIONS.YEAR_SELECTED,
    payload: year
  };
}