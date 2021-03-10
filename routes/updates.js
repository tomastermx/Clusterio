

 module.exports = (app,Company,Post,updatesController)=>{



 app.post('/update/company/new', updatesController.doUpdate );


 }