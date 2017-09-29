import React from "react";
import { connect } from "react-redux";
import { Comic, ComicFields } from "../classes/Comic";
import FormField from "../components/Field";

class RegistryForm extends React.Component {
  db;
  records = [];

  constructor(props) {
    super(props);
    // this.db = this.props.DBInstance;
    // this.records = this.db.records;
    this.createFields();
    this.updateRecords(false);
  }

  // Create an array of fields components
  createFields() {
    this.fields = ComicFields().map((f, i) => <FormField Data={f} key={i} />);
  }

  render() {
    console.group("RegistryForm.render");
    console.log("props", this.props);
    console.log("state", this.state);
    console.groupEnd();

    let records = this.records.map((r, i) =>
      <li key={i}>
        {r.title} #{r.volumen}
      </li>
    );

    return (
      <div>
        <form className="main-form" onSubmit={this.handleSubmit.bind(this)}>
          {this.fields}
          <button type="submit">Registrar</button>
        </form>
        <ul>{records}</ul>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    let submitObject = new Comic();
    this.fields.forEach(f => {
      submitObject[f.props.Data.id] = f.props.Data.value;
    });

    console.groupCollapsed("Submitting data");
    console.log("Fields values >> ", this.fields);
    console.log("Comic subject >> ", submitObject);
    if (this.db.addRecord(submitObject)) {
      this.afterSubmit();
      console.log("Stored!");
    } else {
      console.log("This record is already stored :(");
    }
    console.groupEnd();
  }

  updateRecords(update) {
    console.log("RegistryForm.updateRecords.records > ", this.records);
    // if (update === true) this.forceUpdate();
  }

  afterSubmit() {
    this.updateRecords(true);
  }
}

function mapStateToProps(state) {
  console.log("RegistryForm.mapStateToProps.state", state);
  return {
    activeYear: state.activeYear
  };
}

export default connect(mapStateToProps)(RegistryForm);
