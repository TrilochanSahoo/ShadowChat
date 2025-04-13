import { io, Socket } from "socket.io-client";
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";


const url = "http://localhost:3000"



export const Room = ()=>{
    const [searchParams,setSearchParams] = useSearchParams()
    const name = searchParams.get('name')
    const [lobby,setLobby] = useState(true)
    const [socket,setSocket] = useState<null | Socket>(null)

    const [sendingPc,setSendingPc] = useState<null | RTCPeerConnection>(null)
    const [receivingPc,setReceivingPc] = useState<null | RTCPeerConnection>(null)

    const [remoteVideoTrack,setRemoteVideoTrack] = useState<MediaStreamTrack | null>(null)
    const [localVideoTrack,setLocalVideoTrack] = useState<MediaStreamTrack | null>(null)
    const [remoteAudioTrack,setRemoteAudioTrack] = useState<MediaStreamTrack | null>(null)
    const [localAudioTrack,setLocalAudioTrack] = useState<MediaStreamTrack | null>(null)


    useEffect(()=>{
        const socket = io(url);
        socket.on('send-invite',async ({roomId})=>{
            // alert("send offer please.")
            setLobby(false)
            const pc = new RTCPeerConnection()
            setSendingPc(pc)

            const sdp = await pc.createOffer()
            socket.emit("offer",{
                sdp : sdp,
                roomId : roomId
            })

        })

        socket.on("offer",async ({sdp,roomId})=>{
            // alert("send answer please")
            setLobby(false)
            const pc = new RTCPeerConnection()
            pc.setRemoteDescription({
                type:"offer",
                sdp:sdp,
            })
            setReceivingPc(pc)

            pc.ontrack = (({track,type})=>{
                if (type=="audio"){
                    setRemoteAudioTrack(track)
                }else{
                    setRemoteVideoTrack(track)
                }
            })


            const answer_sdp = await pc.createAnswer()
            socket.emit("answer",{
                roomId,
                sdp: answer_sdp
            })
        })

        socket.on("answer",({sdp,roomId})=>{
            setLobby(false)
            // alert("connection done.")

            setSendingPc(pc => {
                pc?.setRemoteDescription({
                    type:"answer",
                    sdp : sdp
                })

                return pc
            })
            
        })

        socket.on("lobby",()=>{
            setLobby(true)
        })
    },[name])

    if(lobby){
        return <div>
            waiting to connect you to someone
        </div>
    }
    return (
        <>
        hi {name}
        <video height={400} width={400}></video>
        <video height={400} width={400}></video>
        </>
    )
}