
const error = (res, message, error_code) => {
    res.send({ error_code, message });
};

const serverError = (res) => {
    res.send({
        error_code: 'SERVER_ERROR',
        message: 'Unknown error'
    });
};

module.exports = { error, serverError };