import React from "react";
import "./Addnote.scss";
import { CirclePicker } from "react-color";
import swal from "sweetalert";

export class Addnote extends React.Component {
  //constructor defined
  constructor(props) { 
    super(props);
    this.state = {
      title: "",
      description: "",
      background: "",
      displayColorPicker: false,
    };
    //handler bind 
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentWillReceiveProps = (newProps) => {
    const { updatedData } = newProps;
    if (!!updatedData) {
      this.setState({
        title: updatedData?.title,
        description: updatedData?.description,
        background: updatedData?.background
      });
    }
  };
  //Function for setting state of colour
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };
  //Function for closing colour element 
    handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
    this.setState({ displayColorPicker: false });
  };
  // For getting current elements name and value
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // For collapse getting parent and next sibling
  displayArea = (event) => {
    const element = event.target;
    const targetElement1 = element.parentElement;
    const targetElement = targetElement1.nextSibling;
    targetElement.classList.add("display-try");
  };

  // For collapse when clicked outside getting parent and next sibling
  displayTextArea = (event) => {
    const element = event.target;
    const targetElement1 = element.parentElement;
    const targetElement = targetElement1.parentElement;
    targetElement.classList.add("display-try");
  };

  updateTodoData() {
    const { updatedData } = this.props;
    const { title, description, background } = this.state;
    let payload = {
        title: title,
        description: description,
        background: background
    }
    if((this.state.title !== '') && (this.state.description !== '')){
    fetch(`http://localhost:3003/taskcollections/${updatedData?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.props.clearUpdatedData()
        this.setState({
          title: "",
          description: "",
          background: ""
        });
        swal({
          title: "Successfully Updated Note !!!",
          icon: "success",
          timer: 3000,
        }).then((willDelete) => {
          window.location.reload();
        });
      })
    }
    // validation for Null data
    else {
      swal({
        title: "Oops, Failed to Update !!",
        icon: "error",
        text: "Title/Description Fields cannot be Empty !!!",
        timer: 6000,
      })
    }
  }

  // Post method to save data
  submitHandler = (element) => {
    element.preventDefault();
    if(!!this?.props?.updatedData) {
        this.updateTodoData();
    }
    else{
    if((this.state.title !== '') && (this.state.description !== '')){
    fetch("http://localhost:3003/taskcollections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        response.json();
        console.log(response);
      })
      .then((data) => {
        swal({
          title: "Successfully Created Note !!!",
          icon: "success",
          timer: 4000,
        }).then((willDelete) => {
          window.location.reload();
        });
      })
      }
      // validation for Null data
      else {
        swal({
          title: "Oops, Something Wrong !!!",
          icon: "error",
          text: "Title/Description Fields cannot be Empty !!!",
          timer: 6000,
        })
      }
    }
  };

  //Post archived notes
  submitToArchiveHandler = (element) => {
    element.preventDefault();
    if((this.state.title !== '') && (this.state.description !== '')){
      fetch("http://localhost:3003/archivecollections", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        background: this.state.background,
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
          timer: 4000,
        }).then((willDelete) => {
          window.location.reload();
        });
      });
    }
    // validation for Null data
    else {
      swal({
        title: "Oops, Something Wrong !!!",
        text: "Title/Description Fields cannot be Empty !!!",
        icon: "error",
        timer: 5000
      })
    }
    
  };
 // Our colour pallete
  myColors = [
    "#CDF2CA",
    "#fdfeac",
    "#e0fdff",
    "#dce9fa",
    "#ffcaf1",
    "#dadada",
    "#88E0EF",
    "#d4c4fb",
    "#eb9694",
    "#FBF3E4",
    "#F2DDC1",
    "#edffc4",
  ];
//Rendering elements
  render() {
    const { title, description } = this.state;
    return (
      <div className="main-container">
        <div
          className="main-form"
          style={{ backgroundColor: `${this.state.background}` }}
        >
        {/* Main title input */}
          <div className="title-section">
            <input
              className="title-addnote"
              style={{ backgroundColor: `${this.state.background}` }}
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={this.changeHandler}
              onFocusCapture={this.displayArea}
            />
          </div>
          {/* Main text area for note */}
          <div className="hide">
            <p className="p-style">
              <textarea
                className="content"
                style={{ backgroundColor: `${this.state.background}` }}
                placeholder="Write a note..."
                name="description"
                value={description}
                onChange={this.changeHandler}
              ></textarea>
            </p>
            {/* Various features added like color change, archive, save, etc. */}
            <div className="toolbar">
              <div
                className="common-buttons"
                style={{ backgroundColor: `${this.state.background}` }}
              >
                {/* Button for adding color to note */}
                <button
                  className="add-buttons"
                  title="Color picker"
                  onClick={this.handleClick}
                  name="background"
                  value={this.state.background}
                  onChange={this.changeHandler}
                >
                  <img
                    alt="color-changer"
                    className="icon"
                    src="assets/color-palette.png"
                  />
                </button>
                {this.state.displayColorPicker ? (
                  <div className="popover">
                    <div className="cover" onClick={this.handleClose} />
                    <CirclePicker
                      colors={this.myColors}
                      color={this.state.background}
                      onChangeComplete={this.handleChangeComplete}
                    />
                  </div>
                ) : null}
                {/* Button for archive */}
                {!!this?.props?.updatedData ? <div></div> : 
                <button className="add-buttons" title="Archive" onClick={this.submitToArchiveHandler}>
                  <img alt="archive" className="icon" src="assets/archive-icon.png" />
                </button>}
              </div>
              {/* For saving the note */}
              <div className="save-close">
                <button
                  className="save-close-button"
                  onClick={this.submitHandler}
                >
                  {!!this?.props?.updatedData ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
