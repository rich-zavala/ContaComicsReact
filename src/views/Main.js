import React from 'react';
import RegistryForm from "../components/Form/Form";

export default class Landing extends React.Component {
  render() {
    return (
      <fieldset>
        <legend>Create a new record</legend>
        <RegistryForm />
      </fieldset>
    )
  }
}  
