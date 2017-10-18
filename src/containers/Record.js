import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateRecord, deleteRecord } from "../actions/index";

class Record extends React.Component {
  record;

  constructor(props) {
    super(props);
    this.record = this.props.Data;
    this.state = {
      record: this.props.Data
    };
    // this.record = this.props.Data;
  }

  render() {
    let css = this.setClassNames();
    return (
      <div>
        <button className={"btn btn-xs btn-" + css.btn} onClick={this.changeOwned.bind(this)}>{css.icon}</button>
        {this.record.title} #{this.record.volumen}

        <button className="btn btn-xs btn-danger pull-right" onClick={this.delete.bind(this)}>☓</button>
      </div>
    );
  }

  componentWillReceiveProps(newProps) {
    if (this.compareProps(newProps)) {
      this.record = newProps.updatedRecord;
    }
  }

  shouldComponentUpdate(newProps) {
    return this.compareProps(newProps);
  }

  compareProps(newProps) {
    return newProps.updatedRecord && newProps.updatedRecord.id === this.record.id;
  }

  setClassNames() {
    let css = {
      btn: "success",
      icon: "✔"
    };

    if (this.record.owned === false) {
      css.btn = "warning";
      css.icon = "-";
    }

    return css;
  }

  changeOwned() {
    this.record.owned = !this.record.owned;
    this.setState({ record: this.record });
    this.props.updateRecord(this.record);
  }

  delete() {
    this.props.deleteRecord(this.record);
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  // return bindActionCreators({ selectYear }, dispatch);
  return bindActionCreators({ updateRecord, deleteRecord }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Record);
