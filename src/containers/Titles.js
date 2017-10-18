import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Record from "./Record";
import { getTitles, getRecordsByTitle } from "../actions/index";

class FormField extends React.Component {
  constructor(props) {
    super(props);
    this.props.getTitles();
  }

  render() {
    let _this = this;
    let titles = this.props.titles.map(title => {
      let records;
      if (_this.props.titlesRecords[title]) {
        records = _this.props.titlesRecords[title].map(record => <Record Data={record} key={record.id} />);
      }

      return (
        <div key={title}>
          <h4 onClick={() => this.getRecords(title)}>{title}</h4>
          <div>{records}</div>
        </div>
      );
    });

    return (
      <div>
        <h3>Titles</h3>
        <div>{titles}</div>
      </div>
    );
  }

  getRecords(title) {
    this.props.getRecordsByTitle(title);
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTitles, getRecordsByTitle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField);
