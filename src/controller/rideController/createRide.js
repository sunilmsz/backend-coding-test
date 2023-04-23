const responseService = require('../../services/responseService');
const { validateBody } = require('./helper/index');
const DB = require('../../services/dbService');

const createRide = async (req, res) => {
    try {
        const db = await DB.get();
        const { start_lat, start_long, end_lat, end_long, rider_name: riderName, driver_name: driverName, driver_vehicle: driverVehicle } = req.body;
        const startLatitude = Number(start_lat);
        const startLongitude = Number(start_long);
        const endLatitude = Number(end_lat);
        const endLongitude = Number(end_long);

        const validationError = validateBody({ startLatitude, startLongitude, endLatitude, endLongitude, riderName, driverName, driverVehicle });

        if (validationError) {
            return responseService.error(res, validationError, 'VALIDATION_ERROR');
        }

        const values = [startLatitude, startLongitude, endLatitude, endLongitude, riderName, driverName, driverVehicle];

        const response = await db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values);
        const inserted = await db.all(`SELECT * FROM Rides WHERE rideID = ${response.stmt.lastID}`);

        res.send(inserted);

    } catch (error) {
        console.error(error);
        responseService.serverError(res);
    }
};

module.exports= {createRide};