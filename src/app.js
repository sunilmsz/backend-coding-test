'use strict';

const express = require('express');
const app = express();

const overrideConsole = require('./services/overrideConsole');
overrideConsole();

const swaggerUI = require('swagger-ui-express');
const { getSpecifications } = require('../documentation/index');
const openapiSpecification = getSpecifications(['./documentation/*.yaml']);

const { rideRouter, healthRouter } = require('./router/index');


app.use(express.json());
app.use('/health', healthRouter);
app.use('/rides', rideRouter);

//swagger documentation
app.use('/docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification)); // postman to openApi
app.get('/docs.json', (req, res) => {
    res.send(openapiSpecification);
});

module.exports = app;
