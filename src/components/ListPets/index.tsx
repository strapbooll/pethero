import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import male from '../../assets/male.png';
import female from '../../assets/female.png';
import api from '../../services/api';
import './styles.css';


interface Pet {
    id: number;
    name: string;
    image_url: string;
    city: string;
    uf: string;
    size: string;
    genre: string;
}

interface Props{
    category: string;
}

const ListPets: React.FC < Props > = ({category}) => {
    const [pets, setPets] = useState < Pet[] > ([]);

    useEffect(() => {
        api.get('/pets').then(response => {
            setPets(response.data);
        })
    }, []);

    useEffect(() => {
        api.get(`/pets/?category=${category}`).then(response => {
            setPets(response.data);
        })
    }, [category]);

  return(
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
                {localStorage.getItem('token') && (
                    <Link to={`/pet-detail/${pet.id}`}>                                                
                        <strong>Adotar</strong>
                    </Link>
                )}
            </div>
        </li>
    ))
} </ul>
  );
}

export default ListPets;