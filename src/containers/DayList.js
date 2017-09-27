import React from "react";
import { connect } from "react-redux";

class DayList extends React.Component {
  render() {
    console.group("DayList.render");
    console.log("props", this.props);
    console.log("state", this.state);
    console.groupEnd();

    if (!this.props.activeYear) {
      return <h3>Select a Year</h3>;
    } else {
      let days = this.props.activeYear.dates.map(day => <li><b>{day}</b></li>);
      return (
        <div>
          <h3>Days in year {this.props.activeYear.name}</h3>
          <ul>{days}</ul>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  console.log("DayList.mapStateToProps.state", state);
  return {
    activeYear: state.activeYear
  };
}

export default connect(mapStateToProps)(DayList);
