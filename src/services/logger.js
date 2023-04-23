

const winston = require('winston');
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');

const {  ENV = 'development' } = process.env;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5
};


// if it was run in production, show only warn and error messages.
const level = () => {
    return (ENV == 'development') ? 'debug' : 'warn';
};


const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};


winston.addColors(colors);


// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss A' }),

    ENV == 'development' ? winston.format.colorize({ all: true }) : winston.format.uncolorize(),

    winston.format.align(),
    winston.format.splat(),

    winston.format.printf(
        ({ level: lvl, message, timestamp }) => `${timestamp} [${replaceSpecialChars(lvl).toUpperCase()}]: ${message}`
    )
);

const logFormatter = winston.format.combine(
    winston.format.printf(
        ({ level: lvl, message, timestamp }) => replaceSpecialChars(`${timestamp} ${lvl.toUpperCase()}: ${message}`)
    )
);

const replaceSpecialChars = (str) => {
    return str.replaceAll('[32M', '')
        .replaceAll('[39M', '')
        .replaceAll('[32m', '')
        .replaceAll('[39m', '')
        .replaceAll('[31M', '')
        .replaceAll('[33M', '')
        .replaceAll('[33m', '')
        .replaceAll('[37M', '')
        .replaceAll('[37m', '')
        .replaceAll('[31m', '');
};

const consoleTransport = new winston.transports.Console({
    level: 'debug',
    prettyPrint: true,
    colorize: process.stdout.isTTY,
    silent: false,
    timestamp: true,
    json: false
});


const dailyErrorRotateFileTransport = new winston.transports.DailyRotateFile({
    level: 'error',
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-ww',
    maxFiles: '14d',
    maxsize: 104857600, // 100M
    tailable: true,
    format: logFormatter
});

const dailyCombinedRotateFileTransport = new winston.transports.DailyRotateFile({
    level: 'debug',
    filename: 'logs/allCombined-%DATE%.log',
    datePattern: 'YYYY-ww',
    maxFiles: '14d',
    maxsize: 104857600, // 100M
    tailable: true,
    format: logFormatter
});

// dailyRotateFileTransport.on('rotate', (oldFile, newFile) => {
//     // what you want to do when file rotate, like upload to s3 bucket or move file to another folder or delete file
// });

const transports = [
    consoleTransport,
    dailyErrorRotateFileTransport,
    dailyCombinedRotateFileTransport
];


const wlogger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,

});

function log() {
    wlogger.info(consoleHandler(arguments));
}
function debug() {
    wlogger.debug(consoleHandler(arguments));
}
function error() {
    wlogger.error(consoleHandler(arguments));
}
function warn() {
    wlogger.warn(consoleHandler(arguments));
}

const consoleHandler = (arr) => {
    const condition = (item) => typeof (item) === 'object' && !(item instanceof Error);
    return Object.values(arr).map(item => condition(item) ? JSON.stringify(item) : item instanceof Error ? item.stack : item).join(' ');
};

const logger = {
    ...wlogger,
    log,
    debug,
    error,
    warn
};

module.exports = logger;
