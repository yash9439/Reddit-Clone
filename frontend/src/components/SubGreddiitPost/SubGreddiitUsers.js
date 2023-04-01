import React, { Fragment, useEffect, useState } from 'react'

const SubGreddiitUsers = () => {
    const [data, setData] = useState([])
    const [data_ban, setData_ban] = useState([])
    const [item, setItem] = useState({})
    const [callUseEffect , setCallUseEffect] = useState("0")

    useEffect(() => {
        setItem(JSON.parse(localStorage.getItem("CurrentGreddiit")))
        if(callUseEffect === "0") {
            setCallUseEffect("1")
        }
        else {
            setCallUseEffect("0")
        }
    }, [])

    useEffect(() => {
        var url = "http://localhost:5010/joinedUser?_id="
        // url += item._id
        url += JSON.parse(localStorage.getItem("CurrentGreddiit"))._id
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result)
                console.log(data, "YOYO")
            })

            var url2 = "http://localhost:5010/blockedUser?_id="
            // url2 += item._id
            url2 += JSON.parse(localStorage.getItem("CurrentGreddiit"))._id
            fetch(url2, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "DASS " + localStorage.getItem("jwt")
                }
            }).then(res => res.json())
                .then(result => {
                    console.log(result)
                    setData_ban(result)
                    console.log(data_ban, "YOYO")
                })

    },[callUseEffect])


    return (
        <Fragment>
            <div className='card home-card' style={{ display: "flex" }}>
                <div className='card-content'>
                    <h2>Joined Users</h2>
                    {data.map(item => {
                        return (
                            <p>{item.memberDetails.fname + " " + item.memberDetails.lname } </p>
                        )
                    })
                    }
                </div>
            </div>
            <div className='card home-card' style={{ display: "flex" }}>
                <div className='card-content'>
                    <h2>Blocked Users</h2>
                    {data_ban.map(item => {
                        return (
                            <p>{item.memberDetails.fname + " " + item.memberDetails.lname }</p>
                        )
                    })
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default SubGreddiitUsers;