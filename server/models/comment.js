const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      required: true
    },
    event: {
      type: Schema.Types.ObjectId,
      required: true
    },
    body: {
      type: String,
      required: false,
      trim: true,
    },
    // location: { // TODO
    //   type: pointSchema,
    //   required: true
    // }
  },
  { 
    timestamps: true // Assigns createdAt and updatedAt fields
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;