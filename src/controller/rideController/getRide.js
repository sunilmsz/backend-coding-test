const responseService = require('../../services/responseService');
const DB = require('../../services/dbService');

const getRide = async (req, res) => {
    try {
        let { id } = req.params;
        id = parseInt(id);

        if (Number.isNaN(id) || id < 1) {
            return responseService.error(res,'Could not find any rides','RIDES_NOT_FOUND_ERROR');
        }
        
        const db = await DB.get();
        const rides= await db.all(`SELECT * FROM Rides WHERE rideID='${id}'`);

        if(rides.length==0){
            return responseService.error(res,'Could not find any rides','RIDES_NOT_FOUND_ERROR');
        }

        return res.send(rides);

    } catch (error) {
        console.error(error);
        responseService.serverError(res);
    }
};


module.exports = {getRide};