const mongoose = require('mongoose');


const messageSchema = new  mongoose.Schema({


 createdOn: { type: Date, default: Date.now },
 from: String,
 to : String,
 view: String


});






const Message  = mongoose.model('Messages', messageSchema);

module.exports = Message;