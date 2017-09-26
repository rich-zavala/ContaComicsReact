import React from 'react';
import RegistryForm from "../components/Form/Form";
import CheckList from "../components/CheckList/CheckList";
import { DB } from '../DBHandlers/DB';

export default class Landing extends React.Component {
  db = new DB();

  render() {
    return (
      <div>
        <fieldset>
          <legend>Create a new record</legend>
          <RegistryForm DBInstance={this.db} />
        </fieldset>
        <hr />
        <CheckList DBInstance={this.db} />
      </div>
    )
  }
}
