import express, {NextFunction, Request, Response} from "express";
import * as httpStatus from "http-status";
import {InsertOneWriteOpResult, ObjectId} from "mongodb";
import {client} from "../db/mongo-client";
// @ts-ignore
import {AES} from "../../../server1/src/aes/aes";

export const settingsController = express.Router();

settingsController.post('/', async (request: Request, response: Response, next: NextFunction) => {
    const settings = AES.decrypt(request.body.data);
    const result: InsertOneWriteOpResult<any> = await client.db('test').collection('settings')
        .insertOne(settings);
    return response.status(httpStatus.OK)
        .json({id: result.insertedId});
});

settingsController.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
    const id: string = request.params.id;
    const userId: any = request.query.uid;
    console.log(`Get settings by id: ${id} for user ${userId}`);
    const settings: any = await client.db('test').collection('settings')
        .findOne({_id: new ObjectId(id), userId});
    return response.status(httpStatus.OK)
        .json({settings});
});

settingsController.get('/', async (request: Request, response: Response, next: NextFunction) => {
    const userId: any = request.query.uid;
    const settings: any[] = await client.db('test').collection('settings').find({userId}).toArray();
    return response.status(httpStatus.OK)
        .json({settings});
});


settingsController.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
    const id: string = request.params.id;
    console.log(`Delete settings by id: ${id}`);
    const settings: any = await client.db('test').collection('settings')
        .deleteOne({_id: new ObjectId(id)});
    return response.status(httpStatus.OK)
        .json({settings});
});



