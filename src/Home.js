import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');

  const handleGameIdInputChange = (event) => {
    setGameId(event.target.value);
  }

  const handlePlayerNameInputChange = (event) => {
    setPlayerName(event.target.value);
  }
  
  const joinGame = () => {
    if (gameId && playerName) {
      const playerId = playerName.toLowerCase().replace(/\s/g, '-');
      navigate(`/game/${gameId}/${playerId}`);
    }
  }

  return (
    <div className='container'>
      <p className='explanation'>Join a Game!</p>
      <div className='container'>
        <label className='gameIdLabel' htmlFor='gameIdInput'>Game ID:</label>
        <input
            type='text'
            id='gameIdInput'
            maxLength='4'
            onChange={handleGameIdInputChange}
          />
        <label className='playerNameLabel' htmlFor='playerNameInput'>Name:</label>
        <input
            type='text'
            id='playerNameInput'
            maxLength='16'
            onChange={handlePlayerNameInputChange}
          />
      </div>
      <button 
        className='join-game-button'
        onClick={ joinGame }>
          Join Game
      </button>
    </div>
  );
}

export default Home;
