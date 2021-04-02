

const passport = require('passport');
const session = require('express-session');
 
 Company = require('../models/company');

 

/////////////////////////////////////////////////////////////////////
 exports.search = (req,res)=>{

     var query = req.query.searchunit
     var place = req.query.place
    
 
 /////////////// Poner la imagen  de perfil de redes sociales  
    var image   = req.session.loggedIn?  req.session.user.image : "/images/avataaars4.svg"  


  //////////// Poner el nombre  usuario, si el usuario esta loggeado  
    
    
    var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : "Profile"
  

    res.render('search_results',{query:query,place:place,name:name,image:image});


 }


///////////////////////////////////////////////////////////////////

 exports.doSearch = async (req,res)=>{

    console.log(req.body.place);
    console.log(req.body.query);

   // Variable de producto,nombre ó industria 

    var str = req.body.query; 

    

    var query = str.substring(0, 3);
 

    var pattern = query + "."
 
     console.log(pattern);
        

   //Variable de  lugar ///////////////////7

    var lugar = req.body.place;

    rgxplace= str.substring(0,3)

    var placepattern = rgxplace + "." 
    try {

    company = await  Company.find({  $and:[
        {$or:[{ 'productos.producto':new RegExp( pattern, 'i' )}, { 'nombre':new RegExp( pattern, 'i' )}, { 'industria':new RegExp( pattern, 'i' )} ]},
        {$or:[{'ciudad': new RegExp (lugar , 'i')  },{'estado': new RegExp (lugar , 'i') },{'pais': new RegExp(lugar, 'i')}] } 


          ]},{'calle':0,'numero':0,'productos':0, 'creador':0 , 'created':0, 'certificados':0, '__v':0 })

    console.log(company);
    res.json(company);
 
    }

    catch(e){console.log(e)}



 	
 }