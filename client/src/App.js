import React, { useState } from 'react';
import './App.css';

import Nav from './components/Nav/Nav';
import Goal from './components/Goal/Goal';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Main from './components/Main/Main';
//import MyGoals from './MyGoals/MyGoals';
//import Discover from './Discover/Discover';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';







function App() {
  
  
  return (
    // <>
    //   <div className="App">
    //     <Nav />
    //     <div className="goals">
    //       {goals.map((goal) => <Goal key={goal.id} name={goal.name} desc={goal.desc} />)}
    //     </div>
    //   </div>
    //   {/* <Login/> */}
    //   {/* <Signup/> */}

    // </>
    <Router>
        <div className="App">

        <switch>
              <Route path ="/"  exact component={Main}/> 
              <Route path ="/all-goals"  exact component={Main}/> 
              <Route path ="/signup" component={Signup}/> 
              <Route path ="/login" component={Login}/> 
              {/* 
                  <todo: this is placeholders for mygoals page>

              <Route path="/mygoals" component={mygoals}/>
              */}
            
          </switch>
        </div>
    </Router>
  );
}

export default App;
