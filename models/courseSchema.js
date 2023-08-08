const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const Course = new mongoose.model("course", courseSchema);
module.exports = Course;
