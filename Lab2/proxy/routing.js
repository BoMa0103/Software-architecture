const request = require('request');

var config = require('./config.js');

const API_URL = config.get('url');

function routingApi(req, res) {
    request(
        API_URL,
        (err, response, body) => {
            if (err) return res.status(500).send({ message: err })

            return res.send(body);
        }
    )
}

module.exports = { routingApi };