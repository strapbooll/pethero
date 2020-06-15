import React,{useEffect, useState} from 'react';
import { FaDoorOpen } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg';

const Header: React.FC = () => {
  const[autheticated, setAutheticated] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('token'))
      setAutheticated(true);  
    else  
      setAutheticated(false);  
  }, [autheticated]);
  
  return(
    <header className="header">
        <img src={logo}
            alt="pethero"/>
        {autheticated && (
        <span><Link to="/"><FaDoorOpen size={24} />Logout</Link></span>
        )}
    </header>
  );
}

export default Header;