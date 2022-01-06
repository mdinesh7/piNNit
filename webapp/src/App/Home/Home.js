import React from 'react';
import './Home.scss';
import { Addnote } from "../Addnote/Addnote";
import { Notes } from "../Notes/Notes";

export class Home extends React.Component {

  // Defining Task Collection State in Constructor
  constructor(props){
    super(props);
    this.state = {
        taskcollections: []
    };
  }

    // Getting data from Trash Collection DB 
    componentDidMount() {
        const toJson = (response) => response.json();
        const loadData = (config) => {
          fetch(config.tasks_api_url)
            .then(toJson)
            .then((taskcollections) => this.setState({ taskcollections }));
        };
        fetch('config/config.json').then(toJson).then(loadData);
      }
    
    render(){
        return (
        // Display Task Notes using the Notes Component
        <div className="content-div">
            {/* <Addnote></Addnote> */}
            <Notes taskcollections={this.state.taskcollections}></Notes>
        </div>
        );
    }
}