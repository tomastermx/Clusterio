
 Post = require('../models/post');



/****************************************************************************************************************************************+
                                    ENTRAR A LA PAGINA DE TODOS LOS POSTS

*****************************************************************************************************************************************/




exports.Postspage = (req,res)=>{

   var image   = req.session.loggedIn?  req.session.user.image :"/images/avataaars4.svg" 
      //////////// Poner el nombre  usuario, si el usuario esta loggeado  
      

     var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : ""
  
     var logged = req.session.loggedIn
 




 res.render('forum_posts',{name:name,image:image,logged:logged});

} 


/********************************************************************************************************************************************************+
             Crear un nuevo post 

**********************************************************************************************************************************************************/

exports.postingNew  = (req,res)=>{

 console.log(req.body);

 
  var newPost = new Post();

  newPost.creado = new Date();
  newPost.creador = req.session.user.email;
  newPost.titulo = req.body.titulo;
  newPost.contenido = req.body.contenido;
  newPost.categoria = req.body.tema;
  newPost.raiting =  0;


    newPost.save(err=>{
        if(err){console.log(err)}

        	else{ console.log(newPost)} 

    })



}

/************************************************************************************************************************************************************* 
*                     Los posts de un solo usuario para su pagina de perfil
*    
*   
* ******************************************************************************************************************************************************/

 exports.Userposts  = async(req,res,next ) =>{

    var  creator = req.params.id

    let posts  =  await Post.find({'creador': creator}).sort({'creado': -1})

    res.json(posts);

 }




/******************************************************************************************************************************************
                        Todos los posts de un usuario  -- arrojados cuando  entras a la pagina

*********************************************************************************************************************************************/


   exports.Allposts = async(req,res)=>{
     

    var posts  =  await Post.aggregate([{
           
           $lookup:{
              
                    from: "users",
                    localField: "creador",    // field in the orders collection
                    foreignField: "google.email" || "facebook.email" ,
                    as:"user"}

                  },

              {$lookup:{from:"companies",
                    localField: "creador",    // field in the orders collection
                    foreignField: "creador", 
                    as:"company"
                   }} , {$lookup:{from:"orgs",
                    localField: "creador",    // field in the orders collection
                    foreignField: "creador", 
                    as:"org"
                   }},
                   

                   {$project:{__v:0, "user.__v":0 ,"user.createdOn":0 ,"user._id":0 , "user.google":{token:0,picture:0, id:0} ,  "company.productos":0, "company.certificados":0, "company.created":0, "company.description":0, "company.pais":0,"company.estado":0,"company.ciudad":0,"company.calle":0,"company.numero":0 , "company.telefono":0, "company.industria":0, "company.subindustria":0, "company.masinformacion":0, "company.__v":0,
                              "company.creador":0,  "org.created":0, "org.description":0, "org.pais":0, "org.estado":0, "org.ciudad":0, "org.calle":0, "org.latitud":0, "org.longitud":0, "org.__v":0

                               }}
                  
        ]).sort({'creado': -1});

       res.json(posts);
  
 }

      /***********************************************************************************************************************************************************************************************************************************************************************************
       * 
       *              Todos los posts filtrados por categoria ó  ordenados por relevancia
       * 
       * *********************************************************************************************************************************************************************************************************************************************************************************/

      exports.notAllposts = async(req,res,next)=>{

          console.log(req.body);


           var posts  =  await Post.aggregate([{ $match: { 'categoria': req.body.category  } },



           {
           

           $lookup:{
              
                    from: "users",
                    localField: "creador",    // field in the orders collection
                    foreignField: "google.email" || "facebook.email" ,
                    as:"user"}

                  },

              {$lookup:{from:"companies",
                    localField: "creador",    // field in the orders collection
                    foreignField: "creador", 
                    as:"company"
                   }} , {$lookup:{from:"orgs",
                    localField: "creador",    // field in the orders collection
                    foreignField: "creador", 
                    as:"org"
                   }},
                   

                   {$project:{__v:0, "user.__v":0 ,"user.createdOn":0 ,"user._id":0 , "user.google":{token:0,picture:0, id:0} ,  "company.productos":0, "company.certificados":0, "company.created":0, "company.description":0, "company.pais":0,"company.estado":0,"company.ciudad":0,"company.calle":0,"company.numero":0 , "company.telefono":0, "company.industria":0, "company.subindustria":0, "company.masinformacion":0, "company.__v":0,
                              "company.creador":0,  "org.created":0, "org.description":0, "org.pais":0, "org.estado":0, "org.ciudad":0, "org.calle":0, "org.latitud":0, "org.longitud":0, "org.__v":0

                               }}
                  
        ]);

       res.json(posts);           



      }

    

      /**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************

                                                                                                       Página de un solo Post

      ***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/




      exports.OnepostPage = (req,res )=>{
         
                var image   = req.session.loggedIn?  req.session.user.image :"/images/avataaars4.svg" 
        //////////// Poner el nombre  usuario, si el usuario esta loggeado  
      

      var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : ""
  
      var logged = req.session.loggedIn
     



          res.render('single_post');
  

      }   




       exports.deletePost =(req,res)=>{}