import {MongoClient} from "mongodb";
// @ts-ignore
import {config} from "../../../shared/config";
export const client = new MongoClient(config.mongo_db_url);
client.connect();
