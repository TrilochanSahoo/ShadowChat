import { useState } from "react"
import { Link } from "react-router-dom"

export const Landing = ()=>{
    const [name,setName] = useState("")

    return (
        <>
            <input type="text" name="" id="" onChange={(e)=>{
                setName(e.target.value)
            }}/>
            <Link to={`/room/?name=${name}`}>
            connect
            </Link>
        </>
    )
}