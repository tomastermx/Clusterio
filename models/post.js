var mongoose = require('mongoose');


/********************************************************************
*                       POST  SCHEMA                                  *
*                                                                    *
*********************************************************************/



const postSchema  = new  mongoose.Schema({

creado: Date,
creador: String,
texto : String,
ranking : Number,
categoria: String 

})


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
