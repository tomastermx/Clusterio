

User = require('../models/users');
const passport = require('passport');
const session = require('express-session');



module.exports = (app)=>{

	app.get('/', async(req,res)=>{



      var image   = req.session.loggedIn?  req.session.user.image :"/images/avataaars4.svg" 
      //////////// Poner el nombre  usuario, si el usuario esta loggeado  
      

       var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : "Profile"
  
       var logged = req.session.loggedIn

      res.render('index',{image:image,name:name,logged:logged});
    
      console.log(req.session.loggedIn);
})


  //////////////////////////////////////////////////////////////////////////////////////////77

	app.get('/faq', async(req,res)=>{
       
      var image   = req.session.loggedIn?  req.session.user.image :"/images/avataaars4.svg" 
      //////////// Poner el nombre  usuario, si el usuario esta loggeado  
      

     var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : ""
  
     var logged = req.session.loggedIn





         res.render('faq', {image:image,name:name,logged:logged});
      


	 })

   

 //////////////////////////////////////////////////////////////////////////////////////////////////////

	app.get('/nosotros', async(req,res)=>{

       
     var image   = req.session.loggedIn?  req.session.user.image :"/images/avataaars4.svg" 
      //////////// Poner el nombre  usuario, si el usuario esta loggeado  
      

     var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : ""
  
     var logged = req.session.loggedIn

       
         res.render('us' , {image:image,name:name,logged:logged} );
      


	 })


 ////////////////////////////////////////////////////////////////////////////////////////////////////// 
   	app.get('/contacto', async(req,res)=>{

           
      var image   = req.session.loggedIn?  req.session.user.image :"/images/avataaars4.svg" 
      //////////// Poner el nombre  usuario, si el usuario esta loggeado  
      

     var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : ""
  
     var logged = req.session.loggedIn



       
         res.render('contacto', {image:image,name:name,logged:logged} );
      


	 })





}