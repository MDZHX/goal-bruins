import React from 'react';
import './App.css';

import Nav from './components/Nav/Nav'
import Goal from './components/Goal/Goal'

function App(props) {
  return (
  <>
    <div class="Discover">
      <Nav />
    </div>
    <div class="goals">
      <Goal/>
    </div>
    
  </>
  );
}

export default App;
