const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { VideoModel } = require("../models/video.model");
require('dotenv').config();
const fs = require('fs');
const { CourseModel } = require("../models/course.model");

const s3Client = new S3Client({
    region: "ap-southeast-2",
    credentials: {
        accessKeyId: process.env.ACCESSKEYID,
        secretAccessKey: process.env.ACCESSKEY,
    }
})

const allVideos = async (req,res) => {
    try{
        const {id} = req.params;
        console.log("course :",req.params);
        const videos = await VideoModel.find({course_id:id})
        console.log(videos);
       
        res.status(200).json(videos);

    }catch(error){
        res.status(500).json({error: error.message});
    }

}

const singleVideo = async ( req,res) => {
    try{
        const {video_id} = req.params;
        const isVideo = await VideoModel.findById(video_id);
        if(isVideo) {
            res.status(200).json(isVideo);
        }else{
            res.status(404).json({error: 'Not Found'});
        }

    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const uploadVideo = async (req,res) => {
    try{
        const videoName = `video-${Date.now()}.mp4`
        console.log(videoName);
        const filePath = req.file.path;
        const uploadParams = {
            Bucket: 'educonnect',
            Key: `uploads/${videoName}`,
            Body: fs.createReadStream(filePath),
            ContentType: 'video/mp4'
        };
        const {id} = req.params
       const {title,notes} = req.body;
      
        await s3Client.send(new PutObjectCommand(uploadParams));
        const videoUrl = `${process.env.AWS_BUCKET_URL}${videoName}`;
       const educator = req.user
        const newVideo = new VideoModel({educator,videoUrl,course_id:id,title,notes})
        await newVideo.save();

        res.status(201).json(newVideo)

        }catch(error){
        res.status(500).json({message : error.message});
    }
}
const updateVideo = async () => {
    try{
        const {video_id} = req.params;
        await VideoModel.findByIdAndUpdate(video_id,req.body);
        const updatedVideo = await VideoModel.findById(id);
        res.status(200).json(updatedVideo)

    }catch(error){
        res.status(500).json({message : error.message});
    }

}

const deleteVideo = async () => {
    try{
        const {id} = req.params;
        await VideoModel.findByIdAndDelete(id);
        res.status(200).json({message : 'Deleted video successfully'})

    }catch(error){
        res.status(500).json({message : error.message});
    }
}

module.exports = {
    allVideos,
    singleVideo,
    uploadVideo,
    updateVideo,
    deleteVideo
}


