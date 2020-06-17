import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import axios from 'axios';
import {login} from '../../services/auth';
import Header from '../../components/Header';
import './styles.css';

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const Register = () => {
    const [formData, setFormData] = useState({name: '',email: '',whatsapp: '', password: '', uf: '', city: ''});
    const [message, setMessage] = useState('');
    const [ufs, setUfs] = useState < string[] > ([]);
    const [cities, setCities] = useState < string[] > ([]);
    const [selectedUf, setselectedUf] = useState('0');
    const [selectedCity, setselectedCity] = useState('0');

    const history = useHistory();

    useEffect(() => {
        axios.get < IBGEUFResponse[] > ('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        })
    }, []);

    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }
        axios.get < IBGECityResponse[] > (`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        })
    }, [selectedUf]);

    function handleInputChange(event : ChangeEvent < HTMLInputElement >) {
        const {name, value} = event.target
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSelectUf(event : ChangeEvent < HTMLSelectElement >) {
        const uf = event.target.value;
        setselectedUf(uf);
    }

    function handleSelectCity(event : ChangeEvent < HTMLSelectElement >) {
        const city = event.target.value;
        setselectedCity(city);
    }

    async function handleSubmit(event : FormEvent) {
        event.preventDefault();
        const {name, email, whatsapp, password, uf, city} = formData;
        await api.post('/register', {name, email, whatsapp, password, uf, city}).then((response) => {
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
                            <div className="field-group">
                                <div className="field">
                                    <label htmlFor="uf">Estado</label>
                                    <select name="uf" id="uf"
                                        value={selectedUf}
                                        onChange={handleSelectUf}>
                                        <option value="0">Selecione uma UF</option>
                                        {
                                        ufs.map(uf => (
                                            <option key={uf}
                                                value={uf}>
                                                {uf}</option>
                                        ))
                                    } </select>
                                </div>
                                <div className="field">
                                    <label htmlFor="city">Cidade</label>
                                    <select name="city" id="city"
                                        value={selectedCity}
                                        onChange={handleSelectCity}>
                                        <option value="0">Selecione uma cidade</option>
                                        {
                                        cities.map(city => (
                                            <option key={city}
                                                value={city}>
                                                {city}</option>
                                        ))
                                    } 
                                    </select>
                                </div>
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
