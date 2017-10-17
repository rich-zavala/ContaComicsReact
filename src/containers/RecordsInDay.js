import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Record from "./Record";
import { deleteRecord } from "../actions/index";

class RecordsInDay extends React.Component {
  records = [];
  constructor(props) {
    super(props);
    this.records = this.filterRecords(props.yearRecords);
  }

  render() {
    let records;
    if (this.records) {
      records = this.records.map(record => <Record Data={record} key={record.id} />);
    }

    return (
      <div>
        <h4>{this.props.day}</h4>
        <div>
          {records}
        </div>
        <hr />
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    let newRecords = this.filterRecords(nextProps.yearRecords);
    if (newRecords.length !== this.records.length) {
      this.records = newRecords;
      return true;
    } else {
      return false;
    }
  }

  filterRecords(collection) {
    return collection.filter(record => record.dateStr === this.props.day);
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteRecord }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsInDay);
