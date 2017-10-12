import { Year } from "../classes/Year";
import { ACTIONS } from "../constants/cons";

let yearsCatalog = [];
export default function (state = [], action) {
  switch(action.type) {
    case ACTIONS.YEARS_LIST:
      yearsCatalog = action.payload.map(year => new Year(year));
      return [...yearsCatalog, ...state];
    default:
      return state;
  }
}