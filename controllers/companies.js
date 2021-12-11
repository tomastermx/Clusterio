
require('dotenv').config();
 

User = require('../models/users');
const passport = require('passport');
const session = require('express-session');


 Company = require('../models/company');
 



/**************************************************************************************************************************************

                           Busqueda de toddas las empresas 

***************************************************************************************************************************************/

exports.searchCompanies =  async (req,res)=>{


    try {
    company = await  Company.find()

    res.json(company);
 
    }

    catch(e){console.log(e)}

}



/*************************************************************************************************************************************
                              Page of Company query ---Get

*****************************************************************************************************************************************/

exports.companyQueryResults =(req,res)=>{
    
    var query = req.query.searchunit
    console.log(query);


    res.render('company_results',{query:query});


 
}



/*********************************************************************************************************
                        Company Query --- Post

**********************************************************************************************************/


exports.docompanyQueryResults = async (req,res)=>{
    
    console.log(req.body.query);

    try {

        company = await  Company.find()
  //  company = await  Company.find({'productos.producto':new RegExp(req.body.query, 'i' )})

    res.json(company);
 
    }

    catch(e){console.log(e)}






}



/***************************************************************************************************************************

                                    Create new Company ---Get

*****************************************************************************************************************************/







exports.newCompany = (req,res)=>{

 /// Variable de entorno donde esta  la API de Google
var  keyapi = process.env.maps  

 var image   = req.session.loggedIn?  req.session.user.image : "/images/avataaars4.svg" 


//////////// Poner el nombre  usuario, si el usuario esta loggeado 
var str = req.session.user.username;

var name = str.split(" ")[0];

var logged = req.session.loggedIn;

res.render('company_register',{image:image,name:name,logged:logged,keyapi:keyapi});
console.log("a" + req.session.user);
} 




/***************************************************************************************************************************

                                    Create new Company ---Post

*****************************************************************************************************************************/




exports.donewCompany = function(req , res){
 
       
  
     console.log(req.body.latitud);

     console.log(req.body.longitud);




    var newCompany = new Company();
     newCompany.created = new Date(), 
     newCompany.nombre = req.body.companyname;
     newCompany.description = req.body.description;
     newCompany.pais = req.body.country;
     newCompany.estado = req.body.state;
     newCompany.ciudad = req.body.city;
     newCompany.calle = req.body.street;
     newCompany.codigopostal = req.body.zipcode;  ///nuevo
     newCompany.numero = req.body.streetnumber;
     newCompany.telefono =req.body.phone;
     newCompany.web = req.body.website;
     newCompany.industria = req.body.industry;
     newCompany.subindustria = req.body.subindustry;
     newCompany.certificados = req.body.badges;
     newCompany.creador = req.session.user.email;
     newCompany.productos = req.body.products;
     newCompany.masinformacion = req.body.moreinfo;
     newCompany.latitud = req.body.latitud;
     newCompany.longitud =  req.body.longitud;

       newCompany.save((err,company)=>{
        console.log(company)
       }); 

    

}



/*********************************************************************************************************************************

                 Company Profile -- Get

**********************************************************************************************************************************/

exports.ProfileCompany = async (req,res)=>{

      var  keyapi = process.env.maps  


      /////////////// Poner la imagen  de perfil de redes sociale
       var image   = req.session.loggedIn?  req.session.user.image : "/images/avataaars4.svg" 


       //////////// Poner el nombre  usuario, si el usuario esta loggeado  
      
      var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : "";

      var logged = req.session.loggedIn

    try {
    const company = await Company.findOne({'_id':req.params.id}) 
       
        if(req.session.user){

         var owner = req.session.user.email === company.creador ? true : false

         res.render('company_profile',{company:company,image:image,name:name,owner:owner,logged:logged,keyapi:keyapi}); 

       } else{res.render('company_profile',{company:company,image:image,name:name,keyapi:keyapi}); }     

 
     } catch(e) {console.log(e)} 
 

}



/********************************************************************************************************************************

        Company profile --settings --GET

**********************************************************************************************************************************/


exports.CompanySettings = async (req,res)=>{
    
      var  keyapi = process.env.maps  


      /////////////// Poner la imagen  de perfil de redes sociale
       var image   = req.session.loggedIn?  req.session.user.image : "/images/avataaars4.svg" 


       //////////// Poner el nombre  usuario, si el usuario esta loggeado  
      
      var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : ""

      var logged = req.session.loggedIn




      try {
    const company = await Company.findOne({'_id':req.params.id})

     var companyid = company._id;

      res.render('company_profile_settings',{company:companyid,image:image,name:name, logged:logged,keyapi:keyapi});

      }   catch(e){console.log(e)}



  

}



/***************************************************************************************************************************************

             Get array data of products
          

*****************************************************************************************************************************************/

exports.ShowArrayproducts = async (req,res)=>{


const unit = await Company.findOne({'_id':req.params.id})



res.json(unit);




}


/********************************************************************************************************************************

        Company profile --settings -POST

**********************************************************************************************************************************/


  exports.doCompanySettings = async (req,res)=>{

   console.log(req.body);

  try {
  const company = await Company.findOne({'_id':req.params.id})

  
   if(req.body.products) {
   company.productos = req.body.products;
   }
 
   if(req.body.description){
    console.log(req.body.description)
    company.description = req.body.description;
   }

   if(req.body.moreinfo){
     console.log(req.body.moreinfo)
     company.masinformacion = req.body.moreinfo;
   }

    if(req.body.calle){
     console.log(req.body.calle)
     company.calle= req.body.calle;

   }


    if(req.body.num){
      
    console.log(req.body.num)
    company.numero=req.body.num;

     }


    if(req.body.ciudad){
      console.log(req.body.ciudad)

       company.ciudad = req.body.ciudad; 
     
     } 


     if(req.body.zipcode){
       console.log(req.body.zipcode)
       company.codigopostal= req.body.zipcode;  
        
     }

     
     if(req.body.longitud){
        console.log(req.body.longitud)
        company.longitud = req.body.longiud;

     }


     if(req.body.latitud){

        console.log(req.body.latitud)

        company.latitud = req.body.latitud;

     }



    if(req.body.tel) {

     console.log(req.body.tel);
     company.telefono = req.body.tel; 

      }

  



   const unit = await company.save();

   }

   catch(e){console.log(e)}


 


  }


/********************************************************************************************************************************

        Company  Posting  Update

**********************************************************************************************************************************/

 
 exports.CompanyPost = (req,res)=>{}





/*******************************************************************************************************

                    DELETE --COMPANY---  GET

*********************************************************************************************************/


exports.DeleteCompany =(req,res)=>{



res.render('company_profile_delete');

}



/*******************************************************************************************************

               DELETE--COMPANY--- POST

*********************************************************************************************************/


 exports.doDeleteCompany =(req,res)=>{

 }