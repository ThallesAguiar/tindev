import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import itsamatche from '../assets/itsamatch.png';

export default function Main({ match }) {

  const [users, setUsers] = useState([]);
  const [matche, setMatche] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users', {
        headers: {
          user: match.params.id
        }
      });

      setUsers(response.data);
    }

    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: match.params.id }
    });

    socket.on('match', user => {
      setMatche(user);
    });
  }, [match.params.id]);

  async function handleLike(id) {
    await api.post(`/users/${id}/likes`, null, {
      headers: { user: match.params.id },
    });

    setUsers(users.filter(user => user._id !== id));

  }

  async function handleDislike(id) {
    await api.post(`/users/${id}/dislikes`, null, {
      headers: { user: match.params.id },
    });

    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Social Mate" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt="" />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="Dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
          <div className="empty">
            Acabou a procura de pessoas próximas a você.
            <br />
            Aumente o seu alcance de procura para encontrar novos usuarios.
         </div>
        )}


      {matche && (
        <div className="matche-container">
          <img src={itsamatche} alt="It's a matchê" />

          <img className="avatar" src={matche.avatar} alt="" />
          <strong>{matche.name}</strong>
          <p>{matche.bio}</p>

          <button type="button" onClick={() => setMatche(null)}>Fechar</button>
        </div>
      )}
    </div>
  );

}