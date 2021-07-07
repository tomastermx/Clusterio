

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
  
  console.log(req.body);
   

  var newOpportunity = new Opportunity();
  
     newOpportunity.descripcion = req.body.contenido;

     newOpportunity.modalidad = req.body.modalidad;

     newOpportunity.categoria = req.body.categoria;

     newOpportunity.creador = req.session.user.email;

 
   newOpportunity.save((err, opp)=>{console.log(opp)});

}




/*********************************************************************************************************************************************

                                 Borrar  Oportunidad

************************************************************************************************************************************************/




 exports.deleteOpportunity = async (req,res)=>{


       try {
            
                   

            const opp = await Opportunity.deleteOne({"_id":req.params.id});


        }  catch (e){console.log(e) }



 }




/************************************************************************************************************************************************************
 * 
 *          Los posts de un solo usuario para su pagina de perfil 
 * 
 * **********************************************************************************************************************************************************/



  exports.userOpportunities =  async  (req,res)=>{

        var  creator = req.params.id;



      try {

           const opp = await Opportunity.find({'creador': creator}).sort({'creado': -1});
        
           res.json(opp);


      } catch(e){console.log(e)};



  }



