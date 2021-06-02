import React, { useEffect, useState } from 'react';

import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import MyGoals from './pages/MyGoals/MyGoals';
import Discover from './pages/Discover/Discover';
import Search from './pages/Search/Search'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';
import axios from 'axios';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(()=>{
    if (window.location.href !== "http://localhost:3000/signup" &&
    window.location.href !== "http://localhost:3000/login" &&
    window.location.href !== "http://localhost:3000/" &&
    !localStorage.getItem('token')){
      alert("You are not Logged in! Redirecting...");
      window.location='/signup';
    }
  });

  const fetchSearchResults = (searchWord) => {
    axios
    .post('http://localhost:5000/user/search-page', { jwt_token: JSON.parse(localStorage.getItem("token")), keyword: searchWord })
    .then((results) => {
      console.log(results);
      setSearchResults(results.data);
    })
    .catch((error) => {
      alert(error);
    })
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path ="/discover" render={(props) => <Discover {...props} fetchSearchResults={fetchSearchResults} />} /> 
          <Route path="/mygoals" render={(props) => <MyGoals {...props} fetchSearchResults={fetchSearchResults} />} />
          <Route path ="/signup" component={Signup} /> 
          <Route path ="/login" component={Login} /> 
          <Route path ="/search" render={(props) => <Search {...props} searchResults={searchResults} fetchSearchResults={fetchSearchResults} />} /> 
          <Route path ="/" component={Signup}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
