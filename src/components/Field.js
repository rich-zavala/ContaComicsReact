import React from "react";
import moment from "moment";

export default class FormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.isCheckbox ? false : this.props.Data.value };
    this.handleChange = this.handleChange.bind(this);
    this.isCheckbox = this.props.Data.type === "checkbox";
  }

  handleChange(event) {
    this.updateFieldState(event.target.value);
  }

  handleCheckbox(event) {
    this.updateFieldState(event.target.checked);
  }

  updateFieldState(value) {
    this.setState({ value: value });
    this.props.Data.value = value;
  }

  render() {
    let attributes = {
      name: this.props.Data.id,
      id: this.props.Data.id,
      required: this.props.Data.required
    };

    if (this.isCheckbox) {
      attributes.type = "checkbox";
      attributes.checked = this.state.value;
      attributes.value = this.state.value;
      attributes.onChange = this.handleCheckbox.bind(this)
    } else {
      attributes.type = this.props.Data.type;
      attributes.value = this.state.value;
      attributes.onChange = this.handleChange.bind(this)
    }

    // Handle date default value
    if (this.props.Data.type === "date" && (!this.state.value || this.state.value === ""))
      attributes.value = fieldDateNow();

    return (
      <div>
        <label htmlFor={attributes.id}>{this.props.Data.title}</label>
        <input {...attributes} />
      </div>
    );
  }
}

function fieldDateNow() {
  return moment().format("YYYY-MM-DD");
}
