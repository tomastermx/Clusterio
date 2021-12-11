 const mongoose = require('mongoose');


/************************************************************************************
*                       Company Schema                                  
* 
*
*
**************************************************************************************/


const companySchema = new  mongoose.Schema({

  created: Date,
  nombre: String,
  description:String,
  urlimagen:String,
  pais: String,
  estado:String,
  ciudad: String,
  calle: String,
  codigopostal:String,
  numero:String,
  latitud:Number,
  longitud:Number,
  telefono:String,
  web:String,
  creador:String,
  industria: String,
  subindustria:String,
  productos:[{}],
  certificados: [String],
  masinformacion:String

})



const Company = mongoose.model('Company', companySchema);

module.exports = Company;
