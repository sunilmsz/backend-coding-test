const sqlite = require('sqlite');
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

            const con = await sqlite.open(':memory:', { Promise });
           
            DB.#connections[key] = con;
         
            con.on('open', async () => {
                console.log('db connected');
                buildSchemas(con);
            });

            return con;

        } else {
            return DB.#connections[key];
        }

    };

}

module.exports = DB;