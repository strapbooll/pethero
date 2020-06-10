import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import api from '../../services/api';
import './styles.css';
import Header from '../../components/Header';

interface Pet {
    id: number;
    name: string;
    image_url: string;
    city: string;
    uf: string;
    size: string;
    genre: string;
    age: string;
    history: string;
    whatsapp: string;
    email: string;
}

const PetDetail = () => {
    const [pet, setPet] = useState<Pet> ({} as Pet);
    const {id} = useParams();

    useEffect(() => {
        api.get(`/pets/${id}`).then(response => {
            setPet(response.data);
        })
    }, []);
    return (
        <div id="page-detail-pet">
            <Header/>
            <main>                
                <img src={pet.image_url} alt={pet.name}/>
                <div className="card">
                <div className="detail">
                    <h2>{pet.name}</h2>
                    <span>São Paulo, SP</span>                        
                    <span>{`${pet.age} anos / ${pet.genre}`}</span>                                   
                    <p>{pet.history}</p>
                </div>
                <div className="contact">
                    <a href={
                        `https://api.whatsapp.com/send?
                        phone=${pet.whatsapp}
                        &text=Olá, eu gostaria de adotar 
                        ${pet.genre === 'Macho' ? 'o': 'a'} ${pet.name}`} 
                        target="_blank">
                        <span><FaWhatsapp /></span>
                        <strong>Whatsapp</strong>
                    </a>
                    <a href={`mailto:${pet.email}`}>
                        <span><FaEnvelope /></span>
                        <strong>E-mail</strong>
                    </a>
                </div>
                </div>
            </main>
        </div>
    );
}

export default PetDetail;
