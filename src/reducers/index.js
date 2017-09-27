import { combineReducers } from "redux";
import YearsReducer from "./reducer_years";
import ActiveYearReducer from "./reducer_active_year";

const rootReducer = combineReducers({
  years: YearsReducer,
  activeYear: ActiveYearReducer
});

export default rootReducer;