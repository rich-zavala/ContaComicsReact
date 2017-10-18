import { combineReducers } from "redux";
import YearsReducer from "./reducer_years";
import SelectedYearReducer from "./reducer_selected_year";
import TitlesReducer from "./reducer_titles";
import TitlesRecordsReducer from "./reducer_titles_records";
import RecordReducer from "./reducer_record";

const rootReducer = combineReducers({
  years: YearsReducer,
  yearRecords: SelectedYearReducer,
  titles: TitlesReducer,
  titlesRecords: TitlesRecordsReducer,
  updatedRecord: RecordReducer
});

export default rootReducer;