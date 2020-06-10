import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
import male from '../../assets/male.png';
import female from '../../assets/female.png';

import './styles.css';

import logo from '../../assets/logo.svg';

interface Pet {
    id: number;
    name: string;
    image_url: string;
    city: string;
    uf: string;
    size: string;
    genre: string;
}

const ListPets = () => {
    const [pets, setPets] = useState < Pet[] > ([]);

    useEffect(() => {
        api.get('/pets').then(response => {
            setPets(response.data);
        })
    }, []);

    return (
        <div id="page-create-pets">
            <header>
                <img src={logo}
                    alt="pethero"/>
            </header>     
            <div className="nav"><span>Adote</span></div>
            <div className="pet-cards">
                        <fieldset>
                            <legend>
                                <h2>
                                    Pets
                                </h2>
                                <span>Selecione um pet abaixo</span>
                            </legend>
                            <ul className="pets-grid">
                                {
                                pets.map(pet => (
                                    <li key={
                                        pet.id
                                    }>
                                        <img className="pet-photo" src={
                                                pet.image_url
                                            }
                                            alt={
                                                pet.name
                                            }/>
                                        <div className="detail">
                                            <h3>{
                                                pet.name
                                            }</h3>
                                            <p>São Paulo, SP</p>
                                            <div>
                                                <p>{
                                                    pet.size
                                                }</p>
                                                <p>{
                                                    pet.genre === 'Macho' ? <img src={male}
                                                        alt='genre'/> : <img src={female}
                                                        alt='genre'/>
                                                }</p>
                                            </div>
                                            <Link to={`/pets/${pet.id}`}>                                                
                                                <strong>Adotar</strong>
                                            </Link>
                                        </div>
                                    </li>
                                ))
                            } </ul>
                        </fieldset>
                    </div>
        </div>
    );
}

export default ListPets;
