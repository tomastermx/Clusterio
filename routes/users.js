
 var truepassword;
 var useralias;
 var failpassword;
 var test ="prueba";

module.exports  = (app,passport,session,jwt,User,Company,Org,controllerUser) => {

/***********************************************************************************************************************
*
*
*
*                     Login de usuario ---Local --- Get
***********************************************************************************************************************/

	app.get('/users/login',controllerUser.Login);

/******************************************************************************************************************
*
*
*                    Login de Usuario ---Local--- Post 
*
`*************************************************************************************************************/

 //No se usa por que solo se loggea con redes sociales

  //app.post('/users/login',controllerUser.doLogin);


 //   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

    

/***********************************************************************************************************

                                  Login de Usuario Google 


**************************************************************************************************************/
  /// Mandar solicitud a google 
 

 app.get('/users/auth/google', controllerUser.googleLogin);
 
 //app.get('/users/auth/google/callback', controllerUser.googleAuth);



 
  app.get('/users/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),(req,res)=>{
    
     if(!req.user.username){  
        
          req.session.loggedIn = true ;
              req.session.user = {  "email" : req.user.google.email, "image" :req.user.google.picture , "_id": req.user._id}
               res.redirect("/users/register") 
         
              } else {

           req.session.loggedIn = true ;
           req.session.user = { "username": req.user.username, "email" : req.user.google.email, "image" :req.user.google.picture , "_id": req.user._id , "rol":req.user.rol }
            

 
               res.redirect('/users/profile/');
                console.log(req.session.user);

                }

        });



/***********************************************************************************************************

                                  Login de Usuario Facebook


**************************************************************************************************************/
// Mandar solicitud  a Facebook


app.get('/users/auth/facebook',controllerUser.facebookLogin);

///Solicitud de regreso/////////////////////////////////////////////

app.get('/users/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/' }),
     (req, res)=> { 

        if(!req.user.username){ 

          req.session.loggedIn = true ;
               req.session.user = {  "email" : req.user.facebook.email, "image" : req.user.facebook.picture ,"_id": req.user._id}

                res.redirect('/users/register'); 

         } else {    

     req.session.loggedIn = true ;
        req.session.user = { "username": req.user.username, "email" : req.user.facebook.email, "image":req.user.facebook.picture ,"_id": req.user._id , "rol":req.user.rol}
          console.log(req.session.user);
           res.redirect('/users/profile/');


          }

   });



/*****************************************************************************************************************

                                       Profile - Perfil de Usuario GET

******************************************************************************************************************/
            
app.get('/users/profile/',controllerUser.Profile);

/*****************************************************************************************************************

                                         Profile  - Perfil de usuario POST

******************************************************************************************************************/



//app.post('/users/profile',controllerUser.Profile);




/************************************************************************************************************

                       CREACIÓN DE USUARIOS ----LOCAL

************************************************************************************************************/

	app.get('/users/profile/new', (req,res)=>{

    res.render('user_profile_new',{password:truepassword, username:useralias});	


  })




app.post('/users/profile/new', (req,res)=>{
 

 ////////Validación usuario y passowrd  //////////////////////////////////////////////////////////////////////////

             const alias =  new Promise((resolve,reject)=>{
              User.findOne({'local.username':req.body.username})
              .then((user)=>{
                 if(!user){resolve(req.body.username)} else {
                    reject('usuario ya existente')}
                    })

            }).then(()=>{return new Promise((resolve,reject)=>{
              User.findOne({'local.email':req.body.email})
                     .then((user)=>{
                             if(!user){
                                resolve(req.body.email)
                             } else {
                                 reject('correo ya en uso')
                             } 

                     })  

             })
          })


            

             .then(()=>{ return new Promise((resolve,reject)=>{

               
                  User.findOne({'local.email':req.body.email})
                     .then((user)=>{
                      if(!user){resolve(req.body.email)} else {
                          reject('email en uso');
                            }
                     })
          



             })
      })
                  



             .then(()=>{  return new Promise((resolve, reject)=>{
                 if(req.body.password.length>=8 && req.body.password.match()){
                         if (req.body.password === req.body.password2 ){
                             resolve(req.body.length)
                        } else {reject('no son iguales')}
                 
                 }  else { reject('password invalido')}  
             })
          }) 


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 alias.then(()=>{

/////////////////////////////////////////////// Creación de usuario ////////////////////////////////////////////

       newUser = new User();
       newUser.local.username = req.body.username;
       newUser.local.email = req.body.email;
       newUser.local.rol = "";
       newUser.local.password = newUser.generateHash(req.body.password);

           newUser.save((err,user)=>{

             if(!err){       
         console.log("User created + saved"+ user );
         // Transfer user data to  session//////////////////////
          req.session.user = { "name": user.local.username, "email" : user.local.email, "_id": user._id}
          
           console.log(req.session);

           /////Redirección a a página de perfiles
            res.redirect('/users/register/');
              }
      })
 

   })


       .catch((err)=>{
             console.log(err)
                                
          if(err=='usuario ya existente'){
               useralias="ya elegido";
                   } else if(err=='password invalido'){
                        useralias="";
                        truepassword="falla";
                   } else if (err ==='no son iguales'){
                        useralias="";
                        truepassword="falla2";

                    }
         
            
              res.redirect('/users/profile/new')
               })

		})




/*************************************************************************************
*
*
*               Registro de username de usuarios y rol --- Get
*
*************************************************************************************/


app.get('/users/register',controllerUser.Register);


/*************************************************************************************
*
*
*               Registro de username de usuarios y rol --- Post
*
*************************************************************************************/

app.post('/users/register',controllerUser.doRegister);



/*****************************************************************************************************
*             Página de Configuración  perfil de usuario----- GET
*
*
*****************************************************************************************************/

  app.get('/users/profile/settings', controllerUser.Config);


/*****************************************************************************************************
*             Página de Configuración  perfil de usuario----- POST
*
*
*****************************************************************************************************/


  app.post('/users/profile/settings',controllerUser.doConfig);

/***********************************************************************************************************************
 Datos de perfil json



**********************************************************************************************************************/


app.get('/users/profile/json',controllerUser.userdisplayjson);


/*********************************************************************************************************
                 Posteo de información del usuario ---> HTTP--GET

**********************************************************************************************************/

   
app.get('/users/profile/posts',controllerUser.PostingUser);


/************************************************************************************************************************************

                         POSTEO DE ADS   del usuerio --->HHTP---GET


*************************************************************************************************************************************/


app.get('/users/profile/ads' , controllerUser.adsUser);

/////////////////////////// //Modificación del nombre de usuario ///////////////////////////



/**********************************************************************************************************************************+
*    *
*    *                Cerrar sesión
*    *
*     
*******************************************************************************************************************************************/

app.get('/users/logout',controllerUser.logout)






}

