const dotEnv = require('dotenv');

dotEnv.config();

const {ENV,PORT} = process.env;

const config = {
    ENV: ENV || 'DEVELOPMENT',
    PORT: PORT || 8040
};

module.exports= config;