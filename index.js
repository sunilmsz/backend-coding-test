'use strict';

const DB = require('./src/services/dbService');
const { PORT: port } = require('./config');

async function main() {
    await DB.connect();
    const app = require('./src/app');
    app.listen(port, () => console.log(`App started and listening on port ${port}`));
}

main();









