const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pelSchema = new Schema({
    nombre:{
		type: String,
		required:true,
		index: {unique: true, dropDups: true}
	},
	animal:{
		type: String,
		required:true
    },
    color:{
		type: String,
		required:true
	},
	accesorio:{
		type: String,
		required:true
	}
	
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
        
    }
});


const Pel = mongoose.model('peluche',pelSchema);
module.exports = Pel;