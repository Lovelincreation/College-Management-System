const mongoose = require("mongoose");

const studentDetails = new mongoose.Schema({
  enrollmentNo: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth:{
    type:Date,
    required:true
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  collegeId: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Student Detail", studentDetails);
