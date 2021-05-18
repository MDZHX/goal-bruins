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
        <ul className="app-header-icon-group">
          <li>
            <IconButton icon={"fas fa-bookmark"} />
          </li>
          <li>
            <IconButton icon={"fas fa-bell"} />
          </li>
          <li>
            <IconButton icon={"fas fa-user-circle"} />
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Nav;
