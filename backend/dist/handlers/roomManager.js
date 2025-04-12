"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let GLOBAL_ROOM_ID = 1;
class RoomManger {
    constructor() {
        this.rooms = new Map;
    }
    createRoom(user1, user2) {
        const roomId = this.generateRoomId().toString();
        this.rooms.set(roomId, {
            user1, user2
        });
        user1.socket.emit("send-invite", { roomId });
        user2.socket.emit("send-invite", { roomId });
    }
    generateRoomId() {
        return GLOBAL_ROOM_ID++;
    }
}
