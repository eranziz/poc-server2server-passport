import express, {NextFunction, Request, Response} from "express";
import * as httpStatus from "http-status";
import {InsertOneWriteOpResult, ObjectId} from "mongodb";
import {client} from "../db/mongo-client";
import md5 = require("md5");

export const usersController = express.Router();

// Create User API
usersController.post('/', async (request: Request, response: Response, next: NextFunction) => {
    const user = request.body;
    user.password = md5(user.password);
    const result: InsertOneWriteOpResult<any> = await client.db('test').collection('users')
        .insertOne(user);
    return response.status(httpStatus.OK)
        .json({id: result.insertedId});
});

// Get User API
usersController.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
    const id: string = request.params.id;
    console.log(`Get user by id: ${id}`);
    const user: any = await client.db('test').collection('users')
        .findOne({_id: new ObjectId(id)});
    return response.status(httpStatus.OK)
        .json({user});
});

// Get All Users API
usersController.get('/', async (request: Request, response: Response, next: NextFunction) => {
    const users: any[] = await client.db('test').collection('users').find().toArray();
    return response.status(httpStatus.OK)
        .json({users});
});

// Delete User API
usersController.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
    const id: string = request.params.id;
    console.log(`Delete user by id: ${id}`);
    const user: any = await client.db('test').collection('users')
        .deleteOne({_id: new ObjectId(id)});
    return response.status(httpStatus.OK)
        .json({user});
});

