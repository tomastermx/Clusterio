

//require('../passports/strategies/google')
//require('../passports/strategies/facebook')
//require('../passports/passport.js')


User = require('../models/users');
const passport = require('passport');
const session = require('express-session');



var failpassword;

var image;
var useralias;



////Login User  Get///////////////////////////////////////////////////////////////////////////

exports.Login = (req,res)=>{

var image   = req.session.loggedIn?  req.session.user.image : "/images/avataaars4.svg" 

res.render('user_login',{image:image});
}


//////// User Login Post ////////////////////////////////////////////////////////////////////

exports.doLogin =(req,res,next)=>{      
      passport.authenticate('local', (err, user, info)=>{


          if (err) { return next(err); }
             if(!user) { res.redirect('/users/login')
                      console.log("password erroneo2") 
                               
                        failpassword = "falla";
                         
             } else {

         req.session.user = { "name": user.local.username, "email" : user.local.email, "_id": user._id}
         req.session.loggedIn = true ;
             console.log(req.session);                                                                                                  
               res.redirect('/users/profile/');
          }
        })(req, res, next);         
      }


/////////////////////////////// User profile ///////////////////////////////////////////////////////////////7

exports.Profile = async(req,res)=>{

 if(req.session.loggedIn===true){

try{

const company = await  Company.find({'creador':req.session.user.email});

var str = req.session.user.username;

var name = str.split(" ")[0];

var logged = req.session.loggedIn


console.log(name);


           res.render('user_profile',{image:req.session.user.image,name:name,logged:logged});


               } catch(e){console.log(e)}


       } else {   res.redirect('/');       }


}


///////////////////////////////////////////User  login Google //////////////////////////////////////////////77

exports.googleLogin = passport.authenticate('google',{ scope: ['profile', 'email'] });


/*
exports.googleAuth = passport.authenticate('google', { failureRedirect: '/' }),(req,res)=>{
    
     if(!req.user.username){  
        
          req.session.loggedIn = true ;
              req.session.user = {  "email" : req.user.google.email, "image" :req.user.google.picture , "_id": req.user._id}
               res.redirect("/users/register") 
         
              } else {

           req.session.loggedIn = true ;
           req.session.user = { "username": req.user.username, "email" : req.user.google.email, "image" :req.user.google.picture , "_id": req.user._id}
            

 
               res.redirect('/users/profile');
                console.log(req.session.user);

                }

        }  

*/

/////////////////////////////////////////////////////User Login Facebook///////////////////////////////////////////////////////

//{scope:['user_photos']}

exports.facebookLogin = passport.authenticate('facebook',{scope:['email']}); 



///////// User  Profile Registration   GET////////////////////////////////////////////////////////


exports.Register =(req,res)=>{
 


   var image   = req.session.loggedIn?  req.session.user.image : "/images/avataaars4.sv" 


	res.render('user_register',{image:image});

}

///////////////// User Profile  Register POST --GOOGLE--FACEBOKK--TWITTER///////////////////////////////////

exports.doRegister = async (req , res)=>{



  
   try{
 const  user = await  User.findOne({'_id':req.user._id});

 user.username = req.body.username;

 user.rol = req.body.rol;


 const persona = await user.save();

 req.session.user.username = req.body.username; 

 // console.log(persona);

 console.log(req.session.user);
 console.log(req.body.rol);

   if(req.body.rol === "company" )
          { res.redirect("/company/new"); 

            } else if (req.body.rol ==="org") {
         
         res.redirect("/organization/new")

       } else if (req.body.rol ==="univ" ) {res.send("universidad");}


 
 }


        catch(e){ console.log(e);}
 
}


/***************************************************************************************************************************************************************
*
*                     USER  PROFILE CONFIG ---GET
*
****************************************************************************************************************************************************************/

exports.Config=(req,res)=>{
 
   //////////// Poner el nombre  usuario, si el usuario esta loggeado  
      
  var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : "Profile"
  
 
              if(req.session.loggedIn === true){ 
  
          res.render('user_profile_settings',{user: req.session.user,image:req.session.user.image,name:name})    
           console.log(req.session.user.name);

               }   else {  res.redirect('/');    }       

}

/***************************************************************************************************************************************************************
*
*                     USER  PROFILE GET DATA JSON ---GET
*
****************************************************************************************************************************************************************/

exports.userdisplayjson = (req,res)=>{
     
      if(req.session.loggedIn === true){
         res.json(req.session.user);
        
         } 
   

}



/***************************************************************************************************************************************************************
*
*                     USER  PROFILE CONFIG ---POST
*
****************************************************************************************************************************************************************/

exports.doConfig = async (req,res)=>{


////El post se hace con jquery con  modify user name
       try {
console.log(req.body.usernamevalue);

req.session.user.username = req.body.usernamevalue;



req.session.save(()=>{console.log(req.session.user)});


const  alias = await User.findOne({'user.username':req.body.newusername});

const user = await User.findOne({$or:[{'google.email':req.session.user.email},{'facebook.email':req.session.user.email}]});

     } catch(err){console.log(err)}

   
 


}



//////////////////// User lOGOUT//////////////////////////////////////

exports.logout= (req,res)=>{

req.session.loggedIn=false;
req.session.user={};
console.log(req.session.user);
     res.redirect('/');    

}

