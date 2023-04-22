const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const expect = require('chai').expect;
const app = require('../../src/app')(db);
const buildSchemas = require('../../src/schemas');

module.exports = {app,buildSchemas,db,expect};