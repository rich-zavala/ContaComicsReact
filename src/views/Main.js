import React from "react";
import moment from "moment";
// import { DB } from "../DBHandlers/DB";
import { DB as FB } from "../DBHandlers/DB.Firebase";
import { Comic } from "../classes/Comic";
import RegistryForm from "../containers/RegistryForm";
import YearList from "../containers/YearList";
import Titles from "../containers/Titles";

import * as _ from "lodash";

export default class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      section: "records"
    };
  }

  render() {
    return (
      <div>
        <h3>ContaComics 2017</h3>
        <ol className="breadcrumb">
          <li><a className={this.state.section === "records" ? "active" : ""} onClick={this.setSection.bind(this, "records")}>Records</a></li>
          <li><a className={this.state.section === "form" ? "active" : ""} onClick={this.setSection.bind(this, "form")}>Form</a></li>
          <li><a className={this.state.section === "titles" ? "active" : ""} onClick={this.setSection.bind(this, "titles")}>Titles</a></li>
          <li><a className={this.state.section === "reset" ? "active" : ""} onClick={this.populateDB.bind(this)}>Reset DB</a></li>
        </ol>
        {/* <div><RegistryForm /></div> */}

        {/* <hr />
        <hr />
        <div><CheckList /></div> */}
        <hr />
        <div className={this.state.section !== "records" ? "hidden" : ""}><YearList /></div>
        <div className={this.state.section !== "form" ? "hidden" : ""}><RegistryForm /></div>
        <div className={this.state.section !== "titles" ? "hidden" : ""}><Titles /></div>
      </div >
    );
  }

  setSection(section) {
    if (section !== this.state.section) {
      this.setState({ section: section });
    }
  }

  populateDB() {
    // let db = new DB();
    let db = new FB();

    let pad = (num, size) => {
      var s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    };
    let genYear = () => Math.floor(Math.random() * 3) + 2015;
    let genMonth = () => pad(Math.floor(Math.random() * 5) + 1, 2);
    let genDay = () => pad(Math.floor(Math.random() * 8) + 1, 2);
    let genComic = (i) => {
      let date = genYear() + "-" + genMonth() + "-" + genDay();
      let o = {
        title: getTitle(),
        price: 26,
        volumen: i,
        date: new moment(date)
      };
      return new Comic(o);
    };

    db.clearYear()
      .then(() => {
        db.clearRecords()
          .then(() => {
            let limit = 5;
            let current = 0;
            let adding = () => db.addRecord(genComic(current)).then(() => {
              if (current < limit) {
                current++;
                adding();
              } else {
                console.log("DB reseting done!");
                // window.location.reload();
              }
            });

            console.log("Working reseting DB...");
            adding();
          });
      });
  }
}

function getTitle() {
  let titles = [
    // "Batman",
    // "Spider-Man",
    // "Hulk",
    "Avengers",
    "Invincible"
  ];
  return _.sample(titles);
}

// new FB().c('Firebase is ON!');