import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {useHistory, Link} from 'react-router-dom';
import api from '../../services/api';
import {login} from '../../services/auth';
import Header from '../../components/Header';
import './styles.css';

const Home = () => {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [message, setMessage] = useState('');

    const history = useHistory();

    useEffect(() => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('user_id');
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
            sessionStorage.setItem('user_id', response.data.user.id)
            history.push('/list-pets')
        }).catch((err,) => {
            setMessage(err.response.data.error);
        });
    }
    return (
        <div id="page-content">
            <div className="content">
                <Header/>
                <main>
                    <fieldset> {
                        message && <div className="message-error">
                            {message}</div>
                    }
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
                    <fieldset>
                        <legend>ou</legend>
                        <span>Não tem uma conta? <Link to="/register">Cadastre-se</Link></span>
                    </fieldset>
                </main>
            </div>
        </div>
    );
}

export default Home;
