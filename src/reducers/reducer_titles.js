import { ACTIONS } from "../constants/cons";
import * as _ from "lodash";

let titles = [];

export default function (state = [], action) {
  switch (action.type) {
    case ACTIONS.GET_TITLES:
      titles = action.payload.map(title => title.title);
      return titles;

    case ACTIONS.RECORD_DELETE:
      if (action.payload.removedTitle) {
        _.remove(titles, title => title === action.payload.removedRecord.title);
      }
      return titles;

    default:
      return state;
  }
}