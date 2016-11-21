// import moment from 'moment';
import Comics from '../classes/Comics';
import React, { Component } from 'react';

var CC = new Comics();

//Input del formulario principal
class FormField extends Component{
	constructor(props){
		super(props);
		this.state = {value: this.props.Data.default}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
		this.props.Data.default = event.target.value;
	}

	render(){
		return (
			<div>
				<label htmlFor={this.props.Data.id}>{this.props.Data.titulo}</label>
				<input name={this.props.Data.id} id={this.props.Data.id} type={this.props.Data.type} value={this.state.value} onChange={this.handleChange.bind(this)} />
			</div>
		);
	}
}

class MainForm extends React.Component {
  constructor(props){
    super(props);
		// console.log(this.props);
		this.PropiedadesComic = CC.Propiedades();

		this.Campos = [];
		for(var i = 0; i < this.PropiedadesComic.length; i++)
			this.Campos.push(<FormField Data={this.PropiedadesComic[i]} key={i} />);
  }

  handleSubmit(event) {
		var submitObject = {};
		for(var i = 0; i < this.PropiedadesComic.length; i++)
			submitObject[this.PropiedadesComic[i].id] = this.Campos[i].props.Data.default;

		var newComic = new CC.Comic(submitObject);
		// console.log(xxx);

		// console.log(this.props);
		this.props.Data.AgregarComic(newComic);
		event.preventDefault();
  }

  render() {
    return (
			<form className="main-form" onSubmit={this.handleSubmit.bind(this)}>
				{this.Campos}
				<button type="submit">Registrar</button>
			</form>
    );
  }
}

module.exports = { MainForm };
