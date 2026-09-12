import mongoose from "mongoose";

const MONGODB_URI = "mongodb://araizkhan034_db_user:3MnvEXhX0KexGH0s@ac-wm2iegx-shard-00-00.lk06hn0.mongodb.net:27017,ac-wm2iegx-shard-00-01.lk06hn0.mongodb.net:27017,ac-wm2iegx-shard-00-02.lk06hn0.mongodb.net:27017/musafir_db?tls=true&replicaSet=atlas-rfkscm-shard-0&authSource=admin&retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
