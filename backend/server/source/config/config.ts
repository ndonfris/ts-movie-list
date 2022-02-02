import dotenv from 'dotenv';

dotenv.config();

const SQL_HOST = process.env.MYSQL_HOST || 'localhost';
const SQL_DATABASE = process.env.MYSQL_DATABASE || 'movies';
const SQL_USER = process.env.MYSQL_HOST || 'superuser';
const SQL_PASS = process.env.MYSQL_HOST || 'batmanbegins';

const SQLITE = {
    host: SQL_HOST,
    database: SQL_DATABASE,
    user: SQL_USER,
    pass: SQL_PASS
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3000;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    sqlite: SQLITE,
    server: SERVER
};

export default config;
