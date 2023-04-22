'use strict';

const request = require('supertest');

const { app,expect } = require('../helper/serverAndDb');

describe(' Rides GET  API tests', function () {
    this.timeout(50000);
    describe('GET /rides', () => {
        it('should return all available rides', (done) => {
            request(app)
                .get('/rides')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('GET /rides/:id', () => {
        it('should return particular ride with id 1', (done) => {
            request(app)
                .get('/rides/1')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('GET /rides/:id', () => {
        it('should give error like no ride', async () => {
            const response = await request(app)
                .get('/rides/-1')
                .expect('Content-Type', /json/)
                .expect(200);
                
            const {message,error_code} = response.body;
            expect(message).equal('Could not find any rides');
            expect(error_code).equal('RIDES_NOT_FOUND_ERROR');

        });
    });



});