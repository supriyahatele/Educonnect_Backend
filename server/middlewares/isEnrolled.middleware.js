const isEnrolled = async (req,res,next) => {
    try{
        const course_id = req.params.id;
        const user_id = req.id;
        const isCourse = await CourseModel.findById(course_id);
        if(isCourse){
            const isStudentEntrolled = isCourse.students.includes(user_id);
            if(isStudentEntrolled){
                next();
            }else{
                res.status(403).json({message : 'you are not enrolled for this course'})
            }

        }else{
            res.status(404).json({message: 'Course not found'})
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    isEnrolled
}