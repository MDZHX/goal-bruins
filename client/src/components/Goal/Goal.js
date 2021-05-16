import React from 'react';
import{useState} from 'react'
import "./Goal.css"




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
                <div className="icons">
                <i class="far fa-heart"></i>
                    
                    
                </div>
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