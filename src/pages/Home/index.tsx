import React, {useState, useEffect,FormEvent, ChangeEvent} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import { login } from '../../services/auth';
import Header from '../../components/Header';
import './styles.css';

const Home = () => {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [message, setMessage] = useState('');

    const history = useHistory();

    useEffect(() => {
        localStorage.removeItem('token');
    }, [localStorage.getItem('token')]);
    
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

        await api.post('/authenticate', {email, password}).then((response) => {
            login(response.data.token);
            history.push('/list-pets')
        })
        .catch((err,) => {
            setMessage(err.response.data.error);            
        });
    }
    return (
        <div id="page-home">
            <div className="content">                
                <Header />
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
                </main>
            </div>
        </div>
    );
}

export default Home;
