import mongoose from "mongoose";

const mongooseUri = 'mongodb+srv://digitalstore:digitalstore@digitalstore.1chfv5m.mongodb.net/?retryWrites=true&w=majority';
export const db = mongoose.connection;

export const connect = () => {
    const dbConnection = mongoose.connect(mongooseUri, { dbName: "src"});
    db.on('open', () => console.log('connected to MongoDB'));
    db.on('error', () => console.log('fail to connect'));
    return dbConnection;
}