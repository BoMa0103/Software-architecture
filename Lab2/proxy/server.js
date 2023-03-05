//server.js
const express = require('express');
const app = express();

var routing = require('./routing.js')

app.get('/', (req, res) => {
  routing.routingApi(req, res);
})

module.exports = app;
