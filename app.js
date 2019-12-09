const express = require('express');

const swagger = require('./src/utils/swagger');
const routes = require('./src/routes');

const app = express();

swagger(app);
routes(app);

module.exports = app;
