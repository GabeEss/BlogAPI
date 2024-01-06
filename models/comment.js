const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
    maxLength: 200
  },
  timestamp: { type: Date, default: Date.now },
  owner: { 
    type: String,
    required: true,
    maxLength: 50
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true
  }
});

// Virtual for comment's URL
CommentSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/blog/comment/${this._id}`;
});

CommentSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);