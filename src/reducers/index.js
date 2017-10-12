import { combineReducers } from "redux";
import YearsReducer from "./reducer_years";
import SelectedYearReducer from "./reducer_selected_year";

const rootReducer = combineReducers({
  years: YearsReducer,
  yearRecords: SelectedYearReducer
});

export default rootReducer;