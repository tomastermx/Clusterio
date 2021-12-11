




module.exports = (app,session,Company,Org,searchController)=>{


app.get('/search/:company',searchController.search);




app.post('/search',searchController.doSearch);


app.get('/search/test',searchController.SearchTest);




}
  