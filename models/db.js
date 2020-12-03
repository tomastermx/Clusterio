

let mongoose = require('mongoose');

dbURI ='mongodb://localhost/factorybase'

mongoose.connect(dbURI);

mongoose.connection.on('connected',function(){
console.log('Mongoose connected to '+dbURI);
});