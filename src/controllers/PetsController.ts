import express, {Request, Response} from 'express';
import multer from 'multer';
import multerConfig from '../configs/multer';
import knex from '../database/connection';
const authMiddleware = require("../middleware/auth");

const routes = express.Router();
const upload = multer(multerConfig);

routes.use(authMiddleware);

routes.get("/pets", async (request : Request, response : Response) => {
    try {
        const pets = await knex('pets').select('*');

        const serializedPets = pets.map(pet => {
            return {
                ... pets,
                image_url: `http://localhost:3333/uploads/${
                    pet.image
                }`
            };
        });

        return response.json(serializedPets);
    } catch (err) {
        response.status(400).json({error: "Error loading pets"});
    }
});

routes.get("/pets/:id", async (request : Request, response : Response) => {
    try {
        const {id} = request.params;
        const pet = await knex('pets').select('*').where('id', id).first();

        const serializedPets = {
            ... pet,
            image_url: `http://localhost:3333/uploads/${
                pet.image
            }`
        }

        return response.json(serializedPets);
    } catch (err) {
        return response.status(400).json({error: "Error loading pet"});
    }

});

routes.post("/pets", upload.single('image'), async (request : Request, response : Response) => {
    try {
        const {name, category, age, user_id} = request.body;
        console.log(request.file);
        const pet = {
            image: request.file.filename,
            name,
            category,
            age,
            user_id
        };

        const Insertedpet = await knex('pets').insert(pet);

        return response.json(Insertedpet);
    } catch (err) {
        return response.status(400).json({error: err});
    }
});

routes.put("/pets/:id", async (request : Request, response : Response) => {
    try {
        const {name, category, age, user_id} = request.body;

        const pet = await knex('pets').where('id', request.params.id).update({name, category, age, user_id});

        return response.json(pet);
    } catch (err) {
        return response.status(400).json({error: "Error updating pet"});
    }
});

routes.delete("/pets/:id", async (request : Request, response : Response) => {
    try {
        const pet = await knex('pets').where('id', request.params.id).del();

        return response.json(pet);
    } catch (err) {
        return response.status(400).json({error: "Error removing pet"});
    }
});


export default routes;
