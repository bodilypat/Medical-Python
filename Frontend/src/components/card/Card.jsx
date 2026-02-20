//src/components/card/Card.jsx 

import React from 'react';
import './card.css';

function Card({ title, value, icon, bgColor }) {
  return (
    <div className="card" style={{ backgroundColor: bgColor }}>
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-value">{value}</p>
    </div>
  );
};

export default Card;

