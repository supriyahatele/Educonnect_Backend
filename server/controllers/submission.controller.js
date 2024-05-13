const { response } = require("express");
const { SubmissionModel } = require("../models/submission.model");


const submitAssignment = async(req,res)=>{
    const {assignment_id}=req.params;
    const studentID = req.id;
    const {submissionUrl}=req.body;
    try {
        const submitted = await SubmissionModel({ assignmentID:assignment_id,submissionUrl,status : 'Completed',studentID});
             await submitted.save();
        res.json({msg:"You're submitted your assignment Successfully!",submitted});
    } catch (error) {
       console.log(error); 
       res.status(500).json({error:error})
    }
}
const getSubmitAssignment = async(req, res) => {
    try{
        const {assignment_id}=req.params;
        const studentID = req.id;
        console.log(studentID);
        const submition = await SubmissionModel.findOne({ assignmentID:assignment_id,studentID})
        if(submition){
            res.status(200).json(submition)
        }else{
            res.status(200).json({message : 'no submittion found'})
        }

    }catch(error){
        res.status(500).json({error:error});
    }
}

const updateSubmission = async(req,res)=>{
    const {assignment_id}=req.params
    const studentID = req.id

    const {submissionUrl}=req.body;
    console.log(assignment_id, studentID);
    try {

        const updated = await SubmissionModel.updateOne({ assignmentID:assignment_id,studentID},{submissionUrl})
        
        console.log(updated);
        res.json({msg:" You're updated your assignment Successfully!"});
    } catch (error) {
        console.log(error); 
        res.status(500).json({error:error})
    }
}

module.exports={submitAssignment,updateSubmission,getSubmitAssignment}