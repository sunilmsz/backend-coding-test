const handleQueryParms = ({ start = 1, count = 10 }) => {

    start = parseInt(start);
    count = parseInt(count);
    if (Number.isNaN(start) || start < 0) { start = 1; }
    if (Number.isNaN(count) || count < 1) { count = 10; }

    start--;

    return { start, count };

};

module.exports = { handleQueryParms };