import React from "react";
import Year from "./Year";

export default class CheckList extends React.Component {
  db;
  years = [];

  constructor(props) {
    super(props);
    this.db = this.props.DBInstance;
    this.years = this.db.years;
  }

  componentDidMount(a) {
    console.log("componentDidMount", a);
  }

  shouldComponentUpdate(a) {
    console.log("shouldComponentUpdate", a);
  }

  componentDidUpdate(a) {
    console.log("componentDidUpdate", a);
  }

  componentWillReceiveProps(a) {
    console.log("componentWillReceiveProps", a);
  }

  render() {
    let yearItems = this.years.map(year => <Year key={year.name} year={year} />);
    return (
      <div>
        <header>ContaComics 2017</header>
        <ul>
          {yearItems}
        </ul>
      </div>
    );
  }
}