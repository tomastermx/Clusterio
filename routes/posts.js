
module.exports = (app,session,Post,postsController)=>{

 app.get('/posts', postsController.Postspage);



 app.post('/posts/new', postsController.postingNew);

}


