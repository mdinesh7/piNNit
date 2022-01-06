// Importing all the necessary packages
import React from "react";
import "./Completednotes.scss";
import swal from 'sweetalert';

// Export Completed notes components
export class Completednotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      background:""
    };
    this.changeHandlerComplete  = this.changeHandlerComplete .bind(this);
  }

  changeHandlerComplete = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handler for Restoring Completed Notes
  incompleteHandler = (id) => {
    fetch(`http://localhost:3003/completecollections/${id}`, {
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
  
    // Removing the Note from Completed notes
  fetch(`http://localhost:3003/completecollections/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      this.submitHandlerIncomplete();
    });

    console.log(this.state);
};

// Posting in Home page
submitHandlerIncomplete = (element) => {
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
   // Sweetalert for Successfully Restoring
  .then((data) => {
    swal({
      title: "Note Marked as Incomplete !!!",
      text: "Your Note is Back at Home",
      icon: "success",
      timer: 4000
      })
      .then((willDelete) => {
        window.location.reload();
      })
    console.log("Marked note incomplete");
  })
};

// Deleting the note from delete page
  deleteHandlerComplete = (id) => {
    swal({
      title: "Are you sure you want to Delete note Permanently?",
      text: "Once deleted, you will not be able to recover this Note !!!",
      icon: "warning",
      timer: 10000,
      buttons: true
      })
      .then((willDelete) => {
        if (willDelete) {
          fetch(`http://localhost:3003/completecollections/${id}`, {
          method: "DELETE",
        })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
        swal("Poof! Your Note has been deleted !!", {
          icon: "success",
          timer: 4000
        })
        .then((willDelete) => {
          window.location.reload();
        });
        } else {
          swal("Your Note is safe!");
        }
        
      })
  };
  
  // Rendering the completed notes functionality
  render() {
    const completeElements = this.props.completecollections.map((c, i) => (
      <div className="complete-div"  style={{ backgroundColor: `${c.background}` }}>
        <div className="complete-title-div">
          <h3 className="complete-title">{c.title}</h3>
        </div>
        <div className="complete-desc-div">
          <span className="complete-desc">{c.description}</span>
        </div>
        <div className="complete-buttons"  style={{ backgroundColor: `${c.background}` }}>
          <button className="buttons-pos-complete" title="Mark Incomplete" onChange={this.changeHandlerComplete} onClick={() => {this.incompleteHandler(c._id);}}>
            <img
              alt="incomplete_icon"
              className="incomplete-btn"
              src="assets/cross-icon.png"
            />
          </button>

          <button
            className="buttons-pos-complete" title="Delete Permanently"
            onClick={() => this.deleteHandlerComplete(c._id)}
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
    return <div className="list-styling-complete">{completeElements}</div>;
  }
}
