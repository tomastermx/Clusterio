

User = require('../models/users');
const passport = require('passport');
const session = require('express-session');



module.exports = (app)=>{

	app.get('/', async(req,res)=>{

      var image   = req.session.loggedIn?  req.session.user.image : "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraightStrand&accessoriesType=Round&hairColor=Blonde&facialHairType=Blank&clotheType=CollarSweater&clotheColor=Red&eyeType=Wink&eyebrowType=SadConcernedNatural&mouthType=Smile&skinColor=Light" 
      //////////// Poner el nombre  usuario, si el usuario esta loggeado  
      
       var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : "Profile"
  

      res.render('index',{image:image,name:name});
   

})




	app.post('/', async(req,res)=>{
       

      res.json(company);


	    })

}