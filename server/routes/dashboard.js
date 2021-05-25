const router = require('express').Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

//This route returns the user's name from the database should we be given a matching user id
router.get("/", authorization, async (req, res) => {
    try {
        //req.user has the payload
        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user.id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;