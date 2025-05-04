import { MongoClient } from 'mongodb';

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI || 'MONGODB_URI';
const options = {};

const clientPromise: Promise<MongoClient> = globalThis._mongoClientPromise || (() => {
    const client = new MongoClient(uri, options);
    const promise = client.connect();
    globalThis._mongoClientPromise = promise; 
    return promise;
})();

export async function connectToDatabase() {
    const client = await clientPromise;
    return client.db('apollo247'); 
}