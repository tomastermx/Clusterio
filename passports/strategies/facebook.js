
var FacebookStrategy = require('passport-facebook');



module.exports = function(passport,User){


    passport.use(new FacebookStrategy({
    clientID: process.env.facebookClientID,
    clientSecret: process.env.facebookClientSECRET,
    callbackURL: '/users/auth/facebook/callback',
    profileFields: ['id', 'displayName','photos' ,'emails']
},
    (accessToken, refreshToken, profile, done)=>{
        console.log(profile);

       User.findOne({ 'facebook.id' : profile.id }, (err, user)=> {
             
       if(err){return done(err); }

             if(user){ return done(null,user);}
                else {
                
            var newUser  = new User();              
            newUser.facebook.id    = profile.id;
            newUser.facebook.token = accessToken;
            newUser.facebook.email = profile.emails[0].value;
            newUser.facebook.picture = profile.photos[0].value; 


                 newUser.save(err=>{
                 	 if(err){ console.log(err)} 
                 	 	else {return done(null,newUser);} 

              })

           }          
            

        })
  

       
           
    }


));





}



