const express = require('express');
const app = express();
const cors = require('cors');

//middleware
app.use(express.json()); //reqbody
app.use(cors());

//ROUTES

//register and login
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
    console.log("server is running on port 5000")
});