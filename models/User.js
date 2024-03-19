const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
}, { timestamps: true })


module.exports = mongoose.models.user || mongoose.model("user", userSchema)