const logger = require('./logger');
const override = () => {
    console.log = (...args) => logger.log.call(logger, ...args);
    console.warn = (...args) => logger.warn.call(logger, ...args);
    console.error = (...args) => logger.error.call(logger, ...args);
    console.debug = (...args) => logger.debug.call(logger, ...args);
};

module.exports = override;