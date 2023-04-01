import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ChatOption() {
    const navigate = useNavigate();
    const [data,setData] = useState([])
    const [user2Id,setUser2Id] = useState()

    useEffect(() =>{
        fetch("http://localhost:5010/chat", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error)
            }
            else {
                // alert(data.message)
            }
            console.log(data.result)
            setData(data.result)
        }).catch(err => {
                // console.log(err)
            })
    },[])
    return (
        <Fragment>
        <h1>Chat</h1>
        {data.map(item => {
                        return (
                            <div className='card home-card' style={{ display: "flex" }}>
                                <div className='card-content'>
                                    {item.fname + " " + item.lname + "  "}
                                    <Link to="/chat"><button className="#8d6e63 brown lighten-1" onClick={() => {localStorage.setItem("User2Id",item._id)}}>
                                        Start Chat
                                    </button></Link>
                                </div>
                            </div>
                        )
                })}
        </Fragment>
    )
}

export default ChatOption;