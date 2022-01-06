import React from "react";
import "./Archivenotes.scss";
import swal from 'sweetalert';

export class Archivenotes extends React.Component {
  //constructor defined
  constructor(props) {
    super(props);
    this.state = {
      taskcollectionsList: [],
      title: "",
      description: "",
      background:""
    };
    //handler bind 
    this.changeHandlerArchiveDelete = this.changeHandlerArchiveDelete.bind(this);
    this.changeHandlerUnarchive = this.changeHandlerUnarchive.bind(this);
  }
  //Function for deleting archive notes
  changeHandlerArchiveDelete = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //Function for unarchiving to Main page from Archive Page
  changeHandlerUnarchive = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Gets data from archivecollections to send to trashcollections
  // and Deletes data from archivecollections 
  deleteArchiveHandler = (id) => {
    fetch(`http://localhost:3003/archivecollections/${id}`, {
      method: "GET"
    })
    .then(
      res => res.json()
    )
    .then(
      data => this.setState({
        "title": data["title"],
        "description": data["description"],
        "background": data["background"]
      })
    );
  
  fetch(`http://localhost:3003/archivecollections/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      this.submitHandlerArchiveTrash();
    });

    console.log(this.state);
};

// Unarchive the notes to notes home page
unarchiveHandler = (id) => {
  fetch(`http://localhost:3003/archivecollections/${id}`, {
    method: "GET"
  })
  .then(
    res => res.json()
  )
  .then(
    data => this.setState({
      "title": data["title"],
      "description": data["description"],
      "background": data["background"]
    })
  );

fetch(`http://localhost:3003/archivecollections/${id}`, {
  method: "DELETE",
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    this.submitHandlerUnarchive();
  });

  console.log(this.state);
};

//posting in trash
submitHandlerArchiveTrash = (element) => {

fetch("http://localhost:3003/trashcollections", {
  method: "POST",
  mode: 'cors',
  headers: { "Content-Type": "application/json" },

  body: JSON.stringify({
    "title": this.state.title,
    "description": this.state.description,
    "background": this.state.background
  }),
})
  .then((response) => {
    response.json();
    
  })
  .then((data) => {
    swal({
      title: "Oh No !!",
      text: "Your Note has been moved to Trash !!!",
      icon: "warning",
      timer: 4000
      })
      .then((willDelete) => {
        window.location.reload();
      })
    console.log("Successfully Deleted Note");
  })
  .catch((error) => alert("Error Submitting the Input data: ", error));
};

//Used in Unarchiving notes in order to post it to the notes home page
submitHandlerUnarchive = (element) => {

  fetch("http://localhost:3003/taskcollections", {
    method: "POST",
    mode: 'cors',
    headers: { "Content-Type": "application/json" },
  
    body: JSON.stringify({
      "title": this.state.title,
      "description": this.state.description,
      "background": this.state.background
    }),
  })
    .then((response) => {
      response.json();
      
    })
    .then((data) => {
      swal({
        title: "Unarchive Successfull !!!",
        text: "Your Note is back at Home",
        icon: "success",
        timer: 4000
        })
        .then((willDelete) => {
          window.location.reload();
        })
      console.log("Successfully Unarchived");
    })
    .catch((error) => alert("Error Submitting the Input data: ", error));
  };
//Rendering elements
  render() {
    const archiveElements = this.props.archivecollections.map((c, i) => (
      //total archive task div
      <div className="archive-tasks-div"  style={{ backgroundColor: `${c.background}` }}>
        {/* title div for archive notes */}
        <div className="archive-task-title-div">
          <h3 className="archive-task-title">{c.title}</h3>
        </div>
        {/* description div for archive notes */}
        <div className="archive-task-desc-div">
          <span className="archive-task-desc">{c.description}</span>
        </div>
        {/* buttons div for archive notes */}
        <div className="archive-task-buttons"  style={{ backgroundColor: `${c.background}` }}>
          <button className="archive-buttons-pos" title="Unarchive" onChange={this.changeHandlerUnarchive}
            onClick={() => this.unarchiveHandler(c._id)}>
            <img
              alt="unarchive"
              className="unarchive-btn"
              src="assets/unarchive.png"
            />
          </button>
        {/* title div for archive notes */}
          <button
            className="archive-buttons-pos" title="Delete"
            onChange={this.changeHandlerArchiveDelete}
            onClick={() => this.deleteArchiveHandler(c._id)}
          >
            <img
              alt="trash_icon"
              className="archive-trash-btn"
              src="assets/trash-icon.png"
            />
          </button>
        </div>
      </div>
    ));
    //archive lists styling
    return <div className="archive-list-styling">{archiveElements}</div>;
  }
}
