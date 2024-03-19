const asyncHandler = require("express-async-handler")
const User = require("../models/User")

exports.adduser = asyncHandler(async (req, res) => {
    await User.create(req.body)
    res.json({ message: "user create success" })
})
exports.getUser = asyncHandler(async (req, res) => {
    const result = await User.find()
    res.json({ message: "user fetch success", result })
})
exports.updateUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: "user update success" })
})
exports.deleteUser = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.params.id, req.body)
    res.json({ message: "user delete success" })
})