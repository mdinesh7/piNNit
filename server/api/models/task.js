// models file will have database schema information

import Mongoose from "mongoose";

// Tasks DB Schema Declaration
const taskSchema = new Mongoose.Schema({
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
    timestamps: {
        createdAt: 'createDate',
        updatedAt: 'lastModifiedDate'
    },
    versionKey: false
});

taskSchema.virtual("id", () => this._id.toHexString());
taskSchema.set("toJSON", { virtuals: true });

const taskcollection = Mongoose.model("taskcollections", taskSchema);

// Exporting the default value
export default taskcollection;