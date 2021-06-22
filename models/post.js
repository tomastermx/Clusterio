var mongoose = require('mongoose');


/********************************************************************
*                       POST  SCHEMA                                  *
*                                                                    *
*********************************************************************/



const postSchema  = new  mongoose.Schema({

creado: { type: Date, default: Date.now },
creador: String,
titulo: String,
contenido:String,
categoria: String,
comentarios:[{}],
raiting_status: Boolean, 
raiting: Number 

})


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
