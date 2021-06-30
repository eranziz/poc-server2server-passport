import express, {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

export const authController = express.Router();

authController.post('/signin', (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate('local', {session: false}, (err: any, user: any, info: any) => {
        console.log(`signin auth by user:`);
        console.log(user);
        if (err || !user) {
            return response.status(401).json({
                message: 'Something is not right',
                user   : user
            });
        }
        request.login(user, {session: false}, async (err: any) => {
            if (err) {
                return response.send(err);
            }
            const token = await jwt.sign(user, 'your_jwt_secret');
            return response.json({user, token});
        });
    })(request, response);
});
