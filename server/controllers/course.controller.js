const { CourseModel } = require("../models/course.model");
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();
// get all course list only acces for admin

const allCourse = async (req, res) => {
    const {page=1,limit=6,sortBy, sortOrder,search}=req.query
   
        
    try{
        let filter = {};
        let sort = {};
        if (search) {
            filter = {
                $or: [
                    { courseName: { $regex: search, $options: 'i' } },
                    { educator: { $regex: search, $options: 'i' } }
                ]
            };
        }
        if (sortBy && ['price', 'educator'].includes(sortBy)) {
            sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        } else {
            sort[sortBy] = 1;
        }
        const skip=(page-1)*limit;

        const courseData = await CourseModel.find(filter).sort(sort).limit(parseInt(limit)).skip(skip)
        const count=await CourseModel.countDocuments();
        const totalPages= Math.ceil(count/limit)
        
        res.status(200).json({courseData:courseData,totalPages:totalPages,currentPage:page,totalCourses:count});

    }catch(error){
        res.status(500).json({message : error.message})
    }
}

const getMyCourses = async (req,res) => {
    try{
        const user_id = req.id
        console.log(user_id);
        const courses = await CourseModel.find({ students: { $in: [user_id] } })
        res.status(200).json(courses);
    }catch(error){
        res.status(505).json({message : error.message})
    }
}


// get the  course info
const courseById =  async (req, res) => {
    try{
        const { id } = req.params;
      
        const course = await CourseModel.findById(id);
    
        if(course){
            res.status(200).json({course : course});
        }else{
            res.status(404).json({message : 'course not found'})
        }

    }catch(error){
        res.status(500).json({message : error.message})
    }
}




// createCourse
const createCourse = async (req, res) => {
    try{
        const {courseName,educator,price,techStack,imageUrl,rating,reviews} = req.body;
        // 

        console.log(req.body);
        if(courseName && educator && techStack.length > 0 && price && imageUrl && rating && reviews ){
            // let uploadedFileURL= await uploadFile(file)
            // console.log(uploadedFileURL)
            const newUser = new CourseModel({...req.body,students:[]})
            // console.log(newUser)
            await newUser.save(); 
            

        res.status(201).json(newUser)
            
        }else{
            res.status(400).json({message : 'all fields are required'})
        }

    }catch(error){
        res.status(500).json({message : error.message})
    }
}



// for to update the course details.
const updateCourse = async (req, res) => {
    try{
        const { id } = req.params;
        const isCourse = await CourseModel.findById(id);
        if(isCourse) {
           const updatedCourse= await CourseModel.findByIdAndUpdate({_id:id},req.body,{new:true});
            
            res.status(200).json(updatedCourse)
        }else{
            res.status(404).json({message : 'course not found'})
        }
    }catch(error){
        res.status(500).json({message : error.message})
    }
}


// removes the course from db if exists.
const deleteCourse = async ( req,res) => {
    try{
        const { id } = req.params;
        const isCourse = await CourseModel.findById(id);
        if(isCourse){
            await CourseModel.findByIdAndDelete(id);
            res.status(200).json({message : "course deleted successfully"})
        }else{
            res.status(404).json({message : "course not found"})
        }

    }catch(error){
        res.status(500).json({message:error.message})
    }
}


const s3Client = new S3Client({
    region: "ap-southeast-2",
    credentials: {
        accessKeyId: process.env.ACCESSKEYID,
        secretAccessKey: process.env.ACCESSKEY,
    }
})


async function uploadFile(file) {
    try {
        // Prepare parameters for uploading the file
        const uploadParams = {
            Bucket: "educonnect",
            Key: "CourseImage/" + file.originalname,
            Body: file.buffer 
        };

        // Upload the file to S3
        const command = new PutObjectCommand(uploadParams);
        const response = await s3Client.send(command);

        console.log(response);
        console.log("File uploaded successfully");

        return response.Location; // Return the URL of the uploaded file
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}


module.exports = {
    allCourse,
    createCourse,
    getMyCourses,
    courseById,
    deleteCourse,
    updateCourse,
    uploadFile
}

