import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getYears, selectYear } from "../actions/index";
import RecordsInDay from "./RecordsInDay";
// import * as _ from "lodash";

class YearList extends React.Component {
  firstYearRender = true;
  // selectedYear;

  constructor(props) {
    super(props);
    this.state = {
      year: null
    };
    this.props.getYears();
  }

  render() {
    let yearsList = <h4>No records yet...</h4>;
    if (this.props.years.length > 0 && this.state && this.state.year) {

      console.group("Rendering year", this.state.year.name);
      console.log("props", this.props);
      console.log("selectedYear", this.state.year);
      console.groupEnd();

      let yearsButtons = this.props.years.map(year => {
        let activeClass = this.state.year.name === year.name ? "active" : "";
        return (
          <div className="btn-group" key={year.name}>
            <button className={"btn btn-sm btn-primary " + activeClass} onClick={() => this.selectYear(year)}>
              {year.name}
            </button>
          </div>
        );
      });

      yearsList = (
        <div>
          <div className="btn-group btn-group-justified">{yearsButtons}</div>
          <hr />
          {this.state.year.dates.map(date => <RecordsInDay key={date} day={date} />)}
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

  componentWillReceiveProps(newProps) {
    console.group("Analyzing year catalog");
    console.log("newProps", newProps);
    console.log("this.props", this.props);
    console.log("this.state", this.state);
    if (!this.state.year && newProps.years.length > 0) { // Initialization
      this.setYear(newProps.years[0]);
    } else {
      let yearIsAvailable = false;
      newProps.years.forEach(pYear => {
        if (pYear.name === this.state.year.name) {
          yearIsAvailable = true;
          console.log(pYear.dates, " !== ", this.state.year.dates);
          if (pYear.dates !== this.state.year.dates) {
            this.setState({ year: pYear });
            console.log("Updating year due to date changes");
          }
        }
      });

      if (!yearIsAvailable && newProps.years.length > 0) {
        this.setYear(newProps.years[0]);
      }
    }
    console.groupEnd();
  }

  shouldComponentUpdate(newProps) {
    let r = (newProps.years.length > 0 && newProps.yearRecords.length > 0) || (newProps.years.length === 0 && newProps.yearRecords.length === 0);
    console.log("shouldComponentUpdate.yearRecords", r);
    return r;
  }

  _shouldComponentUpdate(newProps) {
    console.group("Analyzing year catalog");
    console.log("newProps", newProps);
    console.log("this.props", this.props);
    console.log("this.state", this.state);

    if (!this.state || this.props.years.length === 0) { // Initializing
      if (newProps.years) {
        this.selectYear(newProps.years[0]);
        console.log(1, false);
        console.groupEnd();
        return false;
      } else { // It won't never come to here...
        console.log(2, false);
        return false;
      }
    } else {
      let update = true;
      if (this.firstYearRender) {
        this.firstYearRender = false;
      } else {
        let stateYear = this.state.year;
        let propsRecords = this.props.yearRecords;
        let yearIsAvailable = false;
        newProps.years.forEach(pYear => {
          if (pYear.name === stateYear.name) { // This year was affected
            yearIsAvailable = true;
            console.log(pYear.dates, " !== ", stateYear.dates);
            if (pYear.dates !== stateYear.dates) {
              this.setState({ year: pYear });
              console.log(3);
              update = false;
            } else {
              if (propsRecords.length > 0 && propsRecords[0].date.year() !== stateYear.name) { // Year changed
                console.log(4);
                // this.setYear(newProps.years[0]);
                update = true;
              } else {
                update = false;
              }
            }
          }
        });

        if (!yearIsAvailable) {
          console.log(6);
          this.setYear(newProps.years[0]);
          update = false;
        }
      }

      console.log(10, update);
      console.groupEnd();
      return update;





      // if(this.state.year.dates !== newProps){ // Deleted date
      //   console.log(3, true);
      //   return true;
      // } else {
      //         console.log(10, true);
      //         return true;
      // }
    }

    // return this.state && this.state.years.length > 0;

    /*if (!this.selectedYear) { // Initializing component. Select first year.
      this.selectYear(newProps.years[0]);
      console.log("Render? 2", true);
      console.groupEnd();
      return true;
    } else if (this.) { // A year was selected
      if (newProps.yearRecords.length > 0) {
        this.firstYearRender = false;
        console.log("Render? 3", true);
        console.groupEnd();
        return true;
      } else {
        let update = false;
        if (newProps.years.length === 0) { // No records!
          update = true;
        }
        console.log("Render? 3.1", update);
        console.groupEnd();
        return update;
      }
    } else { // A record was inserted or deleted
      if (newProps.yearRecords.length === 0) { // This year has been deleted
        // this.firstYearRender = true;
        this.selectYear(newProps.years[0]);
        this.props.getYears();
        console.log("Render? 4", false);
        console.groupEnd();
        return false;
      } else { // A new record was added
        if (newProps.years.length !== this.props.years.length) { // There's a new year
          console.log("Render? 5.1", true);
          console.groupEnd();
          return true;
        } else {
          let update = false;
          // let selectedYear = this.state.selectedYear;
          newProps.years.forEach(pYear => {
            if (pYear.name === this.selectedYear.name) { // There's a new record in this year
              console.log(pYear.dates, " !== ", this.selectedYear.dates);
              if (pYear.dates !== this.selectedYear.dates) { // A new date was added
                this.selectedYear = pYear;
                update = true;
                // this.setState({ selectedYear: pYear });
                console.log("Selected year", pYear);
              }
            }
          });
          console.log("Render? 5", update);
          console.groupEnd();
          return update;
        }
      }
    }*/
    // return true;
  }

  selectYear(year) {
    // this.firstYearRender = true;
    // this.selectedYear = selectedYear;
    if (!this.state || !this.state.year || this.state.year.name !== year.name) {
      this.setYear(year);
      console.warn("Year selected", year.name);
    }
  }

  setYear(year) {
    this.setState({ year });
    this.props.selectYear(year);
  }
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
