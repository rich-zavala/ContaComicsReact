import { ACTIONS } from "../constants/cons";
import { Comic } from "../classes/Comic";
import * as _ from "lodash";

let titles = {};

export default function (state = {}, action) {
  switch (action.type) {
    case ACTIONS.GET_TITLES:
      titles = {};
      action.payload.forEach(titleObj => titles[titleObj.title] = []);
      return titles;


    case ACTIONS.GET_TITLES_RECORDS:
      action.payload.forEach(record => {
        let comic = new Comic(record);
        titles[record.title].push(comic);
      });
      sortTitles(action.payload[0].title);
      return _.clone(titles);

    case ACTIONS.RECORD_DELETE:
      let record = action.payload.removedRecord;
      _.remove(titles[record.title], r => r.id === record.id);
      if (action.payload.removedTitle) {
        delete titles[record.title];
      }
      return _.clone(titles);

    case ACTIONS.RECORD_ADDED:
      let title = action.payload.title;
      if (!titles[title]) {
        titles[title] = [action.payload];
      } else {
        titles[title].push(action.payload);
      }

      if (_.size(titles) > 1) {
        sortTitles(title);
      }
      return _.clone(titles);

    case ACTIONS.COLLAPSE_TITLE_LIST:
      titles[action.payload] = [];
      return _.clone(titles);

    default:
      return state;
  }
}

function sortTitles(title) {
  titles[title].sort((a, b) => a.volumen - b.volumen);
}