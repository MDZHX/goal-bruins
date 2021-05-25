import React, { useState } from 'react';
import Goal from '../Goal/Goal';
import Nav from '../Nav/Nav';
import axios from 'axios';

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

function dummy(){
  axios.get('http://localhost:5000/')
  .then(Response=>console.log(Response));
}

function Main(){
    const [goals, setGoals] = useState(data);

    //Todo: deleteGoal Method is complemeted, need to add this function to onClick
    const deleteGoal = (id)=>{
        setGoals(goals.filter((goal)=>goal.id !==id))
    }

    return(
        <>
            <Nav/>
            <div className="goals">
                {goals.map((goal) => <Goal key={goal.id} name={goal.name} desc={goal.desc} onDelete={deleteGoal}/>)}
            </div>
            <button onClick={dummy}>
              dummy
            </button>
        </>

    )
}

export default Main;