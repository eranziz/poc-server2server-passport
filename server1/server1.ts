import express from "express";
import HttpStatus from "http-status";
import {authController} from "./src/controllers/AuthController";
import {usersController} from "./src/controllers/UsersController";
import * as bodyParser from "body-parser";

import './src/passport/passport';
import passport from "passport";
import {userSettingsController} from "./src/controllers/UserSettingsController";
export const app: express.Application = express();
const PORT = process.env.PORT || 4001;

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

app.use('/auth', authController);
app.use('/users', passport.authenticate('jwt', {session: false}), usersController);
app.use('/users', passport.authenticate('jwt', {session: false}), userSettingsController);

app.listen(PORT, () => console.log(`Server 1 is running by port ${PORT}`));
