const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usrSchema = new Schema({

	email:{
		type: String,
		required:true,
		index: {unique: true, dropDups: true}
	},
	name:{
		type: String,
		required:true
    },
    lastname:{
		type: String,
		required:true
	},
	isActive:{
		type: Boolean,
		required:true
	},
	password:{
		type: String,
		required:true
	},
	
	
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
        delete object.password;
    }
});


const Usr = mongoose.model('user',usrSchema);
module.exports = Usr;

