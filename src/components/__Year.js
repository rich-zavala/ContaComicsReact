import React from "react";
export default class Year extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <li onClick={() => this.props.selectYear(this.props.year)}>{this.props.year.name}</li>
    );
  }
}