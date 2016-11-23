import moment from 'moment';

function code(rr){ return (rr.titulo + rr.volumen + rr.variante).replace(/[^a-z0-9]/gi, ''); }
function ComicsPropiedades(){
	return [
		{ titulo: 'Título', id: 'titulo', type: 'text', default: 'Ricardo Zavala' },
		{ titulo: 'Volumen', id: 'volumen', type: 'number', default: 0 },
		{ titulo: 'Variante', id: 'variante', type: 'text', default: '' },
		{ titulo: 'Precio', id: 'precio', type: 'number', default: 0 },
		{ titulo: 'Fecha', id: 'fecha', type: 'date', default: '2016-05-01' },
		{ titulo: 'Adquirido', id: 'adquirido', type: 'checkbox', default: false }
	];
}

class Comics {
	//Generador de ID
	Code(rr){
		return code(rr);
	}

	//Propiedades por default de un comics
	Propiedades(){
		return ComicsPropiedades();
	}

	//Tipo de objeto "comic"
	Comic(info){
		try{
			var propiedades = ComicsPropiedades();
			for(var i in propiedades){
				var p = propiedades[i];
				switch(p.type){
					case "text":
						if(typeof info[p.id] !== 'undefined')
							this[p.id] = info[p.id].trim().toUpperCase();
						else
							this[p.id] = '';
						break;

					case "number": //Volumen y precio
						if(typeof info[p.id] !== 'undefined')
							this[p.id] = (Number.isInteger(parseFloat(info[p.id]))) ? parseInt(info[p.id]) : parseFloat(info[p.id]);
						else
							this[p.id] = 0;
						break;

					case "date":
						if(typeof info[p.id] !== 'undefined')
							this[p.id] = moment(info[p.id]);
						else
							this[p.id] = moment();
						break;

					case "checkbox":
						if(typeof(info[p.id]) === "boolean" || info[p.id] === "true")
							this[p.id] = info[p.id];
						else
							this[p.id] = false;
						break;
				}
			}

			//El día almacena el valor para ordenar y el objeto moment real
			this.fecha = {
				num: this.fecha.format('YYYY-MM-DD'),
				moment: this.fecha
			};

			//ID del objeto
			this.id = code(this);

			//Fecha de adquisición
			this.fechaAdquirido = null;
			this.Adquirir = function(){ //Switchear entre adquirido y no adquirido
				this.adquirido = !this.adquirido;
				this.fechaAdquirido = (this.adquirido) ? moment() : null;
			};
		}
		catch(e){ console.error(e); }
	}

	//Agregar objeto a la colección
	AgregarComic(newComic){
		if(newComic.constructor.name !== 'Comic')
			newComic = new this.Comic(newComic);

		if(this.collection.filter(((el) => { return el.id === newComic.id; }).bind(this)).length === 0){
			this.collection.push(newComic);
			this.AgregarFecha(newComic.fecha);
			return true;
		}
		else {
			return false;
		}
	}

	//Agregar fechas si no existen en el índice
	AgregarFecha(fecha){
		if(this.dates.filter((e) => { return e.num === fecha.num; }).length === 0)
			this.dates.push(fecha);

		//Ordenar Fechas
		this.dates.sort((a, b) => {
		  if (a.moment.format('YYYYMMDD') < b.moment.format('YYYYMMDD'))
		    return -1;
		  if (a.moment.format('YYYYMMDD') > b.moment.format('YYYYMMDD'))
		    return 1;

		  return 0;
		});
	}

	//Constructor principal de datos
	constructor(alimentar = true){
		this.dates = []; //Fechas en arreglo monodimencional

		//Collection
		this.collection = [];
		var colection_source = [
			{ titulo : "Miracleman", volumen: 5, precio: 81, fecha: "2016-09-15", adquirido: true },
			{ titulo : "Amazing Spiderman", volumen: 1, precio: 27, fecha: "2016-05-01", adquirido: false },
			{ titulo : "Star Wars Han Solo", volumen: 2, precio: 32, fecha: "2016-05-01", adquirido: false },
			{ titulo : "Batman", volumen: 3, precio: 27, fecha: "2016-05-01", adquirido: false },
			{ titulo : "Guardians of the Galaxy", volumen: 1, precio: 32, fecha: "2016-05-01", adquirido: false },
			{ titulo : "Thundercats", volumen: 48, precio: 41, fecha: "2016-07-05", adquirido: true },
			{ titulo : "Gantz", volumen: 50, precio: 72, fecha: "2016-07-05", adquirido: false },
			{ titulo : "Amazing Spiderman", volumen: 2, precio: 27, fecha: "2016-07-05", adquirido: true },
			{ titulo : "Star Wars Han Solo", volumen: 4, precio: 32, fecha: "2016-07-05", adquirido: true },
			{ titulo : "Batman", volumen: 4, precio: 41, fecha: "2016-09-15", adquirido: false },
			{ titulo : "Gantz", volumen: 51, precio: 72, fecha: "2016-09-15", adquirido: false },
			{ titulo : "The Sandman", volumen: 1, precio: 299, fecha: "2016-09-15", adquirido: false },
			{ titulo : "Star Wars", volumen: 9, precio: 27, fecha: "2016-09-15", adquirido: false },
			{ titulo : "Amazing Spiderman", volumen: 3, precio: 29, fecha: "2016-09-15", adquirido: true },
		];

		if(alimentar){
			for(var i = 0; i < colection_source.length; i++)
	      if(this[i] !== 0)
					this.AgregarComic(colection_source[i]);
		}
	}
}

export default Comics;
