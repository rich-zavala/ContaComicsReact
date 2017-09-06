import Comics from '../classes/Comics';
import React, { Component } from 'react';
import FormField from './Field';

var CC = new Comics(false);

export default class MainForm extends React.Component {
	constructor(props) {
		super(props);
		this.PropiedadesComic = CC.Propiedades();

		this.Campos = [];
		for (var i = 0; i < this.PropiedadesComic.length; i++)
			this.Campos.push(<FormField Data={this.PropiedadesComic[i]} key={i} />);
	}

	handleSubmit(event) {
		event.preventDefault();
		var submitObject = {};
		for (var i = 0; i < this.PropiedadesComic.length; i++)
			submitObject[this.PropiedadesComic[i].id] = this.Campos[i].props.Data.default;
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
