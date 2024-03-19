const mongoose = require("mongoose")


const todoSchema = new mongoose.Schema({
    task: String,
    desc: String,
    complate: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })


module.exports = mongoose.models.todo || mongoose.model("todo", todoSchema)