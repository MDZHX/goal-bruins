import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button/Button';
import LogoButton from '../LogoButton/LogoButton';
import IconButton from '../IconButton/IconButton';
import SearchBar from '../SearchBar/SearchBar';

import './Nav.css';

function Nav({ fetchSearchResults }) {
  return (
    <header className="app-header">
      <div className="app-header-container">
        <div className="app-header-logo">
          {/* TODO: Change logo source */}
          <Link to="/discover" style={{ textDecoration: 'none' }}>
            <LogoButton logo={"./logo192.png"} alt={"logo"} text={"Goal Bruins"} />
          </Link>
        </div>
        <nav className="app-header-nav">
          <ul className="button-group">
            <Link to="/mygoals" style={{ textDecoration: 'none' }}>
               <li>
                 <Button>My Goals</Button>
               </li>
            </Link>
            <Link to="/discover" style={{ textDecoration: 'none' }}>
              <li>
                <Button>Discover</Button>
              </li>
            </Link>
          </ul>

          <div className="search-bar">
            <SearchBar fetchSearchResults={fetchSearchResults} />
          </div>
        </nav>
        <ul className="app-header-icon-group">

          <li className="user-name">
            Hello! {localStorage.getItem("username")}
          </li>
          <li>
            <IconButton icon={"fas fa-power-off"} onClick={()=>{
              localStorage.clear();
              alert("Logging you out! Redirecting...");
              window.location='/signup';
            }}/>
            {/* // <button onClick={()=>{
            //   localStorage.removeItem('token');
            //   alert("Logging you out! Redirecting...");
            //   window.location='/signup';
            // }}>logout</button> */}
          </li>
          
        </ul>
      </div>
    </header>
  );
}

export default Nav;
