import React from 'react';
import './Button.css';

function Button(props) {
  return (
    // TODO: fix button padding issue
    <button className="button-base" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
