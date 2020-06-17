import express, {Request, Response} from 'express';
import multer from 'multer';
import multerConfig from '../configs/multer';
import knex from '../database/connection';
//const authMiddleware = require("../middleware/auth");

const routes = express.Router();
const upload = multer(multerConfig);

//routes.use(authMiddleware);

routes.get("/pets", async (request : Request, response : Response) => {
    try {
        const {category} = request.query;        

        let pets = await knex('pets').select('*');

        if(category){
            pets = await knex('pets').select('*').where('category', String(category))
        }

        const serializedPets = pets.map(pet => {
            return {
                id: pet.id,
                name: pet.name,
                category: pet.category,
                age: pet.age,
                size: pet.size,
                genre: pet.genre,
                history: pet.history,
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
        const pet = await knex('pets')
        .select(
            'pets.*', 
            'users.name as user_name', 
            'users.whatsapp',
            'users.email',
            'users.city',
            'users.uf',
            )
        .join('users','users.id', '=','pets.user_id')
        .where('pets.id', id).first();

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
        const {name, category, age, size, genre, history,user_id} = request.body;
        const pet = {
            image: request.file.filename,
            name,
            category,
            age,
            user_id,
            size, 
            genre, 
            history
        };

        const Insertedpet = await knex('pets').insert(pet);

        return response.json(Insertedpet);
    } catch (err) {
        return response.status(400).json({error: err});
    }
});

routes.put("/pets/:id", async (request : Request, response : Response) => {
    try {
        const {
            name,
            category,
            age,
            user_id,
            size, 
            genre, 
            history
        } = request.body;

        const pet = await knex('pets').where('id', request.params.id).update({name, category, age, user_id, size, genre, history});

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
