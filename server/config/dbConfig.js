const mongoose = require('mongoose');
require('dotenv').config();

const connectionToDB = async() => {
    try{
    await mongoose.connect(process.env.MONGODB_URL) 
    }catch(err){
        console.error(err);
        process.exit(1);
    }
}


module.exports = {
    connectionToDB
}