const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

//register

router.post("/register", validInfo, async(req, res) => {
    try {
        //destructure
        const { name, email, password } = req.body;
        //check if user exists (if user exists, throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length > 0) {
            return res.status(401).json("User already exists");
        }
        //bcrypt pw
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        //enter new user inside database

        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);

        //generate jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);
        return res.json( { token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

//login route

router.post("/login", validInfo, async (req, res) => {
    try {
        //destructure
        const { email, password } = req.body;
        //check if user doesn't exist (if not we throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect");
        }
        //check if incoming pw is same as db pw
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        //give them a jwt token
        if (!validPassword) {
            return res.status(401).json("Invalid Credential");
        }
        const token = jwtGenerator(user.rows[0].user_id);
        return res.json( { token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;