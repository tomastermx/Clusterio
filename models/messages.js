const mongoose = require('mongoose');


const messageSchema = new  mongoose.Schema({


 Date: { type: Date, default: Date.now },
 from: String,
 to : String,
 message : String,
 view: String


});






const Message  = mongoose.model('Messages', messageSchema);

module.exports = Message;