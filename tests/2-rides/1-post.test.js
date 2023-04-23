'use strict';

const request = require('supertest');

const { app, expect } = require('../helper/serverAndDb');


describe(' Rides API tests', () => {

    const payload = {
        'start_lat': 80,
        'start_long': 100,
        'end_lat': '80',
        'end_long': '110',
        'rider_name': 'SK',
        'driver_name': 'SK',
        'driver_vehicle': 'Bajaj'
    };

    describe('POST /rides', () => {

        it('should create the ride', (done) => {
            request(app)
                .post('/rides')
                .send(payload)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    const wrongSLatPaylod = { ...payload, start_lat: 1000 };

    it('should give validation error about start_lat', async () => {
        const response = await request(app)
            .post('/rides')
            .send(wrongSLatPaylod)
            .expect('Content-Type', /json/)
            .expect(200);

        const { message, error_code } = response.body;
        expect(error_code).equal('VALIDATION_ERROR');
        expect(message).equal('Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
    });

    const wrongRiderNamePaylod = { ...payload, rider_name: null };

    it('should give validation error about rider_name', async () => {
        const response = await request(app)
            .post('/rides')
            .send(wrongRiderNamePaylod)
            .expect('Content-Type', /json/)
            .expect(200);

        const { message, error_code } = response.body;
        expect(error_code).equal('VALIDATION_ERROR');
        expect(message).equal('Rider name must be a non empty string');
    });


    const wrongDriverNamePaylod = { ...payload, driver_name: null };

    it('should give validation error about driver_name', async () => {
        const response = await request(app)
            .post('/rides')
            .send(wrongDriverNamePaylod)
            .expect('Content-Type', /json/)
            .expect(200);

        const { message, error_code } = response.body;
        expect(error_code).equal('VALIDATION_ERROR');
        expect(message).equal('Rider name must be a non empty string');
    });

    // eslint-disable-next-line
    const sqlInjectedPaylod = { ...payload, driver_name: "SK'", rider_name: 'SK"' };

    it('should sanitize strings', async () => {
        const response = await request(app)
            .post('/rides')
            .send(sqlInjectedPaylod)
            .expect('Content-Type', /json/)
            .expect(200);

        const res = response.body;
        const { riderName, driverName } = res[0];
        expect(riderName).equal('SK');
        expect(driverName).equal('SK');
    });






});