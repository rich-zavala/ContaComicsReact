import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getYears, selectYear } from "../actions/index";
import RecordsInDay from "./RecordsInDay";

class YearList extends React.Component {
  firstYearRender = true;

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
    if (!this.state.year && newProps.years.length > 0) { // Initialization
      this.setYear(newProps.years[0]);
    } else {
      let yearIsAvailable = false;
      newProps.years.forEach(pYear => {
        if (pYear.name === this.state.year.name) {
          yearIsAvailable = true;
          if (pYear.dates !== this.state.year.dates) {
            this.setState({ year: pYear });
          }
        }
      });

      if (!yearIsAvailable && newProps.years.length > 0) {
        this.setYear(newProps.years[0]);
      }
    }
  }

  shouldComponentUpdate(newProps) {
    return (newProps.years.length > 0 && newProps.yearRecords.length > 0) || (newProps.years.length === 0 && newProps.yearRecords.length === 0);
  }

  selectYear(year) {
    if (!this.state || !this.state.year || this.state.year.name !== year.name) {
      this.setYear(year);
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
