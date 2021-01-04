




module.exports = (app,session,Company,searchController)=>{


app.get('/search',searchController.search);




app.post('/search',searchController.doSearch);




}
  