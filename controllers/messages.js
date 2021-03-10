

const passport = require('passport');
const session = require('express-session');
 
 Company = require('../models/company');
 



exports.Inbox =(req,res)=>{

	res.render('message_inbox');
}






/************************************************************************************************************

                              Get-- mandar nuevo msg
*************************************************************************************************************/


exports.newMessage = (req,res)=>{

res.render('message_send');


  
}