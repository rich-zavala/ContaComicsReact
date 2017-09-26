import React from "react";
export default class Year extends React.Component {
  render() {
    return (
      <li>{this.props.year.name}</li>
    );
  }
}