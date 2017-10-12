import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RecordsInDay from "./RecordsInDay";
// import { ACTIONS } from "../constants/cons";
// import { Year } from "../classes/Year";
import { getYears, selectYear } from "../actions/index";

class YearList extends React.Component {
  // selectedYear;
  // db = new DB();
  // years = [];

  // constructor(props) {
  //   super(props);
  //   console.group("CheckList.constructor");
  //   console.log("props", props);
  //   console.groupEnd();
  //   this.years = this.props.years;
  // }
  constructor(props) {
    super(props);
    this.props.getYears();

    // this.props.
    // console.log(this.props, this.state);
    // this.setYears();
  }

  render() {
    let yearsList = <h4>No records yet...</h4>;
    if(this.props.years.length > 0 && this.state.selectedYear) {
      let yearsButtons = this.props.years.map(year => {
        let activeClass = this.state.selectedYear.name === year.name ? "active" : "";
        return (
          <div className="btn-group" key={year.name}>
            <button className={ "btn btn-sm btn-primary " + activeClass } onClick={() => this.selectYear(year)}>
              {year.name}
            </button>
          </div>
        );
      });

      yearsList = (
        <div>
          <div className="btn-group btn-group-justified">{yearsButtons}</div>
          <hr />
          {this.state.selectedYear.dates.map(date => <RecordsInDay key={date} day={date} />)}
        </div>
      );
    }

    return (
      <div>
        <h3>YearList</h3>
        {yearsList}
      </div>
    );
  }

  // Select first year on list ready
  componentWillReceiveProps(props) {
    if(props.years.length > 0 && !this.state) {
      this.selectYear(props.years[0]);
    }
  }

  selectYear(selectedYear) {
    if(!this.state || !this.state.selectedYear || this.state.selectedYear.name !== selectedYear.name) {
      console.log("Selecting year > ", selectedYear);
      this.setState({ selectedYear });
      this.props.selectYear(selectedYear);
    }
  }

  // setYears() {
  //   return this.db.getYears()
  //     .then(years => {
  //       this.setState({ years });
  //       this.ready = true;
  //     });
  // }

  // setStateComic() {
  //   this.setState({ comic: this.comic });
  // }
}

function mapStateToProps(state) { // This is how React and Redux get glued!
  return state;
}

//Anything returned from this function will end up as props in CheckList container
function mapDispatchToProps(dispatch) {
  // Whenever selectYear is called, the result should be passed to all of the reducers
  return bindActionCreators({ getYears, selectYear }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(YearList);