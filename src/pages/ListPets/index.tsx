import React, {useState, useEffect} from 'react';
import { FaDog, FaCat, FaDragon } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import './styles.css';
import ListPet from '../../components/ListPets';
import Header from '../../components/Header';


const ListPets = () => {
    const [category, setCategory] = useState('');

    useEffect(()=>{
        console.log(category);
    }, [category]);

    function handleCategory(categories: string) {            
        setCategory(categories);
    }

    return (
        <div id="page-content">
            <Header />
            <div className="nav">
                <span>Adote um amigo</span>               
                <Link to="/register-pet"><FaDragon />Cadastrar um amigo</Link>
            </div>
            <div className="pet-cards">
                <fieldset>
                    <legend>
                        <h2>
                            Categoria
                        </h2>
                        <ul className="category-grid">
                            <li 
                            onClick={()=>{handleCategory('Cachorro')}}
                            className={category.includes('Cachorro') ? 'selected' : ''} 
                            >     
                                <FaDog size={65} />                      
                                <span >Cachorro</span>
                            </li>
                            <li 
                            onClick={()=>{handleCategory('Gato')}}
                            className={category.includes('Gato') ? 'selected' : ''}
                            >          
                                <FaCat size={60} />                 
                                <span >Gato</span>
                            </li>
                        </ul>
                    </legend>
                    <ListPet category={category} />
                </fieldset>
            </div>
        </div>
    );
}

export default ListPets;
