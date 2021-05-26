import React from 'react';

import '../Button/Button.css';

function SubmitButton(props) {
  return (
    // TODO: fix button padding issue
    <button type="submit" className="button-base">
      {props.children}
    </button>
  );
}

export default SubmitButton;
