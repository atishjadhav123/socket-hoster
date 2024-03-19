const express = require("express")
const mongoose = require("mongoose")
const { Server } = require("socket.io")
const http = require("http")
const cors = require("cors")
const { on } = require("events")
const Todo = require("./models/Todo")


const app = express()
const server = http.createServer(app)
io = new Server(server, { cors: { origin: "http://localhost:5173" } })

app.use(express.json())
app.use(cors())

app.use("/api/user", require("./routes/userRoutes"))
app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not Found" })
})
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "Somthig went Wrong" })
})

mongoose.connect("mongodb://127.0.0.1:27017/socket-todo")

mongoose.connection.once("open", () => {
    console.log("DB CONNECTED")
    server.listen(5000, console.log("SERVER RUNNING"))

    io.on("connection", socket => {
        console.log("Client Connect", socket.id)

        socket.on("addTodo", async todoData => {
            await Todo.create(todoData)
            const result = await Todo.find()
            io.emit("fetchTodos", result)
            console.log("Add create Success", todoData)
        })
        socket.on("getTodos", async () => {
            const result = await Todo.find()
            io.emit("fetchTodos", result)
        })
        socket.on("deleteTodo", async id => {
            await Todo.findByIdAndDelete(id)
            const result = await Todo.find()
            io.emit("fetchTodos", result)
        })
        socket.on("updateTodo", async todoData => {
            await Todo.findByIdAndUpdate(todoData._id, todoData)
            const result = await Todo.find()
            io.emit("fetchTodos", result)
        })
    })
})
