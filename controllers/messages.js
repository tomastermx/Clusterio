


exports.newMessage = (req,res)=>{

  console.log(req.params.to);
  console.log(req.session.user);
  res.render('message');



  
}