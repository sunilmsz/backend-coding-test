const validateBody = ({ startLatitude, startLongitude, endLatitude, endLongitude, riderName, driverName, driverVehicle }) => {

    if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
        return 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively';
    }

    if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
        return 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively';
    }

    if (typeof riderName !== 'string' || riderName.length < 1) {
        return 'Rider name must be a non empty string';
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
        return 'Rider name must be a non empty string';
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
        return 'Rider name must be a non empty string';
    }

    return null;

};

const sanitizeStrings = ({ riderName, driverName, driverVehicle }) => {
    const sRiderName = sanitize(riderName || '');
    const sDriverName = sanitize(driverName || '');
    const sDriverVehicle = sanitize(driverVehicle || '');
    return { sRiderName, sDriverName, sDriverVehicle };

};

const sanitize = (str) => {
    // eslint-disable-next-line
    return str.replace("'", "").replace('"', '');
};


module.exports = { validateBody, sanitizeStrings };