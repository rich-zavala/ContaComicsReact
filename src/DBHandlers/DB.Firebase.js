import { Comic } from "../classes/Comic";
import { Year } from "../classes/Year";
import moment from "moment";
import _ from "lodash";

import * as firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAMnSeGUp9bIAr3Xu6tWUG1otxkUTDz1sE",
  authDomain: "contacomics.firebaseapp.com",
  databaseURL: "https://contacomics.firebaseio.com",
  projectId: "contacomics",
  storageBucket: "contacomics.appspot.com",
  messagingSenderId: "240427376962"
};

const app = firebase.initializeApp(config);
const db = app.database();

export class DB {

  // constructor() {
  // db.ref('records/').once('value').then(data => {
  //   let sn = data.val();
  //   console.log(sn);
  // });
  // }

  clearYear() {
    return db.ref('years/').set({});
  }

  clearRecords() {
    return db.ref('records/').set({});
  }

  addRecord(record) {
    this.c('addRecord');

    if (!(record instanceof Comic)) {
      record = new Comic(record);
    }

    return db.ref('records/' + record.id).set(record.storable)
      .then(() => {
        this.addTitle(record);
        return this.addDate(record.date);
      });
  }

  addTitle(record) {
    this.c('addTitle');
    return this.updateTitle(record.title)
      .then(data => {
        // console.log(data);
        return db.ref('titles/' + record.title).set(data);

      });
  }

  updateTitle(title) {
    return this.getRecordsByTitle(title)
      .then(snapshot => {
        let records = snapshot.val();
        let last = 0;
        let sum = 0;
        if (_.size(records) > 0) {
          sum = _.reduce(_.map(records, record => {
            if (record.volumen > last) {
              last = record.volumen;
            }
            return record.price;
          }), (total, record) => total + record);

          let res = {
            title: title,
            total: sum,
            last: last
          };

          // console.log(res);
          return res;
        }
      });
  }

  getRecordsByTitle(title) {
    this.c('getRecordsByTitle');
    return db.ref('records/')
      .orderByChild('title')
      .equalTo(title)
      .once('value');
  }

  addDate(date) {
    this.c('addDate');
    date = moment(date);
    let dateYear = date.year();

    db.ref('years/' + dateYear)
      .once('value')
      .then(snapshot => {
        let year, dbYear = snapshot.val();
        if (dbYear) {
          year = new Year(dbYear);
        } else {
          year = new Year({ name: dateYear });
        }
        year.addDate(date);
        return this.addYear(year);
      });
  }

  addYear(year) {
    this.c('addYear', year);
    if (!(year instanceof Year)) {
      year = new Year({ name: year });
    }

    return db.ref('years/' + year.name).set(this.storable(year));
  }

  storable(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  c() {
    console.log('DB-Call', [...arguments]);
  }
}
