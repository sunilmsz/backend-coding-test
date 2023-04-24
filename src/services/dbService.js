const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const buildSchemas = require('../schemas');
class DB {
    key = null;
    static #connections = {};
    static get = async (key = 'default') => {
        if (DB.#connections[key]) return DB.#connections[key];
        else
            return await DB.connect();
    };

    static connect = async (key = 'default') => {
        if (!DB.#connections[key]) {

            const con = await sqlite.open({
                filename: ':memory:',
                driver: sqlite3.cached.Database
            });

            DB.#connections[key] = con;

            buildSchemas(con);


            console.log('db connected');


            return con;

        } else {
            return DB.#connections[key];
        }

    };

}

module.exports = DB;