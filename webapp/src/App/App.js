import React from "react";
import "./App.scss";
import { Navbar } from "./Navbar/Navbar";
import { Home } from "./Home/Home";
import { Archive } from "./Archive/Archive";
import { Trash } from "./Trash/Trash";
import { Complete } from "./Complete/Complete";
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

// Exporting App Component
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskcollections: [],
    };
  }
  


  //Getting the data from Server
  componentDidMount() {
    const toJson = (response) => response.json();
    const loadData = (config) => {
      fetch(config.tasks_api_url)
        .then(toJson)
        .then((taskcollections) => this.setState({ taskcollections }));
    };

    fetch("config/config.json").then(toJson).then(loadData);
  }

  render() {
    return (
      // Router for the Navigation
      <Router>
        <div className="app-container">
          {/* Navbar Components */}
          <Navbar></Navbar>
          {/* Sidepanel Buttons */}
          <div className="sidepanel-style">
            {/* Notes Home NavLink */}
            <span className="button-span">
              <NavLink exact className={({ isActive }) => "button" + (isActive ? " activated" : "")} to="/">
                <img alt="notes" className="icon-notes" src="assets/sticky-notes.png"/>
                <p className="button-text">Notes</p>
              </NavLink>
            </span>
            {/* Completed Items NavLink */}
            <span>
              <NavLink exact className={({ isActive }) => "button" + (isActive ? " activated" : "")} to="/completed">
                <img alt="remainder" className="icon-styles" src="assets/checked.png"/>
                <p className="button-text">Completed</p>
              </NavLink>
            </span>
             {/* Archive NavLink */}
            <span>
              <NavLink exact className={({ isActive }) => "button" + (isActive ? " activated" : "")} to="/archive">
                <img alt="archive" className="icon-styles" src="assets/archive-icon.png"/>
                <p className="button-text">Archive</p>
              </NavLink>
            </span>
             {/* Trash NavLink */}
            <span>
              <NavLink exact className={({ isActive }) => "button" + (isActive ? " activated" : "")} to="/trash">
                <img alt="trash" className="icon-trash" src="assets/trash-icon.png"/>
                <p className="button-text">Trash</p>
              </NavLink>
            </span>
          </div>
          {/* Routes for Navigation */}
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/completed" element={<Complete />}></Route>
            <Route exact path="/archive" element={<Archive />}></Route>
            <Route exact path="/trash" element={<Trash />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}
