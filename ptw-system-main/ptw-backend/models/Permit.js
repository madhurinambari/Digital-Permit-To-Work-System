const mongoose = require("mongoose");

const permitSchema = new mongoose.Schema(
  {
    workTitle: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    permitType: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Supervisor Approved",
        "Safety Approved",
        "Manager Approved",
        "Rejected",
      ],
      default: "Pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    supervisorApprovedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    safetyApprovedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    managerApprovedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Permit", permitSchema);