const jwt = require("jsonwebtoken");
require("dotenv").config();

//This middleware verifies whether a token is valid
module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.header("token");
        if (!jwtToken) {
            return res.status(403).json("Not authorized");
        }
        console.log(jwtToken);
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        req.user = payload.user;
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(403).json("Not authorized");
    }
};