import express, {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import knex from '../database/connection';
const authMiddleware = require("../middleware/auth");

const routes = express.Router();

//routes.use(authMiddleware);

routes.get("/users", async (request : Request, response : Response) => {
    try {
        const users = await knex('users').select('*');

        return response.json(users);
    } catch (err) {
        response.status(400).json({error: "Error loading users"});
    }
});

routes.get("/users/:id", async (request : Request, response : Response) => {
    try {
        const {id} = request.params;
        const user = await knex('users').select('*').where('id', id);

        return response.json(user);
    } catch (err) {
        return response.status(400).json({error: "Error loading user"});
    }

});

routes.post("/users", async (request : Request, response : Response) => {
    try {
        let {name, email, whatsapp, password} = request.body;

        if (!await knex('users').where('email', email)) 
            return response.status(400).json({error: "User already exists"});
        


        password = await bcrypt.hash(password, 10);

        let user = await knex('users').insert({name, email, whatsapp, password});

        return response.json(user);
    } catch (err) {
        return response.status(400).json({error: "Error creating new user"});
    }
});

routes.put("/users/:id", async (request : Request, response : Response) => {
    try {
        let {name, email, whatsapp, password} = request.body;

        password = await bcrypt.hash(password, 10);

        const user = await knex('users').where('id', request.params.id).update({name, email, whatsapp, password});

        return response.json(user);
    } catch (err) {
        return response.status(400).json({error: "Error updating user"});
    }
});

routes.delete("/users/:id", async (request : Request, response : Response) => {
    try {
        const user = await knex('users').where('id', request.params.id).del();

        return response.json(user);
    } catch (err) {
        return response.status(400).json({error: "Error removing user"});
    }
});


export default routes;
