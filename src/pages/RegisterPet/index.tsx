import React, {useState, ChangeEvent, FormEvent} from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';
import './styles.css';

const RegisterPet = () => {
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState < File > ();
    const [size, setSize] = useState('0');
    const [category, setCategory] = useState('0');
    const [genre, setGenre] = useState('0');
    const [history, setHistory] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);

    const route = useHistory();


    function handleName(event : ChangeEvent < HTMLInputElement >) {
        setName(event.target.value);
    }

    function handleAge(event : ChangeEvent < HTMLInputElement >) {
        const age = Number(event.target.value);
        if(age >= 0){
            setAge(age);
        }        
    }

    function handleSize(event : ChangeEvent < HTMLSelectElement >) {
        setSize(event.target.value);
    }

    function handleCategory(event : ChangeEvent < HTMLSelectElement >) {
        setCategory(event.target.value);
    }

    function handleGenre(event : ChangeEvent < HTMLSelectElement >) {
        setGenre(event.target.value);
    }

    function handleHistory(event : ChangeEvent < HTMLTextAreaElement >) {
        setHistory(event.target.value);
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const data = new FormData();

        data.append('name', name);
        data.append('category', category);
        data.append('age', String(age));
        data.append('size', size);
        data.append('genre', genre);
        data.append('history', history);    
        data.append('status', String('0'));
        data.append('user_id', String(sessionStorage.getItem('user_id'))); 

        if (selectedFile) {
            data.append('image', selectedFile);
        }
        else{
            setMessage('Escolha uma imagem');
            return
        }

        if(category === '0' || size === '0' || genre === '0'){
            setMessage('Preencha todos os campos');
            return
        }

        await api.post('/pets', data);

        alert('Pet cadastrado');

        route.push('/list-pets');
    }

    return (
        <div id="page-content">
            <Header/>
            
            <form onSubmit={handleSubmit}>                            
                <fieldset>
                    {
                        message && <div className="message-error">{message}</div>
                    }   
                    <h2>Dados</h2>
                    <Dropzone onFileUploaded={setSelectedFile}/>
                    <div className="field">
                        <label htmlFor="name">Nome do Pet</label>
                        <input 
                        type="text" 
                        name="name" 
                        id="name"
                        onChange={handleName}
                        required
                        />
                    </div>

                    <div className="field-group"> 
                        <div className="field">
                            <label htmlFor="category">Categoria</label>
                            <select 
                            name="category" 
                            id="category"
                            value={category}
                            onChange={handleCategory}
                            required
                            >       
                                <option value="0">Selecione a categoria</option>                    
                                <option value="Cachorro">Cachorro</option>
                                <option value="Gato">Gato</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="age">Idade</label>
                            <input 
                            type="number" 
                            name="age" 
                            id="age"
                            value={age}
                            onChange={handleAge}
                            required
                            />
                        </div>
                    </div>

                    <div className="field-group">                       
                        <div className="field">
                            <label htmlFor="size">Porte</label>
                            <select 
                            name="size" 
                            id="size"
                            value={size}
                            onChange={handleSize}
                            required
                            >         
                                <option value="0">Selecione o porte</option>                 
                                <option value="Pequeno">Pequeno</option>
                                <option value="Médio">Médio</option>
                                <option value="Grande">Grande</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="genre">Categoria</label>
                            <select 
                            name="genre" 
                            id="genre"
                            value={genre}
                            onChange={handleGenre}
                            required
                            >           
                                <option value="0">Selecione o sexo</option>                
                                <option value="Macho">Macho</option>
                                <option value="Fêmea">Fêmea</option>
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="history">História</label>
                        <textarea 
                        name="history" 
                        id="history"  
                        value={history}   
                        onChange={handleHistory}      
                        required             
                        />
                    </div>
                    <button type="submit"><strong>Cadastrar pet</strong></button>
                </fieldset>                
            </form>                     
        </div>
    );
}

export default RegisterPet;
