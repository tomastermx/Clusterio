var mongoose = require('mongoose');


  


  const opportunity = new mongoose.Schema({
   
   created: Date,
   descripcion: String,
   frecuencia:String,
   creador: String

  });


 
 const  Opportunity =  new  mongoose.model('Opportunity' , opportunity);

 module.exports = Opportunity;

