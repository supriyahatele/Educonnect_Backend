const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema(
  {
    assignmentID: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
    submissionUrl: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    submissionTime: {
      type: String,
      default: () => {
        const now = new Date();
        const dayNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const day = dayNames[now.getDay()];
        const month = monthNames[now.getMonth()];
        const year = now.getFullYear();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        return `${day}, ${month} ${now.getDate()}, ${year} ${hours}:${minutes}:${seconds}`;
      },
    },
  },
  {
    versionKey: false,
  }
);

const SubmissionModel = mongoose.model("Submission", submissionSchema);

module.exports = { SubmissionModel };
