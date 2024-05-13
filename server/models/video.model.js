const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
    title : {type : String , required: true},
    course_id :{type: mongoose.Schema.Types.ObjectId, ref: "Course"} ,
    videoUrl : {type : String, required: true},
    educator : {type : String, required: true},
    notes : {type : String},
    time: {
        type: String,
        default: () => {
          const now = new Date();
          const dayNames = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          const day = dayNames[now.getDay()];
          const month = monthNames[now.getMonth()];
          const year = now.getFullYear();
          const hours = now.getHours();
          const minutes = now.getMinutes();
          const seconds = now.getSeconds();
          return `${day}, ${month} ${now.getDate()}, ${year} ${hours}:${minutes}:${seconds}`;
        },
      },
})

const VideoModel = mongoose.model('Video', VideoSchema);

module.exports = {
    VideoModel
}
