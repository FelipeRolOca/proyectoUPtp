require('mongoose');
const Usr = require('../models/user');


const addUser = async (name,lastname,email,isActive,password) => {

    let existUser = await Usr.findOne({ email: email });
    console.log(existUser);
    if(!existUser) {

        const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');
        
        const usr = new Usr(
            {              
                name: name,
                lastname:lastname,
                email: email,
                isActive:isActive,
                password:cryptoPass,
                
            }
        );

        let user = await usr.save(); 
        console.log("usuario nuevo");
        console.log(user);
        return { user }; 

    }else{
        return false;
    }
}   

const getAllUsers = async (limit,offset) => {

    const users = await Usr.find({}).limit(limit).skip(offset);

    return users;
}

const getUser = async(id) => {

    const user = await Usr.findById(id);


    return user;
}
const getUserid = async(email,password) => {
    try {
    const user = await Usr.findOne({ email, password }).exec();
    return user;
    }
 catch (error) {
    console.error('Error al buscar el usuario:', error);
    throw error; // Propagar el error hacia arriba para que pueda ser manejado en otro lugar
}
}


const editUser = async(user) => {

    const result = await Usr.findByIdAndUpdate(user._id,user,{new:true});

    return result;
}

const deleteUser = async(id) => {

    const result = await Usr.findByIdAndDelete(id);

    return result;
}


module.exports = { addUser, getAllUsers, getUser, editUser, deleteUser,getUserid }