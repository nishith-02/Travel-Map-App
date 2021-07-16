import { Cancel, Room } from '@material-ui/icons'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import "./register.css"
const Register=(props)=>{
    const[success,setsuccess]=useState(false)
    const[error,seterror]=useState(false)
    const nameRef=useRef()
    const emailRef=useRef()
    const passwordRef=useRef()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const newUsr={
            username:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value
        }
        try{
            await axios.post('/user/register',newUsr)
            seterror(false)
            setsuccess(true)
        }
        catch(error){
            seterror(true)
        }
    }
    return(
        <div className="registerContainer">
            <div className="logo">
                <Room/>LamaPin
            </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" ref={nameRef}/>
                    <input type="email" placeholder="email" ref={emailRef}/>
                    <input type="password" placeholder="password" ref={passwordRef}/>
                    <button className="registerButton">Register</button>
                    {success&&(
                    <span className="success">Successful.You can login now</span>
                    )}
                    {error&&(
                    <span className="failure">Something went wrong</span>
                    )}
                </form>
                <Cancel className="registerCancel" onClick={()=>props.setshowRegister(false)}/>
        </div>
    )
}
export default Register