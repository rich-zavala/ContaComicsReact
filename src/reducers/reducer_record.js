import { ACTIONS } from "../constants/cons";
import * as _ from "lodash";

export default function (state = null, action) {
  switch (action.type) {
    case ACTIONS.RECORD_UPDATE:
      return _.clone(action.payload);

    default:
      return state;
  }
}