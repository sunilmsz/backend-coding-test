const responseService = require('../../services/responseService');
const { handleQueryParms } = require('./helper/index');
const DB = require('../../services/dbService');

const getRides = async (req, res) => {
    try {
        const db = await DB.get();
        const { start, count } = handleQueryParms(req.query);

        let resultCount = 0;

        const countData = await db.all('SELECT count(*) as total FROM Rides');

        resultCount = countData.length > 0 ? countData[0].total : 0;

        if (resultCount == 0 || start + 1 > resultCount) {
            return responseService.error(res, 'Could not find any rides', 'RIDES_NOT_FOUND_ERROR');
        }

        const rides = await db.all(`SELECT * FROM Rides LIMIT ${start},${count}`);

        res.send(rides);

    } catch (error) {
        console.error(error);
        responseService.serverError(res);
    }
};

module.exports = {getRides};