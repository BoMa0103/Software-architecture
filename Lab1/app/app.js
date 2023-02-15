require('dotenv').config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send(process.env.HELLO);
});

app.get("/userr", (req, res) => {
    res.send({name: process.env.NAME, age: process.env.AGE});
});

app.listen(3000);
