
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

require('dotenv').config();

module.exports = function(passport,User){



    // Use the GoogleStrategy within Passport.
    //   Strategies in Passport require a `verify` function, which accept
    //   credentials (in this case, an accessToken, refreshToken, and Google
    //   profile), and invoke a callback with a user object.
    passport.use(new GoogleStrategy({

        clientID:'391669221808-19gom0qot1tir0bj2npufjavt0q1b49k.apps.googleusercontent.com',
        clientSecret:process.env.googleClientSECRET,
        callbackURL:'https://clusterio.herokuapp.com/users/auth/google/callback'}, function(token, refreshToken, profile, done){
       
          console.log(profile.photos[0].value);
          

   User.findOne({'google.id':profile.id},(err,user)=>{
          
       if(err){ return  done(err); }  else 
          if(user){ return  done(null, user); } 

         else {    

          var newUser  = new User();

           /// Para hacer mas pequeña
           //const ImgUrl = profile._json.image.url.replace("?sz=50", "")

                    newUser.google.id = profile.id;
                    newUser.google.token = token;
                    newUser.google.name = profile.displayName;
                    newUser.google.email = profile.emails[0].value;
                    newUser.google.picture = profile.photos[0].value;
                    
                  newUser.save(err=>{
                          if(err){console.log(err)} else {
                    console.log(user);
                    return done(null,newUser);      
                  }

                 });



               }  



        })

    
        }

    ));

};
