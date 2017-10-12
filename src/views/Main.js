import React from "react";
import moment from "moment";
import { DB } from "../DBHandlers/DB";
import { Comic } from "../classes/Comic";

// import RegistryForm from "../containers/RegistryForm";
import YearList from "../containers/YearList";
import TestComponent from "../containers/Tests";

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
          <li><a className={this.state.section === "reset" ? "active" : ""} onClick={this.populateDB.bind(this)}>Reset DB</a></li>
        </ol>
        {/* <div><RegistryForm /></div> */}

        {/* <hr />
        <hr />
        <div><CheckList /></div> */}
        <hr />
        <div className={this.state.section !== "records" ? "hidden" : ""}><YearList /></div>
        <div className={this.state.section !== "form" ? "hidden" : ""}><TestComponent /></div>
      </div >
    );
  }

  setSection(section) {
    if (section !== this.state.section) {
      this.setState({ section: section });
    }
  }

  populateDB() {
    let db = new DB();
    let pad = (num, size) => {
      var s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    };
    let genYear = () => Math.floor(Math.random() * 4) + 2015;
    let genMonth = () => pad(Math.floor(Math.random() * 6) + 1, 2);
    let genDay = () => pad(Math.floor(Math.random() * 15) + 1, 2);
    let genComic = (i) => {
      let date = genYear() + "-" + genMonth() + "-" + genDay();
      let  o = {
        title: "Batman",
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
            var timestamp = moment();
            let limit = 1500;
            let current = 0;
            let adding = () => db.addRecord(genComic(current)).then(() => {
              if(current < limit) {
                current ++;
                adding();
              } else {
                alert("DB reseting done! > " + moment().diff(timestamp));
                window.location.reload();
              }
            });
            
            console.log("Working reseting DB...");
            adding();
        });
      });
    }
}

/*export default class Landing extends React.Component {
  db = new DB();

  render() {
    return (
      <div>
        <fieldset>
          <legend>Create a new record</legend>
          <RegistryForm DBInstance={this.db} />
        </fieldset>
        <hr />
        <CheckList DBInstance={this.db} />
      </div>
    )
  }
}
*/