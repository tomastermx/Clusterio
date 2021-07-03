


module.exports = (app,Opportunity, OpportunityController)=>{

    app.get('/avisos',OpportunityController.allOportunities);

 
  

   app.post('/user/ad/new', OpportunityController.createOportunity);

  




 }