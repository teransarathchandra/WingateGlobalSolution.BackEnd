const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose
        .connect(process.env.MONGODB_URI)
        .then((data) => {
            console.log(`Successfully connected to MongoDB with Server: ${data.connection.host}`);
        })
        .catch((err) => {
            console.log("Error occurred while connecting to MongoDB" + err.message);
            process.exit(1); // Exit the process if MongoDB connection fails
        });
};

module.exports = connectDatabase;