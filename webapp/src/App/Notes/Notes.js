import React from "react";
import "./Notes.scss";
import swal from 'sweetalert'; 
import { Addnote } from '../Addnote/Addnote';

export class Notes extends React.Component {
  constructor(props) {
    super(props);
    // Defined States
    this.state = {
      taskcollectionsList: [],
      title: "",
      description: "",
      background:"",
      updatedData: ""
    };
    this.changeHandlerTrash = this.changeHandlerTrash.bind(this);
    this.changeHandlerArchive = this.changeHandlerArchive.bind(this);
    this.changeHandlerComplete = this.changeHandlerComplete.bind(this);
  }

  // Receive Props Function for Update
  componentWillReceiveProps = (newProps) => {                       // written for update functionality
    console.log("---this.props.taskcollections--", newProps.taskcollections);
    if (!!newProps?.taskcollections && newProps?.taskcollections?.length > 0) {
      this.setState(
        {
          taskcollectionsList: newProps.taskcollections, // Optional chaning and updated Ecma Script changes
        },
        () => {
          console.log("---taskcollectionsList ---", this.state.taskcollectionsList);
        }
      );
    }
  };

// Change Handlers for Delete, Archive and Complete
changeHandlerTrash = (e) => {
  this.setState({ [e.target.name]: e.target.value });
};

changeHandlerArchive = (e) => {
  this.setState({ [e.target.name]: e.target.value });
};

changeHandlerComplete = (e) => {
  this.setState({ [e.target.name]: e.target.value });
};

// Clearing the Updated data 
clearUpdatedData = () => {
  this.updateTaskcollectionsList('')
  fetch("http://localhost:3003/taskcollections")
  .then((response)=> response.json())
  .then((taskcollections)=>{
      this.setState({taskcollectionsList: taskcollections});
  });
}

// Update Collection Function
updateTaskcollectionsList = (updatedData) => {
  this.setState({
    updatedData: updatedData,
  });
};

// Delete Handler Function
deleteHandler = (id) => {
  
    fetch(`http://localhost:3003/taskcollections/${id}`, {
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
  
  fetch(`http://localhost:3003/taskcollections/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      this.submitHandlerTrash();
    });

    console.log(this.state);
};

// Archive Handler Function
archiveHandler = (id) => {
  fetch(`http://localhost:3003/taskcollections/${id}`, {
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

fetch(`http://localhost:3003/taskcollections/${id}`, {
  method: "DELETE",
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    this.submitHandlerArchive();
  });
  console.log(this.state);
};
  
 
// Compelte Handler Function
completeHandler = (id) => {
  
  fetch(`http://localhost:3003/taskcollections/${id}`, {
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

fetch(`http://localhost:3003/taskcollections/${id}`, {
  method: "DELETE",
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    this.submitHandlerComplete();
    

  });

  console.log(this.state);
};


// Posting in Trash
submitHandlerTrash = (element) => {
  
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
      console.log("Successfully created trash note");
      swal({
        title: "Oh No !!!",
        text: "Your Note is moved to Trash !!!",
        icon: "warning",
        timer: 5000
        })
        .then((willDelete) => {
          window.location.reload();
        })
        
    })
};

// Posting in Archive
submitHandlerArchive = (element) => {
  
  fetch("http://localhost:3003/archivecollections", {
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
      console.log("Successfully created archive note");
      swal({
        title: "Successfully Archived Note !!!",
        icon: "success",
        timer: 3000
        })
        .then((willDelete) => {
          window.location.reload();
        })
    })
};

// Posting in Completed
submitHandlerComplete = (element) => {
  
  fetch("http://localhost:3003/completecollections", {
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
      console.log("Successfully created trash note");
      swal({
        title: "Well Done !!!",
        text: "Your Note is moved to Completed !!!",
        icon: "success",
        timer: 5000
        })
        .then((willDelete) => {
          window.location.reload();
        })
        
    })
};
  
  render() {
    const taskElements = this.props.taskcollections.map((c, i) => (
      // Getting the Task Collection DB Data to Notes
      <div className="tasks-div" style={{ backgroundColor: `${c.background}` }}>

        {/* Title Div */}
        <div className="title-top-div">
          <div className="task-title-div">
            <h3 name="title" value={c.title} className="task-title" >{c.title}</h3>
          </div>
          <div className="pin-icon-div">
            <img className="pin-icon" src="assets/pin-icon.png"></img>
          </div>
        </div>

        {/* Description Div */}
        <div className="task-desc-div">
          <span name="description"
                value={c.description} className="task-desc" >{c.description}</span>
        </div>

        {/* Buttons for Archive, Delete, Complete and Edit */}
        <div className="task-buttons" style={{ backgroundColor: `${c.background}` }}>
          {/* Archive Button */}
          <button className="buttons-pos" title="Archive" onChange={this.changeHandlerArchive} onClick={() => {this.archiveHandler(c._id);}}>
            <img
              alt="archive_icon"
              className="archive-btn"
              src="assets/archive-icon.png"
            />
          </button>

          {/* Delete Button */}
          <button className="buttons-pos" title="Delete" onChange={this.changeHandlerTrash} onClick={() => {this.deleteHandler(c._id);}}>
            <img
              alt="trash_icon"
              className="trash-btn"
              src="assets/trash-icon.png"
            />
          </button>

          {/* Complete Button */}
          <button className="buttons-pos" title="Complete" onChange={this.changeHandlerComplete} onClick={() => {this.completeHandler(c._id);}}>
            <img
              alt="check_icon"
              className="check-btn"
              src="assets/check.png"
            />
          </button>

          {/* Trash Button */}
          <button className="buttons-pos" title="Edit" onClick={() => this.updateTaskcollectionsList(c)}>
            <img
              alt="check_icon"
              className="trash-btn"
              src="assets/edit-icon.png"
            />
          </button>
        </div>
      </div>
    ));
    
    // Return the List of Notes
    return (<div>
      <Addnote updatedData={this.state.updatedData} clearUpdatedData={() => this.clearUpdatedData()}></Addnote>
      <div className="list-styling">{taskElements}</div>
      </div>);
  }
}

