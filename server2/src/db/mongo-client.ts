import {MongoClient} from "mongodb";
// @ts-ignore
import {config} from "../../../shared/config";

const url = config.mongo_db_url;
export const client = new MongoClient(url);
client.connect();
