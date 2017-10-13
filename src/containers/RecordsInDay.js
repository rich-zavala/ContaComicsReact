import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { selectYear } from "../actions/index";

class RecordsInDay extends React.Component {
  records = [];

  render() {
    let records;
    if (this.records) {
      records = this.records.map(record => {
        return (
          <div key={record.id}>{record.title} #{record.volumen}</div>
        );
      });
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

  componentWillReceiveProps(props) {
    this.records = props.yearRecords.filter(record => record.dateStr === props.day);
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  // return bindActionCreators({ selectYear }, dispatch);
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsInDay);
