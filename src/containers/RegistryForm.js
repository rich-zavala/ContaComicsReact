import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addRecord, updateYear, selectYear, recordAdded } from "../actions/index";
import FormField from "../components/Field";
import { Comic, ComicFields } from "../classes/Comic";
import * as _ from "lodash";

class RegistryForm extends React.Component {
  fields;

  render() {
    this.fields = ComicFields().map((f, i) => <FormField Data={f} key={i} />);

    return (
      <div>
        <form className="main-form" onSubmit={this.handleSubmit.bind(this)}>
          {this.fields}
          <button type="submit">Registrar</button>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    let recordObject = new Comic(this.fieldsValues());
    this.props.addRecord(recordObject)
      .then(r => {
        if (!r.payload || !r.payload.error) {
          let year = recordObject.year;
          this.props.updateYear(year, recordObject);
          this.props.recordAdded(recordObject);
          this.forceUpdate(); // Reset form

          // To know if year-record repopulation is needed, lets take a
          // look into props.yearRecords and see if one is from same year
          if (this.props.yearRecords.length === 0 || _.first(this.props.yearRecords).year === year) {
            this.props.selectYear(year);
          }
        } else {
          console.log("This record is already stored :(", r.payload.msg)
        }
      });
  }

  fieldsValues() {
    let recordAttributes = {};
    this.fields.forEach(f => {
      recordAttributes[f.props.Data.id] = f.props.Data.value;
    });
    return recordAttributes;
  }

  afterSubmit() {
    this.updateRecords(true);
  }
}

function mapStateToProps(state) { // This is how React and Redux get glued!
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addRecord, updateYear, selectYear, recordAdded }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistryForm);
