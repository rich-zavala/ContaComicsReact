import { Comic } from "../classes/Comic";
import { ACTIONS } from "../constants/cons";
import _ from "lodash";

// "state" argument is not app state, but the state this reducer is responsible of
export default function (state = [], action) {
  // if (!action.type.includes("@@")) {
  //   console.group("reducer_selected_year");
  //   console.warn("state > ", state)
  //   console.log("action > ", action)
  //   console.groupEnd();
  // }

  switch (action.type) {
    case ACTIONS.YEAR_SELECTED:
      return [...action.payload.map(comic => new Comic(comic))];

    case ACTIONS.RECORD_DELETE:
      _.remove(state, record => record.id === action.payload.removedRecord.id);
      // console.log(state);
      return state;

    default:
      return state;
  }
}