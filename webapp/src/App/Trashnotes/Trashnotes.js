import React from "react";
import "./Trashnotes.scss";
import swal from 'sweetalert';

// Export Trashnotes Component
export class Trashnotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      background:""
    };
    this.changeHandlerRestore  = this.changeHandlerRestore .bind(this);
  }

  changeHandlerRestore = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handler for Restoring Deleted Notes
  restoreHandler = (id) => {
    fetch(`http://localhost:3003/trashcollections/${id}`, {
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
  // Removing the Note from Trash
  fetch(`http://localhost:3003/trashcollections/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      this.submitHandlerRestore();
    });
    console.log(this.state);
};

// Posting in Home Page
submitHandlerRestore = (element) => {
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
    // Sweetalert for Successfully Restoring
    swal({
      title: "Successfully Restored Note",
      text: "Your Note is Back at Home",
      icon: "success",
      timer: 4000
      })
      .then((willDelete) => {
        window.location.reload();
      })
    console.log("Successfully Restored Note");
  })
  .catch((error) => alert("Error Submitting the Input data: ", error));
};

// Permanent Delete Handler 
  deleteHandlerTrash = (id) => {
    // Sweetalert for Permanent Delete
    swal({
      title: "Are you sure you want to Delete note Permanently?",
      text: "Once deleted, you will not be able to recover this Note !!!",
      icon: "warning",
      timer: 10000,
      buttons: true
      })

      
      .then((willDelete) => {
        if (willDelete) {
          fetch(`http://localhost:3003/trashcollections/${id}`, {
          method: "DELETE",
        })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
        // If Yes Permanently Remove Note
        swal("Poof! Your Note has been deleted !!", {
          icon: "success",
          timer: 4000
        })
        .then((willDelete) => {
          window.location.reload();
        });
        // If No do not Delete note
        } else {
          swal("Your Note is safe!");
        }
        
      })
  };
  


  
  render() {
    const trashElements = this.props.trashcollections.map((c, i) => (
      // Notes Div
      <div className="trash-div"  style={{ backgroundColor: `${c.background}` }}>

        {/* Title Div */}
        <div className="trash-title-div">
          <h3 className="trash-title">{c.title}</h3>
        </div>

        {/* Description Div */}
        <div className="trash-desc-div">
          <span className="trash-desc">{c.description}</span>
        </div>

        {/* Buttons to Restore and Delete Permanently, Getting Background from Color Picker */}
        <div className="trash-buttons"  style={{ backgroundColor: `${c.background}` }}>
          {/* Restore Button */}
          <button className="buttons-pos-trash" title="Restore" onChange={this.changeHandlerRestore} onClick={() => {this.restoreHandler(c._id);}}>
            <img
              alt="restore_icon"
              className="restore-btn"
              src="assets/restore-icon.png"
            />
          </button>

          {/* Delete Permanently Button */}
          <button
            className="buttons-pos-trash" title="Delete Permanently"
            onClick={() => this.deleteHandlerTrash(c._id)}
          >
            <img
              alt="trash_icon"
              className="trash-btn"
              src="assets/trash-icon.png"
            />
          </button>
        </div>
      </div>
    ));
    // Calling Trash Elements Get Function
    return <div className="list-styling-trash">{trashElements}</div>;
  }
}
