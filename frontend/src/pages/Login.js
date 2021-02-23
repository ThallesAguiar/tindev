import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';
import logo from '../assets/logo.svg';

export default function Login({history}) {
    const [username, setUsername] = useState('');
    
    //"e" significa que eh um evento
    async function handleSubmit(e) {
        e.preventDefault();
        
        const response = await api.post('/users', {
            username,
        });

        const {_id} = response.data;

        //Direcionar
        history.push(`/user/${_id}`);
    }
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="SocialMate" />
                <input
                    placeholder="Digite seu usuario."
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Acessar</button>
            </form>
        </div>
    );
}
