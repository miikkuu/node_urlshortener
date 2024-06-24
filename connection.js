const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
async function connectToDB(url) {
    //return await mongosse .conncecrt
    return  mongoose.connect(url);
}

module.exports = connectToDB;