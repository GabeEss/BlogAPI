const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PosterSchema = new Schema({
    username: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true, maxLength: 200 },
});

// Export model
module.exports = mongoose.model("Poster", PosterSchema);
