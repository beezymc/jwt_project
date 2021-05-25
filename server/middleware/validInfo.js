//This module checks whether the email and password (and name for the register route) are valid. 
//Name and password just need to be non-empty (the password field would need to be made more robust in a real site).
//The email needs to match the given regex schema.
module.exports = (req, res, next) => {
    const { email, name, password } = req.body;
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
    if(req.path === "/register") {
        if (![email, name, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    }
    next();
};