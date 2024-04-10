const jwt = require('jsonwebtoken');

const verify = (req,res,next) => {
    try {
        const decode = jwt.verify(req.headers.Authorization, 'secret key');
        next();
    }catch(error){
        res.status(401).send("No autorizado")
    }
}
module.exports = {verify}