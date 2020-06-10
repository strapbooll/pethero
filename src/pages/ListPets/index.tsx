import React from 'react';
import './styles.css';
import ListPet from '../../components/ListPets';
import Header from '../../components/Header';


const ListPets = () => {
    return (
        <div id="page-create-pets">
            <Header />
            <div className="nav">
                <span>Adote</span>
            </div>
            <div className="pet-cards">
                <fieldset>
                    <legend>
                        <h2>
                            Pets
                        </h2>
                        <span>Selecione um pet abaixo</span>
                    </legend>
                    <ListPet/>
                </fieldset>
            </div>
        </div>
    );
}

export default ListPets;
