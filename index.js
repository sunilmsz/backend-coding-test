'use strict';

const port = 8010;
const overrideConsole = require('./src/services/overrideConsole');
overrideConsole();

const swaggerUI = require('swagger-ui-express');
const { getSpecifications } = require('./documentation/index');
const openapiSpecification = getSpecifications(['./documentation/*.yaml']);

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const buildSchemas = require('./src/schemas');

db.serialize(() => {
    buildSchemas(db);

    const app = require('./src/app')(db);

    //swagger documentation
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification)); // postman to openApi
    app.get('/docs.json', (req, res) => {
        res.send(openapiSpecification);
    });

    app.listen(port, () => console.log(`App started and listening on port ${port}`));

});