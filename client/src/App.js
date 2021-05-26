import React from 'react';

import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import MyGoals from './pages/MyGoals/MyGoals';
import Discover from './pages/Discover/Discover';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path ="/discover" component={Discover}/> 
          <Route path="/mygoals" component={MyGoals}/>
          <Route path ="/signup" component={Signup}/> 
          <Route path ="/login" component={Login}/> 
          <Route path ="/" component={Discover}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
