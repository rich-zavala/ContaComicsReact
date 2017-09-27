import React from 'react';
// import { DB } from '../DBHandlers/DB';

// import RegistryForm from "../components/Form/Form";
import CheckList from "../containers/CheckList";

export default class Landing extends React.Component {
  render() {
    return (
      <div>
        <CheckList />
      </div>
    );
  }
}

/*export default class Landing extends React.Component {
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
*/