import React from "react";

export default class DayList extends React.Component {
  render() {
    let days = this.props.year.dates.map(day => <li key={day}>{day}</li>);
    return (
      <div>
        <h3>Days in year {this.props.year.name}</h3>
        <ul>{days}</ul>
      </div>
    );
  }
}
