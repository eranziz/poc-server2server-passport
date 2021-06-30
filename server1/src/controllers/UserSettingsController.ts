import express, {NextFunction, Request, Response} from "express";
import axios, {AxiosResponse} from 'axios';
import {config} from "../../../shared/config";
import {AES} from "../aes/aes";

export const userSettingsController = express.Router();
const options: any = {
    headers: {
        authorization: `Token ${config.server2serverToken}`
    }
}
// Create User Settings API
userSettingsController.post('/:id/settings', async (request: Request, response: Response, next: NextFunction) => {
    const userSettings = request.body;
    const userId: string = request.params.id;
    const res: AxiosResponse = await axios.post(
        config.server1_base_url,
        {data: AES.encrypt({...userSettings, userId})},
        options
    );
    return response.status(res.status)
        .json({id: res.data.id});
});

// Get User Settings API
userSettingsController.get('/:id/settings/:sid', async (request: Request, response: Response, next: NextFunction) => {
    const settingsId: string = request.params.sid;
    const userId: string = request.params.id;
    const res: AxiosResponse = await axios.get(
        `${config.server1_base_url}/${settingsId}?uid=${userId}`,
        options
    );
    return response.status(res.status)
        .json({...res.data});
});

// Get All User Settings API
userSettingsController.get('/:id/settings', async (request: Request, response: Response, next: NextFunction) => {
    const userId: string = request.params.id;
    const res: AxiosResponse = await axios.get(
        `${config.server1_base_url}?uid=${userId}`,
        options
    );
    return response.status(res.status)
        .json({...res.data});
});

// Delete User API
userSettingsController.delete('/:id/settings/:sid', async (request: Request, response: Response, next: NextFunction) => {
    const settingsId: string = request.params.sid;
    const res: AxiosResponse = await axios.delete(
        `${config.server1_base_url}/${settingsId}`,
        options
    );
    return response.status(res.status)
        .json({...res.data});
});


