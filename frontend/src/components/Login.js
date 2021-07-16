import { Cancel, Room } from '@material-ui/icons'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import "./login.css"
const Login=(props)=>{
    const[error,seterror]=useState(false)
    const nameRef=useRef()
    const passwordRef=useRef()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const User={
            username:nameRef.current.value,
            password:passwordRef.current.value
        }
        try{
            const res=await axios.post('/user/login',User)
            props.myStorage.setItem("user",res.data.username)
            props.setCurrentUser(res.data.username)
            props.setshowLogin(false)
            seterror(false)
        }
        catch(error){
            seterror(true)
        }
    }
    return(
        <div className="loginContainer">
            <div className="logo">
                <Room/>LamaPin
            </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" ref={nameRef}/>
                    <input type="password" placeholder="password" ref={passwordRef}/>
                    <button className="loginButton">Login</button>
                    {error&&(
                    <span className="failure">Something went wrong</span>
                    )}
                </form>
                <Cancel className="loginCancel" onClick={()=>props.setshowLogin(false)}/>
        </div>
    )
}
export default Login