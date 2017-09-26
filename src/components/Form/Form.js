import React from "react";
import { Comic, ComicFields } from "../../classes/Comic";
import FormField from "./Field";

export default class RegistryForm extends React.Component {
  db;
  records;

  constructor(props) {
    super(props);
    this.db = this.props.DBInstance;
    this.records = this.db.records;
    this.fields = ComicFields().map((f, i) => <FormField Data={f} key={i} />);
    this.updateRecords(false);
  }

  render() {
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
    console.log("Records > ", this.records);
    if (update === true) this.forceUpdate();
  }

  afterSubmit() {
    this.updateRecords(true);
  }
}
