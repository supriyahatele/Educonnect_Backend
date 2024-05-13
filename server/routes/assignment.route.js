const express = require("express");
const { getAssignment, addAssignment, updateAssignment, deleteAssignment } = require("../controllers/assignment.controller");
const { access } = require("../middlewares/access.middleware");
const { auth } = require("../middlewares/auth.middleware");

const assignmentRouter = express.Router();

// assignmentRouter.get("/getAssignment",getAssignment)
// assignmentRouter.post("/createAssignment",addAssignment)
assignmentRouter.patch("/updateAssignment/:id",auth,access("educator"),updateAssignment)
assignmentRouter.delete("/deleteAssignment/:id",auth,access("educator"),deleteAssignment)


module.exports={assignmentRouter}