import React from 'react';
import Button from '../Button/Button';

function IconButton(props){
  return (
    <Button onClick={props.onClick}>
      <i className={props.icon}></i>
    </Button>
  );
}

export default IconButton;
