

 const session = require('express-session');
 
 Company = require('../models/company');



 exports.search = (req,res)=>{

    var query = req.query.searchunit
    console.log(query);


    res.render('search_results',{query:query});


 }




 exports.doSearch = async (req,res)=>{


 console.log(req.body.query);

   var str = req.body.query;

    var query = str.substring(0, 3);
   console.log(query);

    var pattern = query + "."
 
     console.log(pattern);


    try {

    company = await  Company.find({'productos.producto':new RegExp( pattern, 'i' )})

    res.json(company);
 
    }

    catch(e){console.log(e)}



 	
 }