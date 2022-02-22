import mongoKeys from "./mongoKeys";
import dotenv from "dotenv";

dotenv.config();

/* builds a backup URI incase heroku one fails */
const BACKUP_MONGO_URI = `mongodb+srv://${mongoKeys.username}:${mongoKeys.password}@${mongoKeys.cluster}.mongodb.net/${mongoKeys.database}?retryWrites=true&w=majority`;

/*
 * connection uri defaults to local hosting. I included some json files in the mongoDB root directory
 * incase a database is needed. More info on how to host a mongodb nosql server can be
 * found in the README there.
 */
const mongoURI = process.env.MONGODB_URI || BACKUP_MONGO_URI || "mongodb://localhost:27017";

export default mongoURI;
