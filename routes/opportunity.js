


module.exports = (app,Opportunity, OpportunityController)=>{

  app.get('/avisos',OpportunityController.allOportunities);

 
  

   app.post('/user/ad/new', OpportunityController.createOportunity);

  

   app.get('/avisos/delete/:id', OpportunityController.deleteOpportunity);



   app.get('/avisos/user/profile/:id', OpportunityController.userOpportunities);

 }