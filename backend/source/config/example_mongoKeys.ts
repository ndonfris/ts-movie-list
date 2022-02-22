/*
 * To host the database on the cloud, I used mongodb atlas
 * (any mongodb provider would work). The defaults defined here
 * are then used to create the mongoDB connection uri, used in
 * the mongoURI file.
 *
 * If you are trying to host the database locally you can
 * uncomment the URI for in mongoURI file, and defualts defined here
 * will not be used.
 */

const MONGO_USERNAME: string = "username";
const MONGO_PASSWORD: string = "password";
const MONGO_CLUSTER: string = "cluster";
const MONGO_DATABASE: string = "movie database";

const mongoKeys = {
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  cluster: MONGO_CLUSTER,
  database: MONGO_DATABASE,
};

export default mongoKeys;
