

exports.organizationRegister =(req,res)=>{

 var image   = req.session.loggedIn?  req.session.user.image : "/images/avataaars4.svg" 


  res.render('organization_register',{image:image});


}


exports.doorganizationRegister =(req,res,next)=>{




	
}