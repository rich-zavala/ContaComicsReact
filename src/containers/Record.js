import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateRecord, deleteRecord } from "../actions/index";

class Record extends React.Component {
  record;

  constructor(props) {
    super(props);
    this.record = this.props.Data;
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
    // if (this.record.owned === false || confirm("Proceed to uncheck this record?")) {
    this.changeOwnedUpdate();
    this.props.updateRecord(this.record)
      .catch(e => {
        this.record.owned = !this.record.owned;
        this.forceUpdate();
        this.changeOwnedUpdate();
        console.warn(e);
      });
  }

  changeOwnedUpdate() {
    this.record.owned = !this.record.owned;
    this.forceUpdate();
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
