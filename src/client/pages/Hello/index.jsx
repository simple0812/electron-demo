import React from 'react';
import { Link } from 'react-router-dom';

const Hello = () => {
  return (
    <div>
      <div className="Hello">Hello</div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <Link to="/home">home</Link>
        <Link to="/about">about</Link>
      </div>
    </div>
  );
};

export default Hello;
