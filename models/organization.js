const mongoose = require('mongoose');


const OrganizationSchema = new  mongoose.Schema({



  created: Date,
  nombre: String,
  description:String,
  tipo:String,
  pais: String,
  codigopostal:String,
  estado:String,
  ciudad: String,
  calle: String,
  numero:String,
  latitud:String,
  longitud:String,
  telefono:String,
  creador:String


});

const Org = mongoose.model('Org', OrganizationSchema);

module.exports = Org;