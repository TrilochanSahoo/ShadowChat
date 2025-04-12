import express from "express"
import {createServer} from "http"
import {join} from "path"
import {Server} from "socket.io"
import { UserManager } from "./handlers/userManager"
import { Socket } from "socket.io"

const app = express()
const server = createServer(app)
const io = new Server(server,{
    cors : {
        origin : ""
    }
})

const userManager = new UserManager()

io.on("connection",(socket:Socket)=>{
    console.log("a user connected")
    userManager.addUser("randomUser",socket)
    socket.on("disconnect",()=>{
        console.log("user got disconnected")
        userManager.removeUser(socket.id)
    })
})

server.listen(3000,()=>{
    console.log("server is running on port 3000")
})