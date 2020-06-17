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

routes.post("/register", async (request : Request, response : Response) => {
    try {
      let { name, email, whatsapp, password, uf, city } = request.body;

      const userAlreadyExists = await knex('users').where('email', email);
      if (userAlreadyExists[0])
        return response.status(400).send({ error: "User already exists" });
      
      password = await bcrypt.hash(password, 10);
  
      const user = await knex('users').insert({name, email, whatsapp, password, uf, city});
  
      return response.send({ user });
    } catch (err) {
      return response.status(400).send({ error: "Registration failed" });
    }
  });

export default routes;
