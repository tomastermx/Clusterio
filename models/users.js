 const mongoose = require('mongoose');
 const bcrypt  = require('bcryptjs');


/********************************************************************
*                       USER SCHEMA                                  *
*                                                                    *
*********************************************************************/



var userSchema = new mongoose.Schema({

 createdOn: { type: Date, default: Date.now },
 modifiedOn: Date,
 lastLogin: Date, 
 username:String,
 rol: String,

/**********************************
	local:{
		name: String,
		email: String,
		username:String,
    rol:String,
		password: String,
	     }

***********************************/
     google:{

              id: String,
              token: String,
              email: String,
              name: String,
              picture: String

              },

    facebook:{

              id: String,
              token : String,
              displayName:String,
              email: String,
              picture:String

                }




})


/******************************************************                                                      *
*   Methods                                            *
*                                                      *
*******************************************************/

/*******************************************************************************
*                                                                               * 
*  userSchema.methods.generateHash = (password)=>{                              *
*    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null)               *
*                                                                               *
*     }                                                                         *  
*                                                                               * 
*                                                                               *
*      // checking if password is valid
*     
*  userSchema.methods.validPassword = function(password) {
*          return bcrypt.compareSync(password, this.local.password);
*    };
*
*                                                                                *
*********************************************************************************/

const User = mongoose.model('User', userSchema);

module.exports = User;
