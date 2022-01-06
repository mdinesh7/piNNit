// Importing all the necessary packages

import React from 'react';
import './Complete.scss';
import { Completednotes } from "../Completednotes/Completednotes";

export class Complete extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            completecollections: []
          };
    }

    // Getting data from Complete Collection DB
    componentDidMount() {
        const toJson = (response) => response.json();
        const loadData = (config) => {
          fetch(config.complete_api_url)
            .then(toJson)
            .then((completecollections) => this.setState({ completecollections }));
        };
    
        fetch('config/config.json').then(toJson).then(loadData);
      }
    
    // Displaying Complete Notes using the Completenotes Component
    render(){
        return (
        <div className="content-div-complete">
            <Completednotes completecollections={this.state.completecollections}></Completednotes>
        </div>
        );
    }
}