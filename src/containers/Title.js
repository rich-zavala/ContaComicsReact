import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Record from "./Record";
// import moment from "moment";
import * as _ from "lodash";

class Title extends React.Component {
  title;
  records = [];

  render() {
    let records = this.records.map(record => <Record Data={record} key={record.id} />);
    return (<div>{records}</div>);
  }

  shouldComponentUpdate(newProps) {
    this.title = newProps.title;
    if (!_.isEqual(this.records, newProps.titles[this.title])) {
      this.records = [...newProps.titles[this.title]];
      return true;
    } else {
      return false;
    }
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Title);
