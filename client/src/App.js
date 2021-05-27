import React, {useEffect} from 'react';

import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import MyGoals from './pages/MyGoals/MyGoals';
import Discover from './pages/Discover/Discover';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';

function App() {
  useEffect(()=>{
    if (window.location.href !== "http://localhost:3000/signup"&&
    window.location.href !== "http://localhost:3000/login"&&
    window.location.href !== "http://localhost:3000/"&&
    !localStorage.getItem('token')){
      alert("You are not Logged in! Redirecting...");
      window.location='/signup';
    }
  })

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path ="/discover" component={Discover}/> 
          <Route path="/mygoals" component={MyGoals}/>
          <Route path ="/signup" component={Signup}/> 
          <Route path ="/login" component={Login}/> 
          <Route path ="/" component={Signup}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
