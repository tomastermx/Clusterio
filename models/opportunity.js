var mongoose = require('mongoose');


  


  const opportunity = new mongoose.Schema({
   
   creado: { type: Date, default: Date.now },
   titulo: String,
   descripcion: String,
   modalidad : String,
   categoria:String,
   tipo: String,
   creador: String
  });


 
 const  Opportunity =  new  mongoose.model('Opportunity' , opportunity);

 module.exports = Opportunity;

