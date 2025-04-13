import { User } from "./userManager";

interface Room {
    user1 : User
    user2 : User
}

let GLOBAL_ROOM_ID = 1

export class RoomManager{
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

    // Note : when 2 users poping from queue the user2 send offer and user1 answer the offer

    onOffer(sdp:string,roomId:string){
        const user2 = this.rooms.get(roomId)?.user2
        console.log(`user2 is ${user2}`)
        user2?.socket.emit("offer",{sdp, roomId})
    }

    onAnswer(sdp:string,roomId:string){
        const user1 = this.rooms.get(roomId)?.user1
        console.log(`user1 is ${user1}`)
        user1?.socket.emit("answer",{sdp,roomId})
    }

    

    generateRoomId(){
        return GLOBAL_ROOM_ID++
    }
}



