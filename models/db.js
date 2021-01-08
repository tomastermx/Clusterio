
require('dotenv').config();

let mongoose = require('mongoose');

dbURI ='mongodb://localhost/factorybase'



mongoose.connect(process.env.mongo);

mongoose.connection.on('connected',function(){
console.log('Mongoose connected to Mongo Atlas');
});