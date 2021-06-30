import {client} from "../db/mongo-client";
import md5 from "md5";
import passport from "passport";
import {ObjectId, ObjectID} from "bson";

const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email: string, password: string, cb: any) {
        console.log(`authenticate by email ${email} and password ${password}`);
        const pass: string = md5(password);
        return client.db('test').collection('users')
            .findOne({email: email, password: pass})
            .then(user => {
                if (!user) {
                    return cb(null, false, {message: 'Incorrect email or password.'});
                }
                return cb(null, user, {message: 'Logged In Successfully'});
            })
            .catch(err => {cb(err)});
    }
));

passport.use(
    new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey   : 'your_jwt_secret'
        },
        (jwtPayload: any, cb: any) => {
            return client.db('test').collection('users')
                .findOne({_id:  new ObjectId(jwtPayload._id)})
                .then(user => {
                    return cb(null, user);
                })
                .catch(err => {
                    return cb(err);
                });
        }
    ));
