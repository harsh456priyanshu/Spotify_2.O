const jwt = require('jsonwebtoken');

const verifyToken = (req, res , next) => {
    const token = req.header('Authorization');

    if(!token) return res.status(401).json({msg: 'No token. Access denied'});

    try{
        const verified = jwt.verify(token , process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({msg: 'Token is not valid'});
    }
}


module.exports = verifyToken;