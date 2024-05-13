const { QuizModel } = require("../models/quize.model");


const getQuiz = async(req,res)=>{

    try {
        const quiz = await QuizModel.find();
        res.status(200).json({msg:"getting All quiz Questions",quiz:quiz})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
}

const postQuiz = async(req,res)=>{
    const { question, options } = req.body;
    try {
        const newQuiz = new QuizModel({
            question: question,
            options: options
        });
        const savedQuiz = await newQuiz.save();
        res.status(201).json({ msg: 'Quiz question created successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
}

const updateQuiz = async(req,res)=>{
    const {id}=req.params;
    const { question, options } = req.body;
    try {
       const update = await QuizModel.findByIdAndUpdate({_id:id},{question, options});
       res.status(201).json({ msg: 'Quiz question updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
}

const deleteQuiz = async(req,res)=>{
    const {id}=req.params;
    try {
        const update = await QuizModel.findByIdAndDelete({_id:id});
        res.status(201).json({ msg: 'Quiz question deleted successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
}



module.exports={getQuiz,postQuiz,updateQuiz,deleteQuiz}