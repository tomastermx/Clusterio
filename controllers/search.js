

const passport = require('passport');
const session = require('express-session');
 
 Company = require('../models/company');

 

/////////////////////////////////////////////////////////////////////
 exports.search = (req,res)=>{

       
  
     var query = req.query.searchunit
     var place = req.query.place
    
     var image   = req.session.loggedIn?  req.session.user.image :"/images/avataaars4.svg" 
      //////////// Poner el nombre  usuario, si el usuario esta loggeado  
      

     var name =  req.session.loggedIn ?  req.session.user.username.split(" ")[0] : ""
  
     var logged = req.session.loggedIn
     
     var industry = req.params.industry

     console.log(industry);


    res.render('search_results',{query:query,place:place,name:name,image:image,logged:logged});


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
        


   //Variable de  lugar /////////////////
    
    var queryplace =  req.body.place; 

    var  place =  queryplace.substring(0,3);

    var lugar =  place + ".";
  
    



    try {
  
     var results = await Company.aggregate([
         {$match:{   $and:[
        {$or:[{ 'productos.producto':new RegExp( pattern, 'i' )}, { 'nombre':new RegExp( pattern, 'i' )}, { 'industria':new RegExp( pattern, 'i' )} ]},
        {$or:[{'ciudad': new RegExp (lugar , 'i')  },{'estado': new RegExp (lugar , 'i') },{'pais': new RegExp(lugar, 'i')},{'codigopostal':queryplace}] } 


          ]}},
          { $unionWith: { coll: "orgs",pipeline:[{$match:{ $and:[
        {$or:[{ 'productos.producto':new RegExp( pattern, 'i' )}, { 'nombre':new RegExp( pattern, 'i' )}, { 'tipo':new RegExp( pattern, 'i' )} ]},
        {$or:[{'ciudad': new RegExp (lugar , 'i')  },{'estado': new RegExp (lugar , 'i') },{'pais': new RegExp(lugar, 'i')}] } 


          ]} }] } }

           ]);
         
          res.json(results);       
           console.log(results);

 


    }

    catch(e){console.log(e)}




 	
 }


/************************************************************************************************************************************


********************************************************************************************************************************/



 exports.SearchTest= async (req,res)=>{

     try{
   
      company = await  Company.find({});

       res.json(company);

     } catch(e){};

}

/*
  company = await  Company.find({  $and:[
        {$or:[{ 'productos.producto':new RegExp( pattern, 'i' )}, { 'nombre':new RegExp( pattern, 'i' )}, { 'industria':new RegExp( pattern, 'i' )} ]},
        {$or:[{'ciudad': new RegExp (lugar , 'i')  },{'estado': new RegExp (lugar , 'i') },{'pais': new RegExp(lugar, 'i')}] } 


          ]},{'calle':0,'numero':0,'productos':0, 'creador':0 , 'created':0, 'certificados':0, '__v':0 })


     org  = await Org.find({}); 

    console.log(company);
    res.json(company);
*/





/*


 try{
   
     var results = await Company.aggregate([
        {$match:{'nombre':'Farmacias Don Abundio '}},
         { $unionWith: { coll: "orgs",pipeline:[{$match:{'nombre':'CDurango'}}] } }

           ]);
         
          res.json(results);
        
   
       }  catch(e){console.log(e);}

 }







     var results = await Company.aggregate([
        {$match:{'nombre':'Farmacias Don Abundio '}},
         { $unionWith: { coll: "orgs",pipeline:[{$match:{'nombre':'CDurango'}}] } }

           ]);
         
          res.json(results);
        
   
       }  catch(e){console.log(e)  }   


*/