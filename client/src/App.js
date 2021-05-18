import React, { useState } from 'react';
import './App.css';

import Nav from './components/Nav/Nav';
import Goal from './components/Goal/Goal';
import Login from './components/Login/Login'
const data = [
  {
    "id": 1,
    "name": "Learn React",
    "desc": "React is fun",
  },
  {
    "id": 2,
    "name": "Learn Node",
    "desc": "Node is fun",
  },
  {
    "id": 3,
    "name": "Learn Express",
    "desc": "Express is fun",
  },
  {
    "id": 4,
    "name": "Learn MongoDB",
    "desc": "MongoDB is fun",
  },
  {
    "id": 5,
    "name": "Learn HTML",
    "desc": "HTML is fun",
  },
  {
    "id": 6,
    "name": "Learn CSS",
    "desc": "CSS is fun",
  },
  {
    "id": 7,
    "name": "Learn HTTP",
    "desc": "HTTP is fun",
  },
  {
    "id": 8,
    "name": "Learn async",
    "desc": "Async is fun",
  },
  {
    "id": 9,
    "name": "Learn FP",
    "desc": "FP is fun",
  },
]

function App() {
  const [goals, setGoals] = useState(data);

  return (
    <>
      {/* <div className="App">
        <Nav />
        <div className="goals">
          {goals.map((goal) => <Goal key={goal.id} name={goal.name} desc={goal.desc} />)}
        </div>
      </div> */}
      <Login/>
    </>
  );
}

export default App;
