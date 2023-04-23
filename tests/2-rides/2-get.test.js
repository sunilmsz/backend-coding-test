'use strict';

const request = require('supertest');

const { app, expect } = require('../helper/serverAndDb');

describe(' Rides GET  API tests', function () {

    describe('GET /rides', () => {
        it('should return max first 10  available rides',async () => {
            const response = await request(app)
                .get('/rides')
                .expect('Content-Type', /json/)
                .expect(200);

            const {body} = response;
            expect(body.length).above(0).below(11);
        });
    });

    describe('GET /rides', () => {
        it('should return no rides avialbes', async () => {
            const response = await request(app)
                .get('/rides?start=10000')
                .expect('Content-Type', /json/)
                .expect(200);

            const { message, error_code } = response.body;
            expect(message).equal('Could not find any rides');
            expect(error_code).equal('RIDES_NOT_FOUND_ERROR');
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

            const { message, error_code } = response.body;
            expect(message).equal('Could not find any rides');
            expect(error_code).equal('RIDES_NOT_FOUND_ERROR');

        });
    });



});