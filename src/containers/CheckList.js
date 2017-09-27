import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DayList from "./DayList";
import { selectYear } from "../actions/index";

class CheckList extends React.Component {
  years = [];

  constructor(props) {
    super(props);
    console.group("CheckList.constructor");
    console.log("props", props);
    console.groupEnd();
    this.years = this.props.years;
  }

  render() {
    let yearItems = this.years.map(year =>
      <li key={year.name} onClick={() => this.props.selectYear(year)}>{year.name}</li>
    );
    return (
      <div>
        <header> ContaComics 2017 </header>
        <ul>{yearItems}</ul>
        <DayList />
      </div>
    );
  }
}

function mapStateToProps(state) { // This is how React and Redux get glued!
  return { // Whatever is returned will show up as props inside of CheckList
    years: state.years
  }
}

//Anything returned from this function will end up as props in CheckList container
function mapDispatchToProps(dispatch) {
  // Whenever selectYear is called, the result should be passed to all of the reducers
  return bindActionCreators({ selectYear: selectYear }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckList);