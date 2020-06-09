import React from 'react';
import {FiLogIn} from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import {Link} from 'react-router-dom';
import './styles.css';
const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo}
                        alt="pethero"/>
                </header>
                <main>
                    <div className="leftside">
                        <h1>
                            Ame um pet
                        </h1>
                        <p>
                            Encontre amigos ansiosos para ter um lar. Um amigo para chamar de seu
                        </p>
                        <Link to="/login">
                            <span>
                                <FiLogIn/>
                            </span>
                            <strong>Cadastre um pet</strong>
                        </Link>
                    </div>
                    <div className="rightside">
                        
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Home;
