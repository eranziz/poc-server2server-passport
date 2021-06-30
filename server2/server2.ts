import express from "express";
import HttpStatus from "http-status";
import * as bodyParser from "body-parser";
import {settingsController} from "./src/controllers/SettingsController";
import {authenticationMiddleware} from "./src/middlewares/auth.middleware";

export const app: express.Application = express();
const PORT = process.env.PORT || 4002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    if ('OPTIONS' === req.method) {
        res.sendStatus(HttpStatus.OK);
    } else {
        next();
    }
});

app.use(authenticationMiddleware);
app.use('/settings', settingsController);


app.listen(PORT, () => console.log(`Server 1 is running by port ${PORT}`));
