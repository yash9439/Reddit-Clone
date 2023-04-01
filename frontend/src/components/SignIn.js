import React from 'react'
import { useState, useContext } from 'react'
import { UserContext } from "../App"
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const PostData = () => {
        // console.log(username,password)
        fetch("http://localhost:5010/signin", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data) 
                if(data.error){
                    console.log(data.error, " " , data.message)
                    alert(data.error)
                }
                else {
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    console.log(data.error, " " , data.message)
                    dispatch({type:"USER",payload:data.user}) 
                    alert(data.message)
                    navigate('/')
                }
            }).catch(err=>{
                console.log(err)
            })
    }

    return (
        <div className="mycard">
            <div className="card auth-card">
            <h2>Sign In</h2>
            <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn waves-effect waves-light #e040fb purple accent-2" onClick={() => PostData()} > 
                Login
            </button>
            </div>
        </div>
    )
}

export default SignIn;