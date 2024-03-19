const { getUser, adduser, updateUser, deleteUser } = require("../controller/userController")

const router = require("express").Router()

router
    .get("/", getUser)
    .post("/add-user", adduser)
    .put("/update-user/:id", updateUser)
    .delete("/delete-user/:id", deleteUser)

module.exports = router