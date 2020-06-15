import React, {useState, FormEvent, ChangeEvent} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import {login} from '../../services/auth';
import Header from '../../components/Header';
import './styles.css';

const Register = () => {
    const [formData, setFormData] = useState({name: '',email: '',whatsapp: '', password: ''});
    const [message, setMessage] = useState('');

    const history = useHistory();

    function handleInputChange(event : ChangeEvent < HTMLInputElement >) {
        const {name, value} = event.target
        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(event : FormEvent) {
        event.preventDefault();
        const {name, email, whatsapp, password} = formData;
        await api.post('/register', {name, email, whatsapp, password}).then((response) => {
            login(response.data.token);
            history.push('/')
        }).catch((err,) => {
            setMessage(err.response.data.error);
        });
    }
    return (
        <div id="page-register">
            <div className="content">
                <Header/>
                <main>
                    <fieldset> {
                        message && <div className="message-error">
                            {message}</div>
                    }
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label htmlFor="name">Nome completo</label>
                                <input type="text" name="name" id="name"
                                    onChange={handleInputChange}
                                    required/>
                            </div>
                            <div className="field">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" name="email" id="email"
                                    onChange={handleInputChange}
                                    required/>
                            </div>
                            <div className="field">
                                <label htmlFor="whatsapp">Whatsapp</label>
                                <input type="text" name="whatsapp" id="whatsapp"
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
                                <strong>Cadastre-se</strong>
                            </button>
                        </form>
                        <p>
                        Ao se cadastrar, você concorda com nossos<br /> Termos, Política de Dados e Política de<br /> Cookies.
                        </p>
                    </fieldset>
                </main>
            </div>
        </div>
    );
}

export default Register;
