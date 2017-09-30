import React from "react";
import { Comic } from "../classes/Comic";
import DayList from "./DayList";
import { DB } from "../DBHandlers/DB";

export default class TestComponent extends React.Component {
  ready = false;
  db = new DB();
  comic = new Comic();

  constructor(props) {
    super(props);
    this.state = { years: [], comic: this.comic };
    this.setYears();
    this.setComicData(false);
  }

  render() {
    // console.log(this.state.years);
    let years = this.state.years.map(year => <DayList key={year.name} year={year} />);
    return (
      <div>
        <div><pre>{JSON.stringify(this.state.comic, null, 2)}</pre></div>
        <form className="main-form" onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>
              Batman volumen<br />
              <input type="number" name="volumen" value={this.state.comic.volumen} onChange={this.handleChange.bind(this)} />
            </label><br />
            <label>
              Date<br />
              <input type="date" name="date" value={this.state.comic.dateStr} onChange={this.handleChange.bind(this)} />
            </label>
          </div>
          <button type="subit">Add Batman record</button>
          <hr />
          <button type="button" onClick={this.resetDB.bind(this)}>Reset DB</button>
        </form>
        <hr />
        <div>{years}</div>
      </div>
    );
  }

  handleChange(event) {
    let comic = this.comic;
    comic[event.target.name] = event.target.value;
    this.setStateComic();

    // this.state.comic[event.target.name] = event.target.value;
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Submitting Comic subject >> ", this.state.comic);
    this.db.addRecord(this.state.comic) // If success, it'll return "years" table
      .then(years => {
        this.comic = new Comic();
        this.setComicData();
        this.setState({ years });
      })
      .catch(err => console.log("This record is already stored :(", err));
  }

  setComicData(noUpdate = true) {
    this.comic.title = "Batman";
    this.comic.price = 26;
    this.comic.volumen = Math.floor(Math.random() * 100);

    if (noUpdate) {
      this.setStateComic();
    }
  }

  resetDB() {
    indexedDB.deleteDatabase("CC");
    indexedDB.deleteDatabase("__dbnames");
    window.location.reload();
  }

  setYears() {
    return this.db.getYears()
      .then(years => {
        this.setState({ years });
        this.ready = true;
      });
  }

  setStateComic() {
    this.setState({ comic: this.comic });
  }
}
