const jwt = require('jsonwebtoken');
const { secretKey } = require('../.env');

const verify = (req,res,next) => {
    const bearerHeader = req.headers['authorization']
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];


    try {
        const decode = jwt.verify(bearerToken, secretKey);
        next();
    }catch(error){
        res.status(401).send("No autorizado")
        console.log(error);
    }
}
module.exports = {verify}