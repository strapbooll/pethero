import express, {Request, Response, NextFunction} from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import knex from '../database/connection';

const authConfig = require("../configs/auth");

const routes = express.Router();

function generateToken(params = {}) {
    return jwt.sign({
        params
    }, authConfig.secret, {expiresIn: 86400});
}

routes.post("/authenticate", async (request : Request, response : Response, next : NextFunction) => {
    const {email, password} = request.body;

    const user = await knex('users').where('email', email).first();

    if (! user) 
        return next(response.status(400).send({error: "User not found"}));
    


    if (!(await bcrypt.compare(password, user.password))) 
        return next(response.status(400).send({error: "Invalid password"}));
    


    user.password = undefined;

    const token = generateToken({id: user.id});

    return next(response.json({user, token}));
});

export default routes;
