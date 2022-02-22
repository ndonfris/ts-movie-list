/**
 * File:        db.ts
 * Author:      Nick Donfris
 * Created:     02/21/22
 */

import * as mongoDB from "mongodb";
import dotenv from "dotenv";
import {MovieObj} from "../helpers/MovieObj";
import mongoURI from "./mongoURI";
import {Movie, MovieMoreInfo} from "../helpers/Interfaces";

dotenv.config();

/**
 * Mongo class is used in the controller callbacks.
 * Handles turning off and on connections between the cloud hosted
 * mongoDB server.
 */
export default class Mongo {
    /* fields used in a mongo instance */
    client: mongoDB.MongoClient;
    db!: mongoDB.Db;
    collection!: mongoDB.Collection;

    constructor () {
        this.client = new mongoDB.MongoClient(mongoURI);
    }

    /**
     * @async connect - method to connect to the mongo database
     */
    async connect () {
        await this.client.connect();
        console.log('Connected to mongoDB successfully');

        this.db = this.client.db("movies");
    }

    /**
     * connectToCollection - connects a client to a collection in a database.
     * 
     * @param collectionName - the collection name to connect to
     * 
     */
    connectToCollection (collectionName: string) {
        this.collection = this.db.collection(collectionName);
    }

    /**
     * @async getAllRecordsFull - retrieves all records in the database. Used for 
     *                            getting Full MovieInfo.
     * 
     * @return MovieMoreInfo[] - array of all known information about each saved
     *                           movie objects
     */
    async getAllRecordsFull () {
        const result = await this.collection.find({}).toArray();
        return result;
    }

    /**
     * @async getAllRecordsLess - same as getAllRecordsFull, but uses MovieObj class to
     *                            extract the relevant Movie interface keys
     * 
     * @return Movie[] - array of MovieMoreInfo interfaces, shrunken down into Movie 
     *                   interfaces.
     */
    async getAllRecordsLess () {
        const allRecords: mongoDB.WithId<MovieMoreInfo>[] = await this.collection.find({}).toArray();
        const result : Movie[] = [] ;
        for (var i in allRecords) {
            result.push(new MovieObj(allRecords[i]).toMovie());
        }
        await this.client.close();
        return result;
    }

    /**
     * @async getEveryMatchingRecord - retrieves every record that matches filter param
     *
     * @return MoveMoreInfo[] - every matching record
     */
    async getEveryMatchingRecord(filter: {}) {
        const records = await this.collection.find(filter).toArray();

        await this.client.close();
        return records;
    }

    /**
     * @async storeFilter - inserts the filter param into the collection
     * 
     * @param filter - relevant fields for an item in a collection in the database
     * 
     * @return callback - result from backend (successes/fail)
     */
    async storeFilter (filter: {}) {
        const storeResult = await this.collection.insertOne(filter);
        return storeResult;
    }

    /**
     * @async removeFilter - removes the first seen item in the collection that
     *                       matches filter param.
     * 
     * @param filter - relevant fields for an item in a collection in the database
     * 
     * @return callback - result from backend (successes/fail)
     */
    async removeFilter (filter: {}) {
        const removeResult = await this.collection.findOneAndDelete(filter);
        return removeResult;
    }

    /**
     * @async disconnect - close the connection for this instance
     */
    async disconnect () {
        await this.client.close();
    }

}
