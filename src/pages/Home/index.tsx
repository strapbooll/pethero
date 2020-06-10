import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import {FiLogIn} from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import male from '../../assets/male.png';
import female from '../../assets/female.png';
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

const Home = () => {
    const [pets, setPets] = useState < Pet[] > ([]);
    const [formData, setFormData] = useState({email: '', password: ''});
    const [message, setMessage] = useState('');

    const history = useHistory();

    useEffect(() => {
        api.get('/pets').then(response => {
            setPets(response.data);
        })
    }, []);
    
    function handleInputChange(event : ChangeEvent < HTMLInputElement >) {
        const {name, value} = event.target
        setFormData({
            ...formData,
            [name]: value
        });       
    }

    async function handleSubmit(event : FormEvent) {
        event.preventDefault();

        const {email, password} = formData;       

        await api.post('/authenticate', {email, password}).then(()=> {
            history.push('/list-pets')
        })
        .catch((err,) => {
            setMessage(err.response.data.error);            
        });
    }
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo}
                        alt="pethero"/>
                </header>
                <main>
                    <div className="form-sign">
                        <div className="leftside">
                            <h1>
                                Ame um pet
                            </h1>
                            <p>
                                Encontre amigos ansiosos para ter um lar. Um amigo para chamar de seu
                            </p>
                        </div>
                        <div className="rightside">
                            <fieldset>
                                {message && <div className="message-error">{message}</div>}
                                <form onSubmit={handleSubmit}>
                                    <div className="field">
                                        <label htmlFor="email">E-mail</label>
                                        <input type="email" name="email" id="email"
                                            onChange={handleInputChange}
                                            required/>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="password">Senha</label>
                                        <input type="password" name="password" id="password"
                                            onChange={handleInputChange}
                                            required/>
                                    </div>
                                    <button type="submit">
                                        <span>
                                            <FiLogIn/>
                                        </span>
                                        <strong>Login</strong>
                                    </button>
                                </form>

                            </fieldset>


                        </div>
                    </div>
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
                                        <img src={
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
                                        </div>
                                    </li>
                                ))
                            } </ul>
                        </fieldset>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Home;
