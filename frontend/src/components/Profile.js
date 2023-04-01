import React, { Fragment, useEffect, useState } from 'react'

const Profile = () => {
    const [data, setData] = useState([])
    const [edit, setEdit] = useState("0")
    const [edit_follower, setEdit_follower] = useState("0")
    const [edit_following, setEdit_following] = useState("0")

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [username, setUsername] = useState("")
    const [age, setAge] = useState()
    const [contactNumber, setContactNumber] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const toggleEdit = () => {
        if (edit === "0") {
            setEdit("1")
        }
        else {
            setEdit("0")
        }
    }

    const toggleEdit_follower = () => {
        if (edit_follower === "0") {
            setEdit_follower("1")
        }
        else {
            setEdit_follower("0")
        }
    }

    const toggleEdit_following = () => {
        if (edit_following === "0") {
            setEdit_following("1")
        }
        else {
            setEdit_following("0")
        }
    }


    const UpdateData = () => {
        const newData = {
            fname: fname,
            lname: lname,
            username: username,
            email: email,
            age: age,
            contactNumber: contactNumber,
            password: password,
            followers: data[0].followers,
            following: data[0].following,
            data
        }
        setData([newData])
        fetch("http://localhost:5010/editprofile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify(newData)
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            setData([result])
        })
            .catch(err => {
                console.log(err)
            })
        setFname("");
        setLname("");
        setUsername("");
        setAge("");
        setContactNumber("");
        setEmail("");
        setPassword("");
    }

    const editProfile = () => {
        return (
            <div className="mycard">
                <div className="card auth-card">
                    <h2>Edit Profile</h2>
                    <input type="text" placeholder='*First Name' value={fname} onChange={(e) => setFname(e.target.value)} />
                    <input type="text" placeholder='*Last Name' value={lname} onChange={(e) => setLname(e.target.value)} />
                    <input type="text" placeholder='*Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="text" placeholder='*Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder='*Age' value={age} onChange={(e) => setAge(e.target.value)} />
                    <input type="text" placeholder='*Contact Numbner' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                    <input type="text" placeholder='*Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="btn waves-effect waves-light #e040fb purple accent-2" onClick={() => UpdateData()} >
                        Edit
                    </button>
                </div>
            </div>
        )
    }

    const remFollower = (id) => {
        fetch("http://localhost:5010/remfollower", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                follower: id
            })
        }).then(res => res.json())
        .then(result => {
            console.log(result)
        })
        fetch("http://localhost:5010/remfollowerOther", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => res.json())
        alert("Sucess")
    }

    const remFollowing = (id) => {
        fetch("http://localhost:5010/remfollowing", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                following: id
            })
        }).then(res => res.json())
        .then(result => {
            console.log(result)
        })
        fetch("http://localhost:5010/remfollowingOther", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => res.json())
        alert("Sucess")
    }


    const viewFollower = (dat) => {
        return (
            <div className='mycard'>
                <div className="card auth-card">
            <h3>View Follower</h3>
            {dat.map(item => {
                return (
                    <h4>{item.fname} <button onClick={() => {remFollower(item._id)}}>Remove</button></h4>
                )
            })
        }
            </div>
        </div>
        )   
    }


    const viewFollowing = (dat) => {
        return (
            <div className='mycard'>
                <div className="card auth-card">
            <h3>View Following</h3>
            {dat.map(item => {
                return (
                    <h4>{item.fname} <button onClick={() => {remFollowing(item._id)}}>Remove</button></h4>
                )
            })
        }
            </div>
        </div>
        )   
    }


    useEffect(() => {
        fetch("http://localhost:5010/profile", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.myprofile)
            })
    }, [])


    
    return (
        <div>
            {
                data.map(item => {
                    return (
                        <Fragment>
                            <div style={{
                                display: "flex",
                                justifyContent: "space around",
                                margin: "18px 0px"
                            }}>
                                <div>
                                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt="Not Available" />
                                </div>
                                <div>
                                    <h4>{item.fname + " " + item.lname + "(" + item.username + ")"}</h4>
                                    <h4>Age: {item.age}</h4>
                                    <h4>Phone number: {item.contactNumber}</h4>
                                    <h4>Email Id: {item.email}</h4>
                                    <div>
                                        <h5>{item.followers.length} followers
                                            <button className="btn waves-effect waves-light #ffd54f amber lighten-2" onClick={() => { toggleEdit_follower() }}>
                                                View Followers
                                            </button></h5>
                                            { edit_follower === "1" && viewFollower(item.followers) }
                                        <h5>{item.following.length} followings
                                            <button className="btn waves-effect waves-light #ffd54f amber lighten-2" onClick={() => { toggleEdit_following() }}>
                                                Edit Followings
                                            </button></h5>
                                            { edit_following === "1" && viewFollowing(item.following) }
                                        <button className="btn waves-effect waves-light #e040fb purple accent-2" onClick={() => { toggleEdit() }}>
                                            Edit Profile
                                        </button>
                                        {edit === "1" && editProfile()}
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )
                })
            }
        </div>
    )
}

export default Profile;