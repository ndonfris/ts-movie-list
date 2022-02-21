import * as mongoDB from "mongodb";
import dotenv from "dotenv";
import {Movie, MovieMoreInfo} from "../helpers/Interfaces";
import {toMovie} from "../helpers/Functions";
import {MovieObj} from "../helpers/MovieMoreInfoClass";

dotenv.config();
const connectionUrl = 'mongodb://localhost:27017';

export default class Mongo {
    client: mongoDB.MongoClient;
    db!: mongoDB.Db;
    collection!: mongoDB.Collection;

    constructor () {
        this.client = new mongoDB.MongoClient(connectionUrl);
    }

    async connect () {
        await this.client.connect();
        console.log('Connected to mongoDB successfully');

        this.db = this.client.db("movies");
    }

    connectToCollection (collectionName: string) {
        this.collection = this.db.collection(collectionName);
    }

    async getAllRecordsFull () {
        const result = await this.collection.find({}).toArray();
        return result;
    }

    async getAllRecordsLess () {
        const allRecords: mongoDB.WithId<MovieMoreInfo>[] = await this.collection.find({}).toArray();
        const result : Movie[] = [] ;
        for (var i in allRecords) {
            result.push(new MovieObj(allRecords[i]).toMovie());
        }
        return result;
    }

    async storeFilter (filter: {}) {
        const storeResult = await this.collection.insertOne(filter);
        return storeResult;
    }

    async removeFilter (filter: {}) {
        const removeResult = await this.collection.findOneAndDelete(filter);
        return removeResult;
    }

    async disconnect () {
        await this.client.close();
    }

}
