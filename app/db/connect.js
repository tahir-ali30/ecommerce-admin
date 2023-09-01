import mongoose from "mongoose";


export function mongooseConnect() {
    const uri = process.env.MONGO_URI;
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    } else {
        return mongoose.connect(uri)
    }
}