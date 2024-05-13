const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  question: { type: String, required: true },
  options: [
    {
      option: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
},{
    versionKey:'false'
});

const QuizModel = mongoose.model("Quiz", quizSchema);

module.exports = { QuizModel };
