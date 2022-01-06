// models file will have database schema information
import Mongoose from "mongoose";

// Archive DB Schema Declaration
const archiveSchema = new Mongoose.Schema(
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


archiveSchema.virtual("id", () => this._id.toHexString());
archiveSchema.set("toJSON", { virtuals: true });

const archivecollection = Mongoose.model("archivecollection", archiveSchema);

// Exporting the default value
export default archivecollection;
