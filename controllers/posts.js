
 Post = require('../models/post');



/****************************************************************************************************************************************+
                                    ENTRAR A LA PAGINA DE TODOS LOS POSTS

*****************************************************************************************************************************************/




exports.Postspage = (req,res)=>{

   var image   = req.session.loggedIn?  req.session.user.image :"/images/avataaars4.svg" 
      //////////// Poner el nombre  usuario, si el usuario esta loggeado  
      

     var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : ""
  
     var logged = req.session.loggedIn

     var email = req.session.loggedIn ? req.session.user.email : "cosme fulanito";




     res.render('forum_posts',{name:name,image:image,logged:logged,email:email});





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
  newPost.tipo= "principal";
  newPost.raiting =  0;


    newPost.save(err=>{
        if(err){console.log(err)}

        	else{ console.log(newPost)} 

    })

   res.json(newPost);

}

/************************************************************************************************************************************************************* 
*                     Los posts de un solo usuario para su pagina de perfil
*    
*   
* ******************************************************************************************************************************************************/

 exports.Userposts  = async(req,res,next ) =>{

    var  creator = req.params.id

    let posts  =  await Post.find({'creador': creator}).sort({'creado': -1}).populate({path :'postorigen' });

    console.log(posts);

    res.json(posts);

 }




/******************************************************************************************************************************************
                         Feed de posts  transmitidos según   la categoria  de la carpeta posts/+

*********************************************************************************************************************************************/


   exports.Allposts = async(req,res,next)=>{
     
    console.log(req.query.order);
  
   console.log(req.params.id);

    if(req.params.id === "general"  &&  req.query.order !=='rank'){
      
      

      try{

         var posts  =  await Post.aggregate([{$match:{tipo:'principal'}},{
           
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
                   

                              {$project:{__v:0, "user.__v":0 ,"user.createdOn":0 ,"user._id":0 , "user.google":{token:0, id:0} ,  "company.productos":0, "company.certificados":0, "company.created":0, "company.description":0, "company.pais":0,"company.estado":0,"company.ciudad":0,"company.calle":0,"company.numero":0 , "company.telefono":0, "company.industria":0, "company.subindustria":0, "company.masinformacion":0, "company.__v":0,
                              "company.creador":0,  "org.created":0, "org.description":0, "org.pais":0, "org.estado":0, "org.ciudad":0, "org.calle":0, "org.latitud":0, "org.longitud":0, "org.__v":0

                                 }}
                   
                ]).sort({'creado': -1});

                res.json(posts); 

                } catch(e){console.log(e)};


        }  else  if(req.params.id !=="general" && req.query.order !=='rank' ) {

         ///////////////////////////// Aqui empieza la otra query con diferente a general 

           try{          

           var posts  =  await Post.aggregate([{ $match: { 'categoria': req.params.id  } },



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
                   

                   {$project:{__v:0, "user.__v":0 ,"user.createdOn":0 ,"user._id":0 , "user.google":{token:0, id:0} ,  "company.productos":0, "company.certificados":0, "company.created":0, "company.description":0, "company.pais":0,"company.estado":0,"company.ciudad":0,"company.calle":0,"company.numero":0 , "company.telefono":0, "company.industria":0, "company.subindustria":0, "company.masinformacion":0, "company.__v":0,
                              "company.creador":0,  "org.created":0, "org.description":0, "org.pais":0, "org.estado":0, "org.ciudad":0, "org.calle":0, "org.latitud":0, "org.longitud":0, "org.__v":0

                               }}
                  
                       ]).sort({'creado': -1});

                      res.json(posts);           
  

               } catch(e){console.log(e)}              




 /****************************************************************************************************************************************+
  *              Posts  ordenados por   likes o
  * 
  * ***************************************************************************************************************************************/






           } else if( req.params.id !=="general"  &&  req.query.order ==='rank') { 

                   

                       try{          

           var posts  =  await Post.aggregate([{ $match: { 'categoria': req.params.id  } },



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
                   

                   {$project:{__v:0, "user.__v":0 ,"user.createdOn":0 ,"user._id":0 , "user.google":{token:0, id:0} ,  "company.productos":0, "company.certificados":0, "company.created":0, "company.description":0, "company.pais":0,"company.estado":0,"company.ciudad":0,"company.calle":0,"company.numero":0 , "company.telefono":0, "company.industria":0, "company.subindustria":0, "company.masinformacion":0, "company.__v":0,
                              "company.creador":0,  "org.created":0, "org.description":0, "org.pais":0, "org.estado":0, "org.ciudad":0, "org.calle":0, "org.latitud":0, "org.longitud":0, "org.__v":0

                               }}
                  
                       ]).sort({'raiting': -1});

                      res.json(posts);           
  

               } catch(e){console.log(e)}           

             /***************************************************************************************************************************************************
              *       Todos los posts sin filtrar por categoria ordenados por ranking
              * 
              ****************************************************************************************************************************************************/ 

        } else if ( req.params.id ==="general"  &&  req.query.order ==='rank' ){ console.log("x");}


  
 }

      /***********************************************************************************************************************************************************************************************************************************************************************************
       * 
       *              Todos los posts filtrados por categoria 
       * 
       * *********************************************************************************************************************************************************************************************************************************************************************************/

   

      exports.notAllposts = async(req,res,next)=>{


           
      try{          

           var posts  =  await Post.aggregate([{ $match: { $and:[{'categoria': req.params.id},{'tipo': 'principal' }] } },

                               


                              

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
                   

                   {$project:{__v:0, "user.__v":0 ,"user.createdOn":0 ,"user._id":0 , "user.google":{token:0, id:0} ,  "company.productos":0, "company.certificados":0, "company.created":0, "company.description":0, "company.pais":0,"company.estado":0,"company.ciudad":0,"company.calle":0,"company.numero":0 , "company.telefono":0, "company.industria":0, "company.subindustria":0, "company.masinformacion":0, "company.__v":0,
                              "company.creador":0,  "org.created":0, "org.description":0, "org.pais":0, "org.estado":0, "org.ciudad":0, "org.calle":0, "org.latitud":0, "org.longitud":0, "org.__v":0

                               }}
                  
        ]).sort({'creado': -1});

       res.json(posts);           
  
        } catch(e){console.log(e)}         
 
      }


        /**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************

                                                                                                       Todos los posts ordenados con el mejor Raiting ó rankinng

      ***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/


    
     exports.filterByraiting  = async(req,res,next)=>{

                  console.log(req.body + "");

                 try{


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
                  
        ]).sort({'raiting': 1});

       res.json(posts);
                

                    } catch(e){console.log(e)};


     } 









      /**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************

                                                                                                       Página de un solo Post

      ***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/










         exports.OnepostPage = async (req,res )=>{
         
         var image   = req.session.loggedIn?  req.session.user.image :"/images/avataaars4.svg" 
        //////////// Poner el nombre  usuario, si el usuario esta loggeado  
      

          var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : ""
      
         var logged = req.session.loggedIn
     
         try{  

         const post = await Post.findOne({'_id':req.params.id}).populate({path:'comentarios', populate:{path:'autorcomentario'}});
          
           console.log(post);

        

          res.render('single_post',{name:name,image:image,logged:logged, post:post});
  
  

               } catch(e){   console.log(e)   };
           



         }   




    /*************************************************************************************************************************************************************************************************************************************************************************************************************************************
     * 
     *                                       ------   ------  CARGAR UN SOLO POST CON TODOS SUS COMENTARIOS EN JSON----- 
     * 
     *  
      ***********************************************************************************************************************************************************************************************************************************************************************************************************************************/ 

          exports.OnePostData = async (req,res,next)=>{

             try{
                   
                 const post = await Post.findOne({'_id':req.params.id}).populate({path:'comentarios', populate:{path:'autorcomentario'}}); 

                 res.json(post);
                 
             }catch(e){}
          }


         /********************************************************************************************************************************************************************************************************************************************************************************************************************************+
      *                    
      *                                                                                         RUTA PARA VOTAR  POR UN POST
      * 
      * 
      * **********************************************************************************************************************************************************************************************************************************************************************************************************************************/


        exports.votePost = async(req , res)=>{

          
      if(!req.session.user){ console.log('usuario no encontrado') } 


         else{   
                      
      
                 
      

        try {
                  const post  = await  Post.findOne({'_id': req.body.id}) 

                if ( ! post.fans.includes(req.session.user.email) ){
                  
              

                //// AGREGAR UN VOTO


          post.fans.push(req.session.user.email);

          console.log(post.fans);

          post.raiting = post.raiting + 1
               
          console.log(post);

                  } else {  
         
          ////////////QUITAR UN VOTO////////////////////////////////////////////////////////////////////////////7

                post.raiting  = post.raiting -1 
                 
                 let index = post.fans.indexOf(req.session.user.email)
         
                    console.log(index);

                 post.fans.splice(index,1);   
                 console.log(post);


                 }


               post.save(()=>{ console.log(post.raiting)}); 

               


                      
               } catch(e){ console.log(e)}

             }

          }




      /*************************************************************************************************************************************************+
       *                                              INSERTAR COMENTARIO EN EL POST
       * 
       * ***************************************************************************************************************************************************/

            
            exports.addCommentPost = async (req,res, next)=>{

             console.log(req.body.comment);
             console.log(req.params.id);

                try{
 
                  let post = await Post.findOne({'_id': req.params.id});

                  console.log(post);

                  if(req.body.comment && req.session.user){

                  var  comment   = new Post();

                  comment.creado = new Date();

                  comment.creador = req.session.user.email;

                  comment.contenido = req.body.comment;

                  comment.raiting =  0;
                  
                  comment.type = "comment";
                 
                  comment.postorigen = post._id;

                  
                  var autorcomment = req.session.user._id.toString();


                  comment.autorcomentario = autorcomment;

                  
  

                  comment.save();

          

              


        



                  var commentid = comment._id.toString();

                  console.log(commentid);

                  
        

                    

         

                  post.comentarios.push(  comment.id ); 
                  
                  post.save();

                  console.log(post);


                      } 
               
              } catch(e){console.log(e)}


            }

       /**************************************************************************************************************************************************************************************************************************************************************************
        * 
        *                                                                Borrar  Posts
        * 
        *************************************************************************************************************************************************************************************************************************************************************************/  




         exports.deletePost = async (req,res)=>{

                  try {

                  
                 const one = await Post.findOne({"_id":req.params.id});




                  //const post =  await Post.deleteOne({"_id":req.params.id});


                  
                  console.log("Documento borrado exitosamente"); 

                   res.sendStatus(200);
                  
                   } 

                   catch(e){

        
                  if (!e){  console.log("Doumento borrado con éxito")    } };


              }