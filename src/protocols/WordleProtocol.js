import React, { useState, useRef } from 'react';
import MultiButtonProtocol from './MultiButtonProtocol';
import './WordleProtocol.css';

function WordleProtocol({ sendGameAction, protocol }) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  var wordleLength = protocol.length

  const handleChange = (event) => {
    const value = event.target.value.toUpperCase();
    if (new RegExp(`^[A-Z0-9]{0,${wordleLength}}$`).test(value)) {
      setInputValue(value);
    }
  };

  const handleBoxClick = () => {
    inputRef.current.focus();
  };

  const handleSubmit = () => {
    if (inputValue.length === wordleLength) {
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
          maxLength={wordleLength}
          value={inputValue}
          onChange={handleChange}
          ref={inputRef}
          className="wordle-hidden-input"
        />
      </div>
      <div className="wordle-boxes-container" onClick={handleBoxClick}>
        {Array.from({ length: wordleLength }).map((_, index) => (
          <div key={index} className="wordle-box">
            {inputValue[index] || ''}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="wordle-submit-button">
        Submit
      </button>
      <MultiButtonProtocol
        sendGameAction={sendGameAction}
        protocol={protocol.controllerProtocol}
      />
    </div>
  );
}

export default WordleProtocol;