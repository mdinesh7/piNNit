import React from 'react';
import './Archive.scss';
import { Archivenotes } from "../Archivenotes/Archivenotes";

export class Archive extends React.Component {
  //constructor defined
  constructor(props) {
    super(props);
    this.state = {
      archivecollections: [],
    };
  }
 //Getting the data from Server
  componentDidMount() {
    const toJson = (response) => response.json();
    const loadData = (config) => {
      fetch(config.archive_api_url)
        .then(toJson)
        .then((archivecollections) => this.setState({ archivecollections }));
    };

    fetch("config/config.json").then(toJson).then(loadData);
  }
  //Rendering elements
  render() {
    return (
      <div className="content-div-archive">
        <Archivenotes
          archivecollections={this.state.archivecollections}
        ></Archivenotes>
      </div>
    );
  }
}