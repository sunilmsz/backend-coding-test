'use strict';

const request = require('supertest');

const {app,DB,buildSchemas} = require('./helper/serverAndDb');


describe(' Health API tests', async () => {
    const db = await DB.get();
    buildSchemas(db);


    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });
});