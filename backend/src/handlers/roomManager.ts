import { User } from "./userManager";

interface Room {
    user1 : User
    user2 : User
}

let GLOBAL_ROOM_ID = 1

class RoomManger{
    private rooms : Map<string,Room>
    constructor(){
        this.rooms = new Map<string,Room>
    }

    createRoom(user1:User,user2:User){
        const roomId = this.generateRoomId().toString()
        this.rooms.set(roomId,{
            user1,user2
        })

        user1.socket.emit("send-invite",{roomId})
        user2.socket.emit("send-invite",{roomId})
    }

    

    generateRoomId(){
        return GLOBAL_ROOM_ID++
    }
}



