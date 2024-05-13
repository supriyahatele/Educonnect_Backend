const express = require("express");
const multer = require("multer");
const courseRouter = express.Router();
const upload = multer({ dest: "uploads/" });



const { auth } = require("../middlewares/auth.middleware");
const { access } = require("../middlewares/access.middleware");
const { isEnrolled } = require("../middlewares/isEnrolled.middleware")

const {
  createCourse,
  allCourse,
  courseById,
  updateCourse,
  deleteCourse,
  getMyCourses,
} = require("../controllers/course.controller");
const {
  allVideos,
  uploadVideo,
  updateVideo,
  deleteVideo,
  singleVideo,
} = require("../controllers/video.controller");
const { getAssignment, addAssignment, getSingleAssignment } = require("../controllers/assignment.controller");

// to create course
// auth,access('educator'),
courseRouter.post("/", createCourse);

// to get all the users -- access to admin only
courseRouter.get("/", allCourse);

courseRouter.get('/mycourses',auth,getMyCourses)

// to get profile of the user -- user details
courseRouter.get("/:id",courseById);

// to update the user details

courseRouter.patch("/:id",auth,access('educator'), updateCourse);

// to delete the user
courseRouter.delete("/:id",auth,access('educator'), deleteCourse);

courseRouter.get("/:id/videos",auth, allVideos);

courseRouter.get("/:id/videos/:video_id",auth, singleVideo);

courseRouter.post("/:id/videos/uploads",auth, upload.single("video"),auth,access('educator'), uploadVideo);

courseRouter.patch("/:id/videos/:video_id",auth,access("educator"),updateVideo);

courseRouter.delete("/:id/videos/:video_id",auth,access("educator"),deleteVideo);

courseRouter.get("/:id/getAssignment", auth, getAssignment);

courseRouter.get("/:id/getAssignment/:assignment_id", auth, getSingleAssignment);

courseRouter.post("/:id/createAssignment",auth,access("educator"),addAssignment);

module.exports = {
  courseRouter,
};
