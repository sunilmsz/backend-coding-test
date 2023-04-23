const { Router } = require('express');

const router = new Router();

const { createRide, getRides, getRide } = require('../controller/rideController/index');

router.post('/', createRide);
router.get('/', getRides);
router.get('/:id', getRide);
module.exports = router;