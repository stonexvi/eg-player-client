import React, { useState, useRef } from 'react';
import './WordleProtocol.css';

function WordleProtocol({ sendGameAction, protocol }) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const value = event.target.value.toUpperCase();
    if (/^[A-Z]{0,6}$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleBoxClick = () => {
    inputRef.current.focus();
  };

  const handleSubmit = () => {
    if (inputValue.length === 6) {
      sendGameAction(protocol.characterId, {
        type: 'GUESS_WORDLE',
        puzzleId: protocol.puzzleId,
        guess: inputValue,
      });
    }
  };

  return (
    <div className="wordle-protocol-container">
      <div className="wordle-input-container">
        <input
          type="text"
          maxLength="6"
          value={inputValue}
          onChange={handleChange}
          ref={inputRef}
          className="wordle-hidden-input"
        />
      </div>
      <div className="wordle-boxes-container" onClick={handleBoxClick}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="wordle-box">
            {inputValue[index] || ''}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="wordle-submit-button">
        Submit
      </button>
    </div>
  );
}

export default WordleProtocol;