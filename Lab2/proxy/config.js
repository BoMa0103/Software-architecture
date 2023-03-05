require('dotenv').config();
var convict = require('convict');

convict.addFormat(require('convict-format-with-validator').url);

var config = convict({
  url: {
    format: 'url',
    default: process.env.URL
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: process.env.PORT,
    env: 'PORT',
    arg: 'port'
  }
});

config.validate({allowed: 'strict'});

module.exports = config;