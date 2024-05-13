const { AssignmentModel } = require("../models/assignment.model");
const { CourseModel } = require("../models/course.model");

const getAssignment = async(req,res)=>{
    const {id}=req.params;
    const page = req.query.page || 1;
    const size = req.query.size || 10;
    const skip = (page - 1) * size;
    console.log(id);
    try {
        const isAssignment = await AssignmentModel.find({courseID:id}).skip(skip).limit(size);
        res.status(201).json({assignment:isAssignment});
    } catch (error) {
       console.log(error); 
       res.status(500).json({msg:error})
    }
}

const getSingleAssignment = async (req,res) => {
    try{
        const {id,assignment_id} = req.params;
        const isAssignment = await AssignmentModel.findOne({_id:assignment_id,courseID:id})
        if(isAssignment){
            res.status(200).json({assignment : isAssignment})
        }else{
            res.status(404).json({msg : 'assignment not found'})
        }

    }catch(error){
        res.status(500).json({msg:error});
    }
}

const addAssignment = async(req,res)=>{
    try {
        const {id}=req.params;
        const{title,description,body}=req.body;
        const isCourse = await CourseModel.findById(id);
        const userID = req.id;
        const username= req.user;
        console.log(username);
        const newAssignment = new AssignmentModel({title,description,userID,username,course:isCourse.courseName,courseID:id,body});
        await newAssignment.save();
        res.status(201).json(newAssignment);
        
    } catch (error) {
       console.log(error); 
       res.status(500).json({error:error})
    }
}

const updateAssignment = async(req,res)=>{
    const {id} = req.params;
    const {title,description}=req.body;
    try {
        const assignmentUpdate = await AssignmentModel.findByIdAndUpdate({_id:id},{title,description});
        res.status(201).json({msg:"You're updated your assignment Successfully!"});
    } catch (error) {
       console.log(error); 
       res.status(500).json({msg:error})
    }
}

const deleteAssignment = async(req,res)=>{
    const  {id}=req.params
    try {
        const deleteAssignment = await AssignmentModel.findByIdAndDelete({_id:id});
        res.status(201).json({msg:"You're deleted your assignment Successfully!"});
    } catch (error) {
       console.log(error); 
       res.status(500).json({error:error})
    }
}


module.exports={getAssignment,getSingleAssignment,addAssignment,updateAssignment,deleteAssignment}