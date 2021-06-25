

require('dotenv').config();
const session = require('express-session');


 Org = require('../models/organization');
 
/////////////////////////////////////////////////////////////
exports.organizationRegister =(req,res)=>{



     var  keyapi = process.env.maps	
 



     var image   = req.session.loggedIn?  req.session.user.image : "/images/avataaars4.svg" 

     var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : ""

     var logged = req.session.loggedIn


 
    console.log(keyapi); 

  res.render('organization_register',{image:image,name:name, logged:logged ,keyapi:keyapi });

}



/***********************************************************************************************************************************************************

                                                      CREAR NUEVA ORGANIZACIÓN

************************************************************************************************************************************************************/


exports.DoorganizationRegister =(req,res)=>{

console.log(req.body);


  var newOrganization = new Org();

    newOrganization.created = new Date(); 
    newOrganization.nombre = req.body.nombre;
    newOrganization.tipo = req.body.tipo;
    newOrganization.description = req.body.descripcion;
    newOrganization.pais= req.body.pais;
    newOrganization.ciudad = req.body.ciudad;
    newOrganization.calle = req.body.street;
    newOrganization.numero = req.body.streetnum;
    newOrganization.estado = req.body.estado;
    newOrganization.latitud = req.body.latitud;
    newOrganization.longitud = req.body.longitud;
    newOrganization.creador = req.session.user.email;
    newOrganization.save((err,org)=>{

    if(!err){console.log(org)}
     else {console.log(err)}


         })


	
  }




/*************************************************************************************************************************************

            PERFIL  DE LA ORGANIZACIÓN HTTP ---GET

***************************************************************************************************************************************/


exports.OrganizationProfile = async (req,res)=>{






       var  keyapi = process.env.maps 

      
      var image   = req.session.loggedIn?  req.session.user.image : "/images/avataaars4.svg" 

      var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : ""
 
      var logged = req.session.loggedIn

       



     try {
          const org = await Org.findOne({'_id':req.params.id}) 

          console.log(org);
       
        
       res.render('organization_profile',{image:image,name:name, name:name ,logged:logged ,keyapi:keyapi,org:org });

       } 
       catch(e){console.log(e)}    




 

     console.log(req.params.id);

  
         } 






    exports.OrganizationSettings = async (req,res)=>{
            
      var image   = req.session.loggedIn?  req.session.user.image : "/images/avataaars4.svg" 

      var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : ""
 
      var logged = req.session.loggedIn
       
             try{

               const org = await Org.findOne({'_id':req.params.id}) 
           
      
               res.render('organization_settings',{org:org, image:image,name:name, name:name ,logged:logged});
       

              } catch(e){console.log(e)};

    }

