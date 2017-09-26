import React, { Component } from 'react';

//Currency format
function currency(value, decimalPosition = 2) {
  return '$' + value.toFixed(decimalPosition).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

//Listado por fechas
class DaysList extends Component{
	render(){
		// console.log(this.props)
		return (
			<div>
				<h4 className="day-title">{this.props.Data.day.moment.format('ddd D [de] MMM [del] YYYY')}</h4>
				<DataTable Data={this.props.Data.collection} />
			</div>
		);
	}
}

//Tabla principal
class DataTable extends Component{
	render(){
		var ComicsThisDay = [];
		for(var i = 0; i < this.props.Data.length; i++)
			ComicsThisDay.push(<DataTableRow Data={this.props.Data[i]} key={i} />);

		return (
			<table className="day-table">
				<thead>
					<tr>
						<th>Título</th>
						<th>Volumen</th>
						<th>Precio</th>
						<th>Adquirido</th>
					</tr>
				</thead>
				<tbody>
					{ComicsThisDay}
				</tbody>
			</table>
		);
	}
}

//Renglón de un registro
class DataTableRow extends Component{
	constructor(props){
		super(props);
		this.state = this.props.Data;
	}

	Adquirir(event){
		this.state.Adquirir();
		this.setState({adquirido: event.target.checked});
	}

	render(){
		return (
			<tr>
				<td>{this.state.titulo}</td>
				<td>{this.state.volumen}</td>
				<td>{currency(this.state.precio)}</td>
				<td>
					<input type="checkbox" onChange={this.Adquirir.bind(this)} checked={this.state.adquirido} /></td>
			</tr>
		);
	}
}

module.exports = { DaysList };
