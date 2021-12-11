

User = require('../models/users');
const passport = require('passport');
const session = require('express-session');

const Opportunity = require('../models/opportunity');


/****************************************************************************************************************

    Show Page of opportunities

*****************************************************************************************************************/





exports.allOportunities = (req,res)=>{



       var image   = req.session.loggedIn?  req.session.user.image :"/images/avataaars4.svg" 
      //////////// Poner el nombre  usuario, si el usuario esta loggeado  
      

     var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : ""
  
     var logged = req.session.loggedIn




      res.render('opportunity_forum',{name:name,image:image,logged:logged});
   

}



/**********************************************************************************************************************************************+
 * 
 *   Crear un  nuevo Aviso
 * 
 * ****************************************************************************************************************************/


exports.createOportunity = async (req,res)=>{
  
  console.log(req.body.titulo);
   

  var newOpportunity = new Opportunity();
  
     newOpportunity.titulo =  req.body.titulo;
     
     newOpportunity.descripcion = req.body.contenido;

     newOpportunity.modalidad = req.body.modalidad;

     newOpportunity.categoria = req.body.categoria;

     newOpportunity.creador = req.session.user.email;

 
   newOpportunity.save((err, opp)=>{console.log(opp)});

   res.json(newOpportunity);

}




/*********************************************************************************************************************************************

                                 Borrar  Oportunidad

************************************************************************************************************************************************/




 exports.deleteOpportunity = async (req,res)=>{


       try {
            
                   
           const opp = await Opportunity.deleteOne({"_id" : req.params.id});


           
        
            console.log(req.params.id );

            res.sendStatus(200);

           console.log("documento borrado")



        } catch(e){   }



 }




/************************************************************************************************************************************************************
 * 
 *          Las oportunidades de un solo usuario para su pagina de perfil 
 * 
 * **********************************************************************************************************************************************************/



  exports.userOpportunities =  async  (req,res)=>{

        var  creator = req.params.id;



      try {

           const opp = await Opportunity.find({'creador': creator}).sort({'creado': -1});
        
           res.json(opp);


      } catch(e){console.log(e)};



  }



/**********************************************************************************************************************************************
                     Todos los avisos  entrando a la página

***********************************************************************************************************************************************/



  exports.allOpportunities = async (req,res)=>{

           
              try{


            var opportunities  =  await Opportunity.aggregate([{ $match: {    } },

           

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

       
       console.log(opportunities);
       res.json(opportunities);  

         
        } catch(e){console.log(e)}


  }




 /*****************************************************************************************************************************************************
                             Filtrado de Avisos
 
 *****************************************************************************************************************************************************/


  exports.filterOpportunities = async (req,res)=>{

    
        console.log(req.body.categoria);
        console.log(req.body.modalidad)
    

              try{


            var opportunities  =  await Opportunity.aggregate([{ $match: {  $or:[ {"categoria" : req.body.categoria},{"modalidad":req.body.modalidad}]  } },

           

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

       
       console.log(opportunities);
       res.json(opportunities);  

         
        } catch(e){console.log(e)}










  }