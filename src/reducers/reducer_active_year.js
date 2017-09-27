import { ACTIONS } from "../constants/cons";

// "state" argument is not app state, but the state this reducer is responsible of
export default function (state = null, action) {
  console.log("reducer_active_year.state", state);
  switch (action.type) {
    case ACTIONS.YEAR_SELECTED:
      return action.payload;

    default:
      return state;
  }
}