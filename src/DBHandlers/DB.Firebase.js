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

  constructor() {
    console.warn("Config", config);
    db.ref('records/').on('child_removed', snap => {
      console.log("removed", snap);
    });

    // db.ref('records/').once('value').then(data => {
    //   let sn = data.val();
    //   console.log(sn);
    // });
  }

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

    let r = { error: false, msg: null };
    return db.ref('records/' + record.id)
      .once('value')
      .then(snap => {
        let res = snap.val();
        if (res) { // Duplicated
          r.error = true;
          r.msg = 'Record already exits';
          return r;
        } else {
          return db.ref('records/' + record.id).set(record.storable)
            .then(() => {
              this.addTitle(record);
              return this.addDate(record.date);
            });
        }
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
      .then(records => {
        let last = 0;
        let sum = 0;
        if (records.length > 0) {
          sum = records
            .map(record => {
              if (record.volumen > last) {
                last = record.volumen;
              }
              return record.price;
            })
            .reduce((total, record) => total + record);
        }
        return {
          title: title,
          total: sum,
          last: last
        };
      });
  }

  getRecordsByTitle(title) {
    this.c('getRecordsByTitle');
    return db.ref('records/')
      .orderByChild('title')
      .equalTo(title)
      .once('value')
      .then(snap => _.map(snap.val(), title => title));
  }

  addDate(date) {
    this.c('addDate');
    date = moment(date);
    let dateYear = date.year();

    db.ref('years/' + dateYear)
      .once('value')
      .then(snap => {
        let year, dbYear = snap.val();
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

  getYears() {
    this.c('getYears');
    return db.ref('years/')
      .once('value')
      .then(snap => _.map(snap.val(), record => record).reverse());
  }

  getTitles() {
    this.c('getTitles');
    return db.ref('titles/')
      .orderByChild("title")
      .once('value')
      .then(snap => _.map(snap.val(), record => record));
  }

  getRecordsFromYear(year) {
    this.c('getRecordsFromYear');
    if (year instanceof Year) {
      year = year.name;
    }

    return db.ref('records/')
      .orderByChild('year')
      .equalTo(year)
      .once('value')
      .then(snap => {
        return _.map(snap.val(), record => record);
      })
  }

  updateRecord(record) {
    this.c('updateRecord');
    return db.ref('records/' + record.id)
      .set(record.storable)
      .then(() => record);
  }

  deleteRecord(record) {
    this.c('deleteRecord');
    let res = {
      removedRecord: record,
      removedDate: false,
      removedYear: false,
      removedTitle: false,
      updatedDate: record.dateStr
    };
    db.ref('records/' + record.id).remove();
    return this.deleteTitle(record.title)
      .then(removedTitle => {
        res.removedTitle = removedTitle;
        return db.ref('records')
          .orderByChild('date')
          .equalTo(res.updatedDate)
          .once('value')
          .then(snap => {
            let count = _.size(snap.val());
            if (count === 0) { // Delete this date from years
              res.removedDate = true;
              return this.getYear(record.year)
                .then(year => {
                  year = new Year(year);
                  year.removeDate(res.updatedDate);
                  res.year = year;
                  if (year.dates.length > 0) { // Update year
                    return this.updateYear(year).then(() => res);
                  } else { // Delete year
                    res.removedYear = true;
                    this.deleteYear(year);
                    return res;
                  }
                });
            } else {
              return res;
            }
          });
      });
  }

  deleteTitle(title) {
    this.c('deleteTitle');
    return this.getRecordsByTitle(title)
      .then(records => {
        if (records.length === 0) {
          db.ref('titles/' + title).remove();
          return true;
        } else {
          return this.updateTitle(title).then(() => false);
        }
      });
  }

  getYear(year, newRecord) {
    this.c('getYear');
    return db.ref('years/' + year)
      .once('value')
      .then(snap => {
        console.log('getYear', year, snap.val());
        let yearData = snap.val();
        if (!yearData) { // New year!
          yearData = { name: year, dates: [newRecord.dateStr] };
        }

        let resYear = new Year(yearData);
        return yearData;
      });
  }

  updateYear(year) {
    this.c('updateYear');
    return db.ref('years/' + year.name)
      .set(this.storable(year))
      .then((r) => {
        console.log(r, year);
        return year
      });
  }

  deleteYear(year) {
    this.c('deleteYear');
    return db.ref('years/' + year.name).remove();
  }

  storable(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  c() {
    // console.log('DB-Call', [...arguments]);
  }
}
