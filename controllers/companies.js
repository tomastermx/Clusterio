

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

 var image   = req.session.loggedIn?  req.session.user.image : "/images/avataaars4.svg" 


//////////// Poner el nombre  usuario, si el usuario esta loggeado 
var str = req.session.user.username;

var name = str.split(" ")[0];


res.render('company_register',{image:image,name:name});
console.log("a" + req.session.user);
} 




/***************************************************************************************************************************

                                    Create new Company ---Post

*****************************************************************************************************************************/




exports.donewCompany = function(req , res){
 
       console.log(req.body.moreinfo);
  

    var newCompany = new Company();
     newCompany.created = new Date(), 
     newCompany.nombre = req.body.companyname;
     newCompany.description = req.body.description;
     newCompany.pais = req.body.country;
     newCompany.estado = req.body.state;
     newCompany.ciudad = req.body.city;
     newCompany.calle = req.body.street;
     newCompany.numero = req.body.streetnumber;
     newCompany.telefono =req.body.phone;
     newCompany.web = req.body.website;
     newCompany.industria = req.body.industry;
     newCompany.subindustria = req.body.subindustry;
     newCompany.certificados = req.body.badges;
     newCompany.creador = req.session.user.email;
     newCompany.productos = req.body.products;
     newCompany.masinformacion = req.body.moreinfo;

       newCompany.save((err,company)=>{
        console.log(company)
       }); 

    

}



/*********************************************************************************************************************************

                 Company Profile -- Get

**********************************************************************************************************************************/

exports.ProfileCompany = async (req,res)=>{

var  owner
 
  
   /////////////// Poner la imagen  de perfil de redes sociale
   var image   = req.session.loggedIn?  req.session.user.image : "/images/avataaars4.svg" 


   //////////// Poner el nombre  usuario, si el usuario esta loggeado  
      
    var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : "Profile"


    try {
    const company = await Company.findOne({'_id':req.params.id}) 
       
       if(req.session.user){

        var owner = req.session.user.email === company.creador ? true : false

        res.render('company_profile',{company:company,image:image,name:name,owner:owner}); 

       } else

        {res.render('company_profile',{company:company,image:image,name:name}); }     

 
     } catch(e) {console.log(e)} 
 

}



/********************************************************************************************************************************

        Company profile --settings --GET

**********************************************************************************************************************************/


exports.CompanySettings = async (req,res)=>{

      try {
  const company = await Company.findOne({'_id':req.params.id})

  var companyid = company._id;

  res.render('company_profile_settings',{company:companyid,image:req.session.user.image});

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