require('mongoose');
const Usr = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { secretKey } = require('../.env');



const login = async(email,password) => {
   


    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');

    const  result = await Usr.findOne({email:email});
    
    if (result){
            // retorno token
            const token = jwt.sign( {email} ,secretKey,{ expiresIn: '1h' });
            console.log('Autenticación exitosa. secret key:', secretKey);
            return token;
    }
    return null; // retorno 
}



module.exports = {login}


