const mongoose = require('mongoose');
import dotenv from 'dotenv';

dotenv.config();
const connectionUrl = 'mongodb://localhost:27017';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(connectionUrl, {
            useNewUrlParser: true
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;
