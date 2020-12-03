
var FacebookStrategy = require('passport-facebook');



module.exports = function(passport,User){


    passport.use(new FacebookStrategy({
    clientID: '741548203276082',
    clientSecret: '4f3860ffb8d67417a800a66ceb812d1f',
    callbackURL: '/users/auth/facebook/callback',
    profileFields: ['id', 'displayName','photos' ,'email']
},
    (accessToken, refreshToken, profile, done)=>{
       

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



