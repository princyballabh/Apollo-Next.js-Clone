import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'MONGODB_URI';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalThis._mongoClientPromise = client.connect();
}
clientPromise = globalThis._mongoClientPromise as Promise<MongoClient>;

export async function connectToDatabase() {
    const client = await clientPromise;
    return client.db('apollo247');
}