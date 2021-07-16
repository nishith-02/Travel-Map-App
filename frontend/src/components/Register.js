import { Room } from '@material-ui/icons'
import React from 'react'
import "./register.css"
const Register=()=>{
    return(
        <div className="registerContainer">
            <div className="logo">
                <Room/>LamaPin
            </div>
                <form>
                    <input type="text" placeholder="username"/>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    <button className="registerButton">Register</button>
                </form>
        </div>
    )
}
export default Register