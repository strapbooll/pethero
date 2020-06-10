import React from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';

const Header: React.FC = () => {
  return(
    <header className="header">
        <img src={logo}
            alt="pethero"/>
    </header>
  );
}

export default Header;