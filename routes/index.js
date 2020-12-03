

var Company = require('../models/company');


module.exports = (app)=>{

	app.get('/', async(req,res)=>{

      res.render('index');
   

})




	app.post('/', async(req,res)=>{
       
      company = await  Company.find()
      res.json(company);


	    })

}