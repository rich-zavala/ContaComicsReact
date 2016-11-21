// import moment from 'moment';
import Comics from './classes/Comics';
import Form from './views/Form';
import List from './views/List';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props){
		super(props);
		this.CC = new Comics(); //Inicializar datos;

		//Obtener todos los comics de un día
		this.state = { Days: [], Lists: [] };
	}

	componentDidMount(){
		this.GenerarListados();
	}

	//Generar listados
	GenerarListados(){
		// console.log(this.CC);

		var Days = [];
		var Lists = [];
		for(var i = 0; i < this.CC.dates.length; i++){
			if(Days.indexOf(this.CC.dates[i]) < 0){
				var DayData = {
					day: this.CC.dates[i],
					collection: this.CC.collection.filter(((el) => { return el.dia === this.CC.dates[i]; }).bind(this))
				};

				Days.push(DayData);
				Lists.push(<List.DaysList Data={DayData} key={i} />);
			}
		}
		console.log(Lists)

		//Generar arreglo de objetos tipo "DayList"
		// for(i = 0; i < Days.length; i++){
			// console.log(i);
			// Lists.push(<List.DaysList Data={this.state.Days[i]} key={i} />);
		// }

		// this.state.Lists = [];
		this.setState({
			Days: Days,
			Lists: Lists
		});
	}

	//Agregar un items
	AgregarComic(comic){
		try{
			this.CC.AgregarComic(comic);
			this.GenerarListados()
		}catch(e){ console.log(e); }
	}

  render() {

		return (
			<div>
				<div className="column">
					<Form.MainForm Data={this} />
				</div>
				<div className="column">
					{this.state.Lists}
				</div>
			</div>
		);
  }
}

export default App;
