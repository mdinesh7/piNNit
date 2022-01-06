import React from 'react';
import './Navbar.scss';


export class Navbar extends React.Component {

    constructor(props){
        super(props);
    }

    
    render(){
        return (
        // Navbar Div with Title
        <div className="navbar-style">
            <span>
              
                <img alt="main-logo" className="custom-logo" src="assets/logo.png"/>
                
              
            </span>
            <h2 className="title">piNNit</h2>
        </div>
        );
    }
}