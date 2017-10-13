import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getYears, selectYear } from "../actions/index";
import RecordsInDay from "./RecordsInDay";
import * as _ from "lodash";

class YearList extends React.Component {
  constructor(props) {
    super(props);
    this.props.getYears();
  }

  render() {
    let yearsList = <h4>No records yet...</h4>;
    if (this.props.years.length > 0 && this.state.selectedYear) {
      let yearsButtons = this.props.years.map(year => {
        let activeClass = this.state.selectedYear.name === year.name ? "active" : "";
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
    if (props.years.length > 0 && !this.state) { // Select year if component is initializing
      this.selectYear(props.years[0]);
    }

    // Update year if needed
    if (this.state && this.state.selectedYear) {
      let selectedYear = this.state.selectedYear;
      props.years.forEach(pYear => {
        if (pYear.name === selectedYear.name) {
          let diff = _.difference(pYear.dates, selectedYear.dates);
          if (diff.length > 0) {
            this.setState({ selectedYear: pYear });
            this.props.selectYear(pYear);
          }
        }
      });
    }
  }

  selectYear(selectedYear) {
    if (!this.state || !this.state.selectedYear || this.state.selectedYear.name !== selectedYear.name) {
      this.setState({ selectedYear });
      this.props.selectYear(selectedYear);
    }
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
