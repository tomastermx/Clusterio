

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

res.render('company_register',{image:req.session.user.image });
console.log("a" + req.session.user);
} 




/***************************************************************************************************************************

                                    Create new Company ---Post

*****************************************************************************************************************************/




exports.donewCompany = function(req , res){
 
       console.log(req.body);
  

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
     newCompany.productos = req.body.products

       newCompany.save((err,company)=>{
        console.log(company)
       }); 

    

}



/*********************************************************************************************************************************

                 Company Profile -- Get

**********************************************************************************************************************************/

exports.ProfileCompany = async (req,res)=>{

var  owner;

    try {
    const company = await Company.findOne({'_id':req.params.id}) 
     
           if(!req.session.user){
           owner =false;
           console.log("usuario no encontrado");
        
           res.render('company_profile',{company:company,owner:owner}); 


       }  else if (company.creador === req.session.user.email) {
        
            owner = true
            console.log("el usuario es el dueño del sitio");
            res.render('company_profile',{company:company,owner:owner});
      }
 
 
     } catch(e) {console.log(e)} 
 

}



/********************************************************************************************************************************

        Company profile --settings --GET

**********************************************************************************************************************************/


exports.CompanySettings = async (req,res)=>{

     
  const company = await Company.findOne({'_id':req.params.id})

  var companyid = company._id;

  res.render('company_profile_settings',{company:companyid});



  

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

  const company = await Company.findOne({'_id':req.params.id})

  company.productos = req.body.products;
  
   const unit = await company.save();

   

 


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