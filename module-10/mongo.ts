import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export async function getMongoClient(): Promise<MongoClient> {
  const client = new MongoClient(process.env.MONGODB_URI || "");

  await client.connect();
  return client;
}