import moment from 'moment';

class Comics {
	//Propiedades por default de un comics
	Propiedades(){
		return [
			{ titulo: 'Nombre', id: 'nombre', type: 'text', default: 'Ricardo Zavala' },
			{ titulo: 'Volume', id: 'volume', type: 'number', default: 0 },
			{ titulo: 'Precio', id: 'precio', type: 'number', default: 0 },
			{ titulo: 'Fecha', id: 'fecha', type: 'date', default: '2016-05-01' },
			{ titulo: 'Adquirido', id: 'adquirido', type: 'checkbox', default: false },
		];
	}

	//Tipo de objeto "comic"
	Comic(info){
		try{
			this.nombre = info.nombre.trim();
			this.volume = parseInt(info.volume);
			this.precio = parseFloat(info.precio);
			this.fecha = moment(info.fecha);
			this.dia = moment(info.fecha).format('ddd D [de] MMM [del] YYYY');
			this.adquirido = info.adquirido ? false : true;
		}
		catch(e){ console.error(e); }
	}

	//Agregar objeto a la colección
	AgregarComic(info){
		this.collection.push(new this.Comic(info));
		this.AgregarFecha(this.collection[this.collection.length - 1].dia)
	}

	//Agregar fechas
	AgregarFecha(fecha){
		if(this.dates.indexOf(fecha) < 0){
			this.dates.push(fecha);
		}
	}

	//Constructor principal de datos
	constructor(){
		//Gestión de fechas
		this.dates = []; //Fechas en arreglo monodimencional

		//Collection
		this.collection = [];
		var colection_source = [
			{ nombre : "Amazing Spiderman", volume: 1, precio: 27, fecha: "2016-05-01", adquirido: false },
			{ nombre : "Star Wars Han Solo", volume: 2, precio: 32, fecha: "2016-05-01", adquirido: false },
			{ nombre : "Batman", volume: 3, precio: 27, fecha: "2016-05-01", adquirido: false },
			{ nombre : "Guardians of the Galaxy", volume: 1, precio: 32, fecha: "2016-05-01", adquirido: false },
			{ nombre : "Thundercats", volume: 48, precio: 41, fecha: "2016-07-05", adquirido: true },
			{ nombre : "Gantz", volume: 50, precio: 72, fecha: "2016-07-05", adquirido: false },
			{ nombre : "Amazing Spiderman", volume: 2, precio: 27, fecha: "2016-07-05", adquirido: true },
			{ nombre : "Star Wars Han Solo", volume: 4, precio: 32, fecha: "2016-07-05", adquirido: true },
			{ nombre : "Batman", volume: 4, precio: 41, fecha: "2016-09-15", adquirido: false },
			{ nombre : "Gantz", volume: 51, precio: 72, fecha: "2016-09-15", adquirido: false },
			{ nombre : "The Sandman", volume: 1, precio: 299, fecha: "2016-09-15", adquirido: false },
			{ nombre : "Star Wars", volume: 9, precio: 27, fecha: "2016-09-15", adquirido: false },
			{ nombre : "Amazing Spiderman", volume: 3, precio: 29, fecha: "2016-09-15", adquirido: true },
			{ nombre : "Miracleman", volume: 5, precio: 81, fecha: "2016-09-15", adquirido: true },
		];

		for(var i = 0; i < colection_source.length; i++)
      if(this[i] !== 0)
				this.AgregarComic(colection_source[i]);
	}
}

export default Comics;
