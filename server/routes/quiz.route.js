const express = require("express");
const {
  getQuiz,
  postQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quize.controller");
const { auth } = require("../middlewares/auth.middleware");
const { access } = require("../middlewares/access.middleware");

const quizRouter = express.Router();

quizRouter.get("/getQuiz",auth, getQuiz);
quizRouter.post("/createQuiz",auth,access("educator"), postQuiz);
quizRouter.patch("/updateQuiz/:id",auth,access("educator"), updateQuiz);
quizRouter.delete("/deleteQuiz/:id",auth,access("educator"), deleteQuiz);

module.exports = { quizRouter };
