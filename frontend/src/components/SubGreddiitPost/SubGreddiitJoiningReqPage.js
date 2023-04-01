import React, { useEffect, useState } from 'react'

const SubGreddiitJoiningReqPage = () => {
    const [data, setData] = useState([])
    const [item, setItem] = useState({})

    useEffect(() => {
        setItem(JSON.parse(localStorage.getItem("CurrentGreddiit")))
    }, [])

    useEffect(() => {
        var url = "http://localhost:5010/reqPage?_id="
        // url += item._id
        url += JSON.parse(localStorage.getItem("CurrentGreddiit"))._id
        console.log(url, "item")
        fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "DASS " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(JSON.parse(localStorage.getItem("CurrentGreddiit"))._id, "Req Jn")
                setData(result.reqpage)

            })
    }, [item])

    const Reject = (memberDetails, memberOf, id) => {
        alert("Rejected Sucessfully")

        fetch("http://localhost:5010/removeReq", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                _id: id
            })
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                var url = "http://localhost:5010/reqPage?_id="
                // url += item._id
                url += JSON.parse(localStorage.getItem("CurrentGreddiit"))._id
                fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": "DASS " + localStorage.getItem("jwt")
                    }
                }).then(res => res.json())
                    .then(result => {
                        console.log(result)
                        setData(result.reqpage)
                    })
            })

    }

    const Accept = (memberDetails, memberOf, id) => {
        fetch("http://localhost:5010/addMember", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                memberOf: memberOf,
                memberDetails: memberDetails
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data, "data")
                if (data.error) {
                    alert(data.error)
                    console.log(data.error, "data_error")
                } else {
                    alert("Joined Sucessfully")
                }
            }).catch(err => {
                console.log(err)
            })

        fetch("http://localhost:5010/removeReq", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                _id: id
            })
        }).then(res => res.json())
            .then(resu => {
                var url = "http://localhost:5010/reqPage?_id="
                // url += item._id
                url += JSON.parse(localStorage.getItem("CurrentGreddiit"))._id
                fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": "DASS " + localStorage.getItem("jwt")
                    }
                }).then(res => res.json())
                    .then(result => {
                        console.log(result)
                        setData(result.reqpage)
                    })
            })

            fetch("http://localhost:5010/membersDetJoin", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "DASS " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    id: JSON.parse(localStorage.getItem("CurrentGreddiit"))._id
                })
            }).then(res => res.json())


    }



    return (
        <div className='home'>
            <h2>Join Requsets</h2>
            {
                data.map(item => {
                    return (
                        <div className='card home-card' style={{ display: "flex" }}>
                            <div className="card-image" style={{ display: "flex" }}>
                                <div className='card-content'>
                                    {item.postedBy.fname + " " + item.postedBy.lname + "(" + item.postedBy.username + ")"}
                                    <button className="btn waves-effect waves-light #ff1744 red accent-3" onClick={() => Reject(item.postedBy._id, item.postedIn, item._id)}>
                                        Reject
                                    </button>
                                    <button className="btn waves-effect waves-light #e040fb purple accent-2" onClick={() => Accept(item.postedBy._id, item.postedIn, item._id)}>
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default SubGreddiitJoiningReqPage;