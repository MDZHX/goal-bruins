import React, { useState } from 'react';
import './App.css';

import Nav from './components/Nav/Nav';
import Goal from './components/Goal/Goal';
import Login from './components/Login/Login'
import Signup from './components/Login/Signup'
import MyGoal from './components/MyGoal/MyGoal.js'
import MyGoalOptionBar from './components/MyGoal/MyGoalOptionBar.js'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Button from './components/Button/Button';
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

const myData=[
  {
    "id":1,
    "name":"Exercise",
    "desc":"Nothing to do",  
    "archived":false,
  },
  {
    "id":2,
    "name":"Do Homework",
    "desc":"A lot",  
    "archived":false,
  },
  {
    "id":3,
    "name":"write Code",
    "desc":"for CS35L",  
    "archived":false,
  },
  {
    "id":4,
    "name":"Travel",
    "desc":"To where",  
    "archived":false,
  },
  {
    "id":5,
    "name":"Watch Film",
    "desc":"Mission Impossible",
    "archived":false,
  },
  {
    "id":6,
    "name":"Slacking off",
    "desc":"Sleep",
    "archived":false,
  }
]



function App() {
  const [goals,setGoals]=useState(data);
  const [personalGoals, setPersonalGoals]=useState(myData);
  const [displayOption,setDisplayOption]=useState([false,false]);//first option: archieved, second: today
  

 //op:0 to set Goals, 1 to set display option (archived?Today?All?)
 function setPersonalGoal(op,newVal){ 
    if(op===0)
      setPersonalGoals(newVal);
    else
      setDisplayOption(newVal);
 }

 const personalGoalList = personalGoals.map((goal)=>{
                                            if(!displayOption[0]&&goal["archived"]===false)
                                            return (<MyGoal 
                                            id={goal.id}
                                            name={goal.name} 
                                            desc={goal.desc} 
                                            onChange={setPersonalGoal}
                                            data = {personalGoals}>
                                             </MyGoal>);

                                            else if(displayOption[0]&&goal["archived"]) 
                                            return (<MyGoal 
                                              id={goal.id}
                                              name={goal.name} 
                                              desc={goal.desc} 
                                              onChange={setPersonalGoal}
                                              data = {personalGoals}>
                                               </MyGoal>);
                                            });

//This is the component for the main page
const goalPage =()=>{return(
  <>
    <div className="App">
      <div className="goals">
        {goals.map((goal) => <Goal key={goal.id} name={goal.name} desc={goal.desc} />)}
      </div>
    </div>
    {/* <Login/> */}
    {/* <Signup/> */}
  </>
);};


//This is the component for My Goal page
const myGoalPage=()=>{
      return (
      <>
        <MyGoalOptionBar data={personalGoals} onChange={setPersonalGoal}></MyGoalOptionBar>
        <div>
          {personalGoalList}
        </div>
      </>
      );};


                         
  return (
    <>
      <Router> 
        <Nav></Nav>
        <Switch>
        <Route path="/mygoal" component={myGoalPage}></Route>
        <Route path="/" component={goalPage}></Route>
        </Switch>
       </Router> 
    </>
  );
}

export default App;
