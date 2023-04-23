const { Router } = require('express');
const {getHealth} = require('../controller/healthController/index');
const router = new Router();

router.get('/', getHealth);

module.exports = router;