const mongoose = require('mongoose');

const BlackListSchema = mongoose.Schema({
    token : {type : String, required: true},
    logoutDetails:{   type: String,
        default: () => {
          const now = new Date();
          const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const day = dayNames[now.getDay()];
          const month = monthNames[now.getMonth()];
          const year = now.getFullYear();
          const hours = now.getHours();
          const minutes = now.getMinutes();
          const seconds = now.getSeconds();
          return `${day}, ${month} ${now.getDate()}, ${year} ${hours}:${minutes}:${seconds}`;
        }
    }
},
{
   versionKey : false,
})
const BlackListModel = mongoose.model('BlackList',BlackListSchema)

module.exports = {
    BlackListModel
}