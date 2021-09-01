


module.exports = (app,Opportunity, OpportunityController)=>{

  app.get('/avisos',OpportunityController.allOportunities);

 
  

   app.post('/user/ad/new', OpportunityController.createOportunity);

  
//////////////////// Borrar una oportunidad por el autor /////////////////////////////////////////////////////////7


   app.delete('/avisos/delete/:id', OpportunityController.deleteOpportunity);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



   app.get('/avisos/user/profile/:id', OpportunityController.userOpportunities);

   


   app.get('/avisos/all/json' , OpportunityController.allOpportunities);




   app.post('/avisos/all/json' , OpportunityController.filterOpportunities);


 }