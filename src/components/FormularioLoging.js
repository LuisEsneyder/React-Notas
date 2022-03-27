import React,{useState} from "react";

const FOrmularioLogin = ({
    handleLogin})=>{
    const [username,setUsername]=useState('')
    const [passwordHas,setPassword]=useState('')
    const handleUsernameChange = event=>{
        setUsername(event.target.value)
    }
    const handlePasswordChange = event=>{
        setPassword(event.target.value)
    }
    const handleLoginSend = event=>{
        event.preventDefault()
        handleLogin({
            username, passwordHas
        })
        setPassword('')
        setUsername('')
    }
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLoginSend}>
            <div>
                nameuser <input 
                type='text' 
                name="Username" 
                value={username} 
                onChange={handleUsernameChange} />
            </div>
            <div>
                password <input 
                type='password' 
                name="password" 
                value={passwordHas} 
                onChange={handlePasswordChange} /> 
            </div>
            <button type="submit" >login</button>
        </form>
        </div>
    )
}
export default FOrmularioLogin