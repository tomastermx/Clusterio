

const passport = require('passport');
const session = require('express-session');
 
 Company = require('../models/company');
 
 Message = require('../models/messages');



/*************************************************************************************************************************

             Get --- Entrar a mi innbox

***************************************************************************************************************************/


exports.Inbox =(req,res)=>{

	res.render('message_inbox');
}






/************************************************************************************************************

                               mandar nuevo msg ---Get
*************************************************************************************************************/


          exports.newMessage = (req,res)=>{

        var image   = req.session.loggedIn?  req.session.user.image : "/images/avataaars4.svg"      

         console.log(req.params.id)


         res.render('message_send',{image:image});


  
}


/************************************************************************************************************

                               mandar nuevo msg ---Post
*************************************************************************************************************/

           exports.donewMessage = async(req,res)=>{


           

           console.log(req.params.id);
           console.log(req.body.message);
           console.log(req.session.user.username);
       
          try {

          
            

             const company = await Company.findOne({'_id':req.params.id}) 

             const  newMessage  = new Message();  
             
             newMessage.Date = Date.now();
             newMessage.from = req.session.user.email;
             newMessage.to = company.creador;
             newMessage.message =req.body.message;

             newMessage.save((err,message)=>{
              console.log(message);
             })
             


             } catch(e){console.log(e)}

      }