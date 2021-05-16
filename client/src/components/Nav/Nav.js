import React from 'react';

import Button from '../Button/Button';
import LogoButton from '../LogoButton/LogoButton';
import IconButton from '../IconButton/IconButton';
import Search from '../Search/Search';

import './Nav.css';

function Nav(props) {
  return (
    <header className="app-header">
      <div className="app-header-container">
        <div className="app-header-logo">
          <LogoButton logo={"./logo192.png"} alt={"logo"} text={"Goal Bruins"} />
        </div>
        <nav className="app-header-nav">
          <div className="button-group">
            <Button>My Goals</Button>
            <Button>Discover</Button>
          </div>

          <div className="search-bar">
            <Search />
          </div>
        </nav>
        <div className="app-header-icon-group">
            <IconButton icon={"fas fa-bookmark"} />
            <IconButton icon={"fas fa-bell"} />
            <IconButton icon={"fas fa-user-circle"} />
        </div>
      </div>
    </header>
  );
}

export default Nav;
