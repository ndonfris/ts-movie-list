/**
 * hosts the query and connect functions which allow us to
 * retrieve data from the Movies database. Promises allow you to 
 * call these functions from .then() catch blocks. 
 */
import mysql from 'mysql';
import config from './config';



/**
 * params needed for mysql database connection
 */
const params = {
    user: config.mysql.user,
    password: config.mysql.pass,
    host: config.mysql.host,
    database: config.mysql.database
};

/**
 * Connect is an async function returning the type mysql.Connection
 * @param resolve - connection to be resolve
 * @param reject - connection error
 * @return Promise
 */
const Connect = async () =>
    new Promise<mysql.Connection>((resolve, reject) => {
        const connection = mysql.createConnection(params);

        connection.connect((error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(connection);
        });
    });

/**
 * Connect is an async function returning the type mysql.Connection
 * @param connection - the connection from Connect()
 * @param query - the sql command
 * @return Promise
 */
const Query = async (connection: mysql.Connection, query: string) =>
    new Promise((resolve, reject) => {
        connection.query(query, connection, (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(result);
        });
    });

export { Connect, Query };

