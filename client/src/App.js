import React from 'react';
import './App.css';

import Nav from './components/Nav/Nav';
import Goal from './components/Goal/Goal';

function App(props) {
  return (
    <>
      <div className="App">
        <Nav />
        <div className="goals">
          <Goal/>
        </div>
      </div>
    </>
  );
}

export default App;
