import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Record from "./Record";
import { deleteRecord } from "../actions/index";
import * as _ from "lodash";
import moment from "moment";

const DEBUG = false;

class RecordsInDay extends React.Component {
  records = [];
  sum = 0;
  date;

  constructor(props) {
    super(props);
    this.date = moment(this.props.day).format("D MMMM, YYYY");
    this.records = this.filterRecords(props.yearRecords);
    this.doSum();
  }

  render() {
    let records;
    if (this.records) {
      records = this.records.map(record => <Record Data={record} key={record.id} />);
    }

    return (
      <div>
        <h4>
          <span>{this.date}</span>
          <span className="pull-right">$ {this.sum}</span>
        </h4>
        <div>
          {records}
        </div>
        <hr />
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    let newRecords = this.filterRecords(nextProps.yearRecords);
    if (!_.isEqual(newRecords, this.records)) {
      this.records = newRecords;
      this.doSum();
      DEBUG && console.log("Updating > ", this.date);
      return true;
    } else {
      return false;
    }
  }

  filterRecords(collection) {
    return collection.filter(record => record.dateStr === this.props.day);
  }

  doSum() {
    if (this.records.length > 0) {
      this.sum = this.records
        .map(record => record.price)
        .reduce((total, record) => total + record);
    }
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteRecord }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsInDay);
