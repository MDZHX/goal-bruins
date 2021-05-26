import React from 'react';

import Button from '../Button/Button';

import './LogoButton.css';

function LogoButton(props) {
  return (
    <Button onClick={props.onClick}>
      <img className="logo" src={props.logo} alt={props.alt}></img>
      <span className="logo-text">{props.text}</span>
    </Button>
  );
}

export default LogoButton;
