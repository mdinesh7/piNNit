// Importing the database schema information for models file

import Mongoose from "mongoose";

// Trash DB Schema Declaration
const trashSchema = new Mongoose.Schema({
  //Setting the title and description of the notes
  "title": {
    type: String,
    required: "Title is a required field",
  },
  "description": {
    type: String,
    required: "Description is a required field",
  },
  "background": {
    type: String,
    default: "#fff"
  }
},
{
  //Creating the timestamp for the notes
    timestamps: {
        createdAt: 'createDate',
        updatedAt: 'lastModifiedDate'
    },
    versionKey: false
});

trashSchema.virtual("id", () => this._id.toHexString());
trashSchema.set("toJSON", { virtuals: true });

const trashcollection = Mongoose.model("trashcollections", trashSchema);

// Exporting the default value
export default trashcollection;