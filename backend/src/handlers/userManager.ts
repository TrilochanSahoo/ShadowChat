import { Socket } from "socket.io"

export interface User {
    name : string
    socket : Socket
}

export class UserManager { 
    private users : User[]
    private queue : string[]
    constructor() {
        this.users = []
        this.queue = []

    }

    addUser(name:string,socket : Socket){
        this.users.push({
            name,socket
        })
        this.queue.push(socket.id)

        socket.emit("lobby")
        this.clearQueue()
        this.initHandler(socket)
    }

    removeUser(socketId : string){
        const user = this.users.find(x=>x.socket.id===socketId)
        this.users = this.users.filter(x=>x.socket.id !== socketId)
        this.queue = this.queue.filter(x=>x !== socketId)
    }

    clearQueue(){
        console.log("inside clear queue")
        if(this.queue.length<2){
            return
        }
        const id1 = this.queue.pop()
        const id2 = this.queue.pop()
        
        console.log(`id1: ${id1} , id2:${id2}`)
        const user1 = this.users.find(x=> x.socket.id === id1)
        const user2 = this.users.find(x=>x.socket.id===id2)

        if(!user1 || !user2){
            return
        }

        console.log("createing Room.")
    }

    initHandler(socket : Socket){
        socket.on("offer",(res)=>{
            console.log(res)
        })
    }


}