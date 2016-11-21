// import moment from 'moment';
// import Comics from '../classes/Comics';
import React, { Component } from 'react';

//Listado por fechas
class DaysList extends Component{
	constructor(props) {
		super(props);
    this.state = { items: this.props.Data.collection };
		// this.state = { items: [] };
  }

	componentDidMount(){
		// this.setStateItems();
	}

	// setStateItems(){
	// 	this.setState({ items: this.props.Data.collection });
	// }

	componentWillReceiveProps(nextProps){
		// this.setStateItems();
		console.log("Next props!!!");
		console.log(nextProps);
		this.state.items = [];
		// this.setState({ items: nextProps.Data.collection });
	}

	shouldComponentUpdate(nextProps, nextState) {
		// console.log(nextProps);
		// console.log(nextState);
    if (this.props.Data.collection.length !== nextProps.Data.collection.length) {
			console.log('Update!')
      return true;
    }
		console.log('Stay the same!');
    return false;
  }

	render(){
		// this.setStateItems();
		console.log(this.state.items)

		return (
			<div>
				<h4 className="day-title">{this.props.Data.day}</h4>
				<DataTable Data={this.state.items} />
			</div>
		);
	}
}

//Tabla principal
class DataTable extends Component{
	constructor(props) {
		super(props);

		this.state = { ComicsThisDay: [] };
		for(var i = 0; i < this.props.Data.length; i++)
			this.state.ComicsThisDay.push(<DataTableRow Data={this.props.Data[i]} key={i} />)
  }

	render(){
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
					{this.state.ComicsThisDay}
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

	toggleActivo(event){
		this.setState({adquirido: event.target.checked});
	}

	render(){
		return (
			<tr>
				<td>{this.state.nombre}</td>
				<td>{this.state.volume}</td>
				<td>{this.state.precio}</td>
				<td>
					<input type="checkbox" onChange={this.toggleActivo.bind(this)} checked={this.state.adquirido} /></td>
			</tr>
		);
	}
}

module.exports = { DaysList };
