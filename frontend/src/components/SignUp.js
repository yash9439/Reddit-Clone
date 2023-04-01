import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const SignUp = () => {
    const navigate = useNavigate();
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [password, setPassword] = useState("")

    const PostData = () => {
        // console.log(fname, lname, username, email, age, contactNumber,password)
        fetch("http://localhost:5010/signup", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                fname: fname,
                lname: lname,
                username: username,
                email: email,
                age: age,
                contactNumber: contactNumber,
                password: password
            })
        }).then(res => res.json())
            .then(data => {
                if(data.error){
                    console.log(data.error, " " , data.message)
                    // M.toast({html: data.error})
                    alert(data.error)
                }
                else {
                    console.log(data.error, " " , data.message)
                    // M.toast({html: data.message})
                    alert(data.message)
                    navigate('/login')
                }
            }).catch(err=>{
                console.log(err)
            })
    }

    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2>Register</h2>
                <input type="text" placeholder='*First Name' value={fname} onChange={(e) => setFname(e.target.value)} />
                <input type="text" placeholder='*Last Name' value={lname} onChange={(e) => setLname(e.target.value)} />
                <input type="text" placeholder='*username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder='*Email Id' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="number" placeholder='*Age' value={age} onChange={(e) => setAge(e.target.value)} />
                <input type="number" placeholder='*Contact Number' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                <input type="password" placeholder='*Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light #e040fb purple accent-2" onClick={() => PostData()}>
                    Sign Up  
                </button>
            </div>
        </div>
    )
}

export default SignUp;