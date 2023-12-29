const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 25
  },
  text: {
    type: String,
    required: true,
    maxLength: 200
  },
  timestamp: { type: Date, default: Date.now },
});

// Virtual for post's URL
PostSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/blog/post/${this._id}`;
});

PostSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
});

// Export model
module.exports = mongoose.model("Post", PostSchema);