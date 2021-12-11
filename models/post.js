var mongoose = require('mongoose');

const User = require('./users');


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
comentarios:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
autorcomentario:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
fans:[], 
raiting: Number ,
postorigen:{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
tipo :String 


})


const Post = mongoose.model('Post', postSchema);

module.exports = Post;

