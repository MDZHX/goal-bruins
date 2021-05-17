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
          {/* TODO: Change logo source */}
          <LogoButton logo={"./logo192.png"} alt={"logo"} text={"Goal Bruins"} />
        </div>
        <nav className="app-header-nav">
          <ul className="button-group">
            <li>
              <Button>My Goals</Button>
            </li>
            <li>
              <Button>Discover</Button>
            </li>
          </ul>

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
