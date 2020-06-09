import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';

const authConfig = require('../configs/auth.json');

module.exports = (request : Request, response : Response, next : NextFunction) => {
    const authHeader = request.headers.authorization;

    if (! authHeader) 
        return response.status(401).send({error: 'No token provided'});
    


    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return response.status(401).send({error: 'Token error'});
    }


    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) 
        return response.status(401).send({error: 'Token malformatted'});
    


    jwt.verify(token, authConfig.secret, (err : any) => {
        if (err) 
            return response.status(401).send({error: 'Token invalid'});
        

        return next();
    });
};
