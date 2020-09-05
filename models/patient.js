const mongoose = require("mongoose");

const reports = mongoose.Schema({});
const patient = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },
    reports: [
      {
        _id: false,
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Doctor",
        },
        status: {
          type: String,
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patient);

module.exports = Patient;
