import React from "react";

const FOrmularioLogin = ({handleLogin,handleUsername,handlePassword,username,passwordHas})=>{
    return(
        <form onSubmit={handleLogin}>
            <div>
                nameuser <input type='text' name="Username" value={username} onChange={handleUsername} />
            </div>
            <div>
                password <input type='password' name="password" value={passwordHas} onChange={handlePassword} /> 
            </div>
            <button type="submit" >login</button>
        </form>
    )
}
export default FOrmularioLogin