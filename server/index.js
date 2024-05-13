const express = require("express");
const { connectionToDB } = require("./config/dbConfig");
const { userRouter } = require("./routes/user.router");
const cors = require("cors");
const { quizRouter } = require("./routes/quiz.route");
const { assignmentRouter } = require("./routes/assignment.route");
const { submissionRouter } = require("./routes/submission.route");
const { videoRouter } = require("./routes/video.router");
const { courseRouter } = require("./routes/course.route");
const { EnrollmentRouter } = require("./routes/enrollment.route");
const app = express();
require("dotenv").config();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

app.use("/quiz", quizRouter);
app.use("/users", userRouter);
app.use("/assignments", assignmentRouter);
app.use("/submissions", submissionRouter);
app.use('/videos', videoRouter);
app.use("/courses", courseRouter);
app.use("/enrollments", EnrollmentRouter);

app.listen(process.env.PORT, async () => {
  try {
    console.log(`Server is running on port ${process.env.PORT}`);
    await connectionToDB();
  } catch (err) {
    console.log(err);
  }
});
