const dotenv = require('dotenv');
dotenv.config();
const MONGO_URL = process.env.MONGODB;


const mongodb ={
    URL: MONGO_URL,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

module.exports = {mongodb};