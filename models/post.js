var mongoose = require('mongoose');


/********************************************************************
*                       POST  SCHEMA                                  *
*                                                                    *
*********************************************************************/



const postSchema  = new  mongoose.Schema({

created: Date,
creator: String,
text : String,
ranking : Number 

})


const Post = mongoose.model('postSchema', postSchema);

module.exports = Post;
