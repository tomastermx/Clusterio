
 Post = require('../models/post');


exports.Postspage = (req,res)=>{

 res.render('forum_posts');

} 


exports.postingNew  = (req,res)=>{



 console.log(req.body.post);
 console.log(req.session.user.email);
 
  var newPost = new Post();

  newPost.creado = new Date();
  newPost.creador = req.session.user.email;
  newPost.texto = req.body.post;
  newPost.categoria = req.body.postcategory;
  newPost.ranking = 0;

    newPost.save(err=>{
        if(err){console.log(err)}

        	else{ console.log(newPost)} 

    })




}






