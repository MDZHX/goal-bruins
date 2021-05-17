import React from 'react';
import{useState} from 'react'
import "./Goal.css"

class LikeButton extends React.Component {
    constructor() {
      super();
      this.state = {
        liked: false
      };
      this.handleClick = this.handleClick.bind(this);
    } 
    
    handleClick() {
      this.setState({
        liked: !this.state.liked
      });
    }
    
    render() {
      const label = this.state.liked ? 'Unlike' : 'Like'
      return (
        <div className="customContainer">
          <button className="btn btn-primary" onClick={this.handleClick}>
            {label}</button>
        </div>
      );
    }
  }


function Goal(props){
    return <div className="single-goal">
        <div>
            <div>
                <h3>{props.title}this is title</h3>
            </div>

            <ul className="interactive-elements">

                <div className="likes">
                    {/* {props.likesCount+" "} */}
                    100
                </div>

                <LikeButton />

                <a href="https://www.youtube.com/">
                    Comments
                    {/* todo: need to add return in the jump page */}
                </a>
            </ul>
        </div>
        <button>
            +
        </button>

    </div>
};

export default Goal