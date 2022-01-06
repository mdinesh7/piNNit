// models file will have database schema information
import Mongoose from "mongoose";

// Completed DB Schema Declaration
const completeSchema = new Mongoose.Schema(
  {
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
      createdAt: "createDate",
      updatedAt: "lastModifiedDate",
    },
    versionKey: false,
  }
);


completeSchema.virtual("id", () => this._id.toHexString());
completeSchema.set("toJSON", { virtuals: true });

const completecollection = Mongoose.model("completecollection", completeSchema);

// Exporting the default value
export default completecollection;
