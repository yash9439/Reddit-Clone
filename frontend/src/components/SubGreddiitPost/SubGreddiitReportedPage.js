import React, { Fragment, useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const SubGreddiitReportedPage = () => {
    const { state, dipatch } = useContext(UserContext)
    const [data, setData] = useState([])
    const [item, setItem] = useState({})
    const [callUseEffect, setCallUseEffect] = useState("0")

    const [count, setCount] = useState(4);
    const [text, setText] = useState("Block User");
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        return () => {
          clearInterval(intervalId);
        };
      }, [intervalId]);

    useEffect(() => {
        setItem(JSON.parse(localStorage.getItem("CurrentGreddiit")))
        if (callUseEffect === "0") {
            setCallUseEffect("1")
        }
        else {
            setCallUseEffect("0")
        }
    }, [])

    useEffect(() => {

        fetch("http://localhost:5010/oldReport", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .catch(err => {
                console.log(err)
            })



        var url = "http://localhost:5010/getReport?_id="
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
                console.log(result.result, "Report console log is here !!!!!")
                setData(result.result)
                // console.log(data, "YOYO")
            })

    }, [callUseEffect])

    const PermanentBlockUser = (id_user,id_greddiit,_id,mail,mail2) => {
        if(mail2 === state.email) {
            alert("Cant block Moderator")
            return
        }
        fetch("http://localhost:5010/subPost_isBlocked", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id_user:id_user,
                id_greddiit:id_greddiit,
                id: _id
            })
        }).then(res => res.json())
            .catch(err => {
                console.log(err)
            })

            
        fetch("http://localhost:5010/reportBlock_user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id: _id
            })
        }).then(res => res.json())
            .catch(err => {
                console.log(err)
            })

        if (callUseEffect === "0") {
            setCallUseEffect("1")
        }
        else {
            setCallUseEffect("0")
        }
        fetch("http://localhost:5010/reportBlock_user_post", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id_user:id_user,
                id_greddiit:id_greddiit,
                id: _id
            })
        }).then(res => res.json())
            .catch(err => {
                console.log(err)
            })
            fetch("http://localhost:5010/membersDetBlock", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "DASS " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    id: JSON.parse(localStorage.getItem("CurrentGreddiit"))._id
                })
            }).then(res => res.json())

            fetch("http://localhost:5010/mail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "DASS " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    mail: mail,
                    msg: "Response By Moderator : Block"
                })
            })

            fetch("http://localhost:5010/mail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "DASS " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    mail: mail2,
                    msg: "Moderator has blocked you"
                })
            })
            
        alert("Blocked");
    }

    const BlockUser = (id_user,id_greddiit,_id,mail,mail2) => {
        if (!intervalId) {
            let currentCount = count;
            const id = setInterval(() => {
              currentCount--;
              if (currentCount >= 0) {
                setText(`Cancel in ${currentCount} sec`);
              }
              if (currentCount === 0) {
                setTimeout(() => {
                  // Trigger your function here
                  setText("Blocked!!");
                  PermanentBlockUser(id_user,id_greddiit,_id,mail,mail2);
                }, 1000);
              }
            }, 1000);
            setIntervalId(id);
          } else {
            clearInterval(intervalId);
            setIntervalId(null);
            setCount(4);
            setText("Block User");
          }
    }

    const DeletePost = (id, id_post,mail,mail2) => {
        fetch("http://localhost:5010/reportDelete", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => res.json())
            .catch(err => {
                console.log(err)
            })

        fetch("http://localhost:5010/reportDelete_post", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id: id_post
            })
        }).then(res => res.json())
            .catch(err => {
                console.log(err)
            })

        if (callUseEffect === "0") {
            setCallUseEffect("1")
        }
        else {
            setCallUseEffect("0")
        }

        fetch("http://localhost:5010/numDelete", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id: JSON.parse(localStorage.getItem("CurrentGreddiit"))._id
            })
        }).then(res => res.json())


        fetch("http://localhost:5010/mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                mail: mail,
                msg: "Response By Moderator : Delete Post"
            })
        })

        fetch("http://localhost:5010/mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                mail: mail2,
                msg: "Moderated has deleted your post"
            })
        })

        alert("Deleted");
    }

    const Ignore = (id,mail,mail2) => {
        fetch("http://localhost:5010/reportIgnore", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => res.json())
            .catch(err => {
                console.log(err)
            })

        if (callUseEffect === "0") {
            setCallUseEffect("1")
        }
        else {
            setCallUseEffect("0")
        }


        fetch("http://localhost:5010/mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                mail: mail,
                msg: "Response By Moderator : Ignore"
            })
        })


        alert("Report Ignored");
    }


    return (
        <Fragment>
            <div className='card home-card' style={{ display: "flex" }}>
                <div className='card-content'>
                    <h2>Reports</h2>
                    {data.map(item => {
                        return (
                            <div className='card home-card' style={{ display: "flex" }}>
                                <div className='card-content'>
                                    <p>Reported By: {item.reportedBy.fname + " " + item.reportedBy.lname} </p>
                                    <p>Reported on user: {item.reportedOnPost.postedBy.fname + " " + item.reportedOnPost.postedBy.lname} </p>
                                    <p>Post Text: {item.reportedOnPost.text} </p>
                                    <p>Concern: {item.reportConcern} </p>
                                    {item.reportStatus === "Ignored" ? (<Fragment><button className="btn waves-effect waves-light #ff1744 blue accent-3" onClick={() => BlockUser(item._id,item.reportedBy.email,item.reportedOnPost.postedBy.email)} disabled >
                                        Block User
                                    </button>
                                    <button className="btn waves-effect waves-light #ff1744 red accent-3" onClick={() => DeletePost(item._id,item.reportedBy.email,item.reportedOnPost.postedBy.email)} disabled >
                                        Delete Post
                                    </button>                                    <button className="btn waves-effect waves-light #ff1744 green accent-3" onClick={() => Ignore(item._id,item.reportedBy.email,item.reportedOnPost.postedBy.email)} >
                                        Ignore
                                    </button></Fragment>) : item.reportStatus === "Blocked" ? (<Fragment><button className="btn waves-effect waves-light #ff1744 blue accent-3" 
                                    onClick={() => BlockUser(item.reportedOnPost.postedBy._id,item.reportedOnSubGreddiit._id,item._id,item.reportedBy.email,item.reportedOnPost.postedBy.email)} >
                                        {text}
                                    </button>                
                                    <button className="btn waves-effect waves-light #ff1744 red accent-3" onClick={() => DeletePost(item._id,item.reportedOnPost._id,item.reportedOnPost.postedBy.email)} disabled>
                                        Delete Post
                                    </button><button className="btn waves-effect waves-light #ff1744 green accent-3" onClick={() => Ignore(item._id,item.reportedBy.email,item.reportedOnPost.postedBy.email)} disabled>
                                        Ignore
                                    </button></Fragment>) : (<Fragment><button className="btn waves-effect waves-light #ff1744 blue accent-3" 
                                    onClick={() => BlockUser(item.reportedOnPost.postedBy._id,item.reportedOnSubGreddiit._id,item._id,item.reportedBy.email,item.reportedOnPost.postedBy.email)} >
                                        {text}
                                    </button>                
                                    <button className="btn waves-effect waves-light #ff1744 red accent-3" onClick={() => DeletePost(item._id,item.reportedOnPost._id,item.reportedBy.email,item.reportedOnPost.postedBy.email)} >
                                        Delete Post
                                    </button><button className="btn waves-effect waves-light #ff1744 green accent-3" onClick={() => Ignore(item._id,item.reportedBy.email,item.reportedOnPost.postedBy.email)} >
                                        Ignore
                                    </button></Fragment>)}
                                    {/* <button className="btn waves-effect waves-light #ff1744 blue accent-3" onClick={() => BlockUser(item)} >
                                        Block User
                                    </button>
                                    <button className="btn waves-effect waves-light #ff1744 red accent-3" onClick={() => DeletePost(item)} >
                                        Delete Post
                                    </button> */}
                                    {/* <button className="btn waves-effect waves-light #ff1744 green accent-3" onClick={() => Ignore(item._id)} >
                                        Ignore
                                    </button> */}
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default SubGreddiitReportedPage;