const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema(
  {
    title: { type: String, required: true},
    description: { type: String, required: true },
    body : { type: String, required: true},
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
    course: { type: String },
    courseID:{type: mongoose.Schema.Types.ObjectId, ref: "Course"},
    assigningTime: {
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
    submissionTime: {
      type: String,
      default: () => {
        const now = new Date();
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
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

const AssignmentModel = mongoose.model("Assignment", assignmentSchema);

module.exports = { AssignmentModel };
