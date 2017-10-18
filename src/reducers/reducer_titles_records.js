import { ACTIONS } from "../constants/cons";
import { Comic } from "../classes/Comic";
import * as _ from "lodash";

let records = {};

export default function (state = [], action) {
  switch (action.type) {
    case ACTIONS.GET_TITLES_RECORDS:
      records[action.payload[0].title] = action.payload.map(comic => new Comic(comic))
      return _.clone(records);

    case ACTIONS.RECORD_DELETE:
      let record = action.payload.removedRecord;
      _.remove(records[record.title], r => r.id === record.id);
      return _.clone(records);

    default:
      return state;
  }
}
