const { default: mongoose } = require("mongoose")
const dotenv = require("dotenv");

dotenv.config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connected Successfully");

        // const result = await mongoose.connection.db.collection("devices").dropIndex("apiKey_1");
        // console.log("Index removed:", result);
    } catch (error) {
        console.log("error while connection with mongoDB", error.message);
    }
}

module.exports = dbConnection;