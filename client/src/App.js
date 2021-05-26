import React, { useEffect, useState } from 'react';
import './App.css';

import Nav from './components/Nav/Nav';
import Goal from './components/Goal/Goal';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Main from './components/Main/Main';
//import Discover from './Discover/Discover';
import MyGoal from './components/MyGoal/MyGoal.js'
import MyGoalOptionBar from './components/MyGoal/MyGoalOptionBar.js'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from 'axios'


function App() {
const [personalGoals, setPersonalGoals]=useState([]);
useEffect(async ()=>{
  //console.log("START!")
  const result = await axios
  .get('http://localhost:5000/goal/all-goals');

   setPersonalGoals(result.data);
   //console.log(result.data);
  },[]);

const [displayOption,setDisplayOption]=useState([false,false]);//first option: archieved, second: today


//op:0 to set Goals, 1 to set display option (archived?Today?All?)
function setPersonalGoal(op,newVal){ 
  if(op===0){
    const diff = newVal.filter(item=>!personalGoals.includes(item));
    console.log(diff.length);
    if(diff.length >0)
    {
      for(var i =0; i<diff.length; i++){
        console.log("NEW POSTING:",diff[i].name,diff[i].description);
        axios.post('http://localhost:5000/goal/add-goal', {name:diff[i].name,description:diff[i].description});
      }
    }
    console.log(newVal)
    setPersonalGoals(newVal);
  }
  else
    setDisplayOption(newVal);
}

const personalGoalList = personalGoals.map((goal)=>{
                                          if(!displayOption[0])
                                          {
                                          return (<MyGoal 
                                          id={goal.id}
                                           
                                          name={goal.name} 
                                          description={goal.description} 
                                          onChange={setPersonalGoal}
                                          data = {personalGoals}>
                                           </MyGoal>);
                                          }

                                          else if(displayOption[0]) 
                                          {
                                          return (<MyGoal 
                                            id={goal.id}
                                            name={goal.name} 
                                            description={goal.description} 
                                            onChange={setPersonalGoal}
                                            data = {personalGoals}>
                                             </MyGoal>);
                                          }
                                        });

//This is the component for My Goal page
const myGoalPage=()=>{
  return (
  <>
    <Nav></Nav>
    <MyGoalOptionBar data={personalGoals} onChange={setPersonalGoal}></MyGoalOptionBar>
    <div>
      {personalGoalList}
    </div>
  </>
  );};
  
  return (
    <Router>
        <div className="App">

        <switch>
              <Route path ="/"  exact component={Main}/> 
              <Route path ="/all-goals"  exact component={Main}/> 
              <Route path ="/signup" component={Signup}/> 
              <Route path ="/login" component={Login}/> 
              <Route path="/mygoals" component={myGoalPage}/>
            
          </switch>
        </div>
    </Router>
  );
}

export default App;
