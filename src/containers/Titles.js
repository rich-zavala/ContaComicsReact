import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Title from "./Title";
import { getTitles, getRecordsByTitle, collapseTitleList } from "../actions/index";
import * as _ from "lodash";

class Titles extends React.Component {
  titles = [];
  extended = {};

  constructor(props) {
    super(props);
    this.props.getTitles();
  }

  render() {
    console.log('Rendering Titles', this.props.titles);
    let titles = [];
    this.titles = _.keys(this.props.titles);
    for (let title in this.props.titles) {
      titles.push(
        <div key={title}>
          <h4 onClick={() => this.getRecords(title)}>{title}</h4>
          <Title title={title} key={title} />
        </div>
      );
    }

    return (
      <div>
        <h3>Titles</h3>
        <div>{titles}</div>
      </div>
    );
  }

  getRecords(title) {
    if (!this.extended[title]) {
      this.extended[title] = true;
      this.props.getRecordsByTitle(title);
    } else {
      delete this.extended[title];
      this.props.collapseTitleList(title);
    }
  }

  shouldComponentUpdate(newProps) {
    let newTitles = _.keys(newProps.titles);
    return !_.isEqual(newTitles, this.titles);
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTitles, getRecordsByTitle, collapseTitleList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Titles);
