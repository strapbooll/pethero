import express from "express";
import path from 'path';
import cors from 'cors';
import auth from "./controllers/AuthController";
import users from './controllers/UsersController';
import pets from './controllers/PetsController';

const app = express();

app.use(express.json());
app.use(cors());
app.use(auth);
app.use(users);
app.use(pets);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);
