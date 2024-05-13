const express = require("express");
const {
  submitAssignment,
  updateSubmission,
  getSubmitAssignment,
} = require("../controllers/submission.controller");
const { auth } = require("../middlewares/auth.middleware");
const { access } = require("../middlewares/access.middleware");

const submissionRouter = express.Router();

submissionRouter.get("/submit/:assignment_id",auth, getSubmitAssignment);
submissionRouter.post("/submit/:assignment_id",auth, submitAssignment);
submissionRouter.patch("/updateSubmission/:assignment_id",auth, updateSubmission);

module.exports = { submissionRouter };
