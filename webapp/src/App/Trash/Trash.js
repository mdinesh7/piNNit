import React from 'react';
import './Trash.scss';
import { Trashnotes } from "../Trashnotes/Trashnotes";

export class Trash extends React.Component {
  // Constructor and State Defined
  constructor(props){
      super(props);
      this.state = {
          trashcollections: []
        };
  }

  // Getting data from Trash Collection DB 
  componentDidMount() {
      const toJson = (response) => response.json();
      const loadData = (config) => {
        fetch(config.trash_api_url)
          .then(toJson)
          .then((trashcollections) => this.setState({ trashcollections }));
      };
      fetch('config/config.json').then(toJson).then(loadData);
    }
  
  render(){
      // Display Trash Notes using the Trashnotes Component
      return (
      <div className="content-div-trash">
          <Trashnotes trashcollections={this.state.trashcollections}></Trashnotes>
      </div>
      );
  }
}