import React, { useState, useRef } from 'react';
import './SteeringWheel.css';

function SteeringWheel({ onSteer, range }) {
  const [angle, setAngle] = useState(0);
  const wheelRef = useRef(null);

  const handleTouchStart = (e) => {
    const wheel = wheelRef.current;
    const rect = wheel.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const dx = touch.clientX - centerX;
      const dy = touch.clientY - centerY;
      let newAngle = Math.atan2(dy, dx) * (180 / Math.PI);

      // Adjust the angle to make -90 degrees the new 0 degrees
      newAngle += 90;

      // Clamp the newAngle within the range
      if (newAngle > range) {
        newAngle = range;
      } else if (newAngle < -range) {
        newAngle = -range;
      }

      setAngle(newAngle);
      onSteer(newAngle);
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div className="steering-wheel-container">
      <svg
        ref={wheelRef}
        className="steering-wheel"
        onTouchStart={handleTouchStart}
        style={{ transform: `rotate(${angle}deg)` }}
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="5" fill="none" />
        <line x1="50" y1="5" x2="50" y2="95" stroke="black" strokeWidth="5" />
        <line x1="5" y1="50" x2="95" y2="50" stroke="black" strokeWidth="5" />
      </svg>
    </div>
  );
}

export default SteeringWheel;