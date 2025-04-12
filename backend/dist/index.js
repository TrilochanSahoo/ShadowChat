"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const userManager_1 = require("./handlers/userManager");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ""
    }
});
const userManager = new userManager_1.UserManager();
io.on("connection", (socket) => {
    console.log("a user connected");
    userManager.addUser("randomUser", socket);
    socket.on("disconnect", () => {
        console.log("user got disconnected");
        userManager.removeUser(socket.id);
    });
});
server.listen(3000, () => {
    console.log("server is running on port 3000");
});
