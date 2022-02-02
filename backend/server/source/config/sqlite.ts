/**
 * hosts the query and connect functions which allow us to
 * retrieve data from the Movies database. Promises allow you to 
 * call these functions from .then() catch blocks. 
 */
import config from './config';
import sqlite3 from 'sqlite3';
import {Database, open} from 'sqlite';

/**
 * params needed for mysql database connection
 */
const params = {
    user: config.sqlite.user,
    password: config.sqlite.pass,
    host: config.sqlite.host,
    database: config.sqlite.database
};

/**
 * Connect is an async function returning the type mysql.Connection
 * @param resolve - connection to be resolve
 * @param reject - connection error
 * @return Promise
 */
export async function openDb () {
    return open({
        filename: '../../movies.db',
        driver: sqlite3.Database
    });
}


export async function sendQuery(db: Database, query: string) {
}

export async function getQuery(db: Database, query: string) {
}
