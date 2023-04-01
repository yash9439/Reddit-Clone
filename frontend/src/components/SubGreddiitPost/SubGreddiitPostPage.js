import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
// import Example from '../CreateSubPost';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const SubGreddiitPostPage = () => {
    const { state, dipatch } = useContext(UserContext)
    const navigate = useNavigate();
    const [item, setItem] = useState({})
    const [comments, setComments] = useState("")
    const [reportConcern, setReportConcern] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {
        setItem(JSON.parse(localStorage.getItem("CurrentGreddiit"))) 
        if (callUseEffect === "0") {
            setCallUseEffect("1")
        }
        else {
            setCallUseEffect("0")
        }
    }, [])

    const [data, setData] = useState([])
    const [callUseEffect, setCallUseEffect] = useState("0")

    useEffect(() => {
        var url = "http://localhost:5010/mySubPost?_id="
        // url += item._id
        url += JSON.parse(localStorage.getItem("CurrentGreddiit"))._id
        // console.log(url, "TEMPOR")
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            }
            // body: JSON.stringify({
            // _id: item._id
            // })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.mySubPost)
            })
    }, [callUseEffect])

    function censorString(bannedKeywords, largeString) {
        for (let i = 0; i < bannedKeywords.length; i++) {
          let regex = new RegExp(bannedKeywords[i], "gi");
          largeString = largeString.replace(regex, "*".repeat(bannedKeywords[i].length));
        }
        return largeString;
      }


    const saveForLater = (id) => {
        console.log(id)
        fetch("http://localhost:5010/saveSubPost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                subPostId: id,
                SubGreddiitId: JSON.parse(localStorage.getItem("CurrentGreddiit"))._id
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                }
                else {
                    alert(data.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const UpVote = (id) => {
        fetch("http://localhost:5010/upvote", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                subPostId: id,
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const DownVote = (id) => {
        fetch("http://localhost:5010/downvote", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                subPostId: id,
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const Follow = (postedBy) => {
        fetch("http://localhost:5010/following", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postedBy: postedBy
            })
        }).then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error)
            }
            else {
                alert(data.message)
            }
        })
        fetch("http://localhost:5010/follower", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postedBy: postedBy
            })
        }).then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error)
            }
            else {
                alert(data.message)
            }
        })
        // alert("Followed Successfully")
    }


    const AddComments = (id) => {
        let censoredString = censorString(item.bannedKeywords, comments);
        fetch("http://localhost:5010/comment", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                text: censoredString,
                subPostId: id
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                }
                else {
                    if (callUseEffect === "0") {
                        setCallUseEffect("1")
                    }
                    else {
                        setCallUseEffect("0")
                    }
                    alert("Comment Successfully Added")
                }
            }).catch(err => {
                console.log(err)
            })

    }

    const report = (id,id_postedBy) => {
        console.log(id)
        fetch("http://localhost:5010/createReport", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                reportedOnPost: id,
                reportedOnSubGreddiit: JSON.parse(localStorage.getItem("CurrentGreddiit"))._id,
                reportConcern: reportConcern,
                post_postedBy: id_postedBy
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                }
                else {
                    alert(data.message)
                    if (data.message === "Reported Successfully") {
                        fetch("http://localhost:5010/numReport", {
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
                }
            }).catch(err => {
                console.log(err)
            })


    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const subPostDetails = () => {
        let censoredString = censorString(item.bannedKeywords, text);
        fetch("http://localhost:5010/createSubPost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                text: censoredString,
                postedIn: item._id
            })
        }).then(res => res.json())
            .then(data => {
                console.log(item._id, "subPostChk")
                if (data.error) {
                    alert(data.error)
                    console.log(data.error, "data_error")
                } else {
                    alert("Created Post Successfully")
                }
            }).catch(err => {
                console.log(err)
            })
            

            fetch("http://localhost:5010/postTiming", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "DASS " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    id: JSON.parse(localStorage.getItem("CurrentGreddiit"))._id
                })
            }).then(res => res.json())


            fetch("http://localhost:5010/incPostCnt", {
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
<div style={{ display: "flex", width: "100%" }}>
  <div style={{ flex: "0 0 40%", display: "flex", justifyContent: "flex-start" }}>
            <div className='card home-card' style={{ display: "flex" }}>
                <div className="card-image" style={{ display: "flex" }}>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={item.photo} alt="Not Available" />
                    <div className='card-content'>
                        <h6>Title: {item.title}</h6>
                        <p>Description: {item.body}</p>
                        {/* <p>Number of People: {item.numberOfPeople}</p> */}
                        {/* <p>Number of SubPost: {item.numberOfSubPost}</p> */}
                        {/* <p>Banned Keywords: {item.bannedKeywords + " "}</p> */}
                        <button className="#8d6e63 brown lighten-1" onClick={handleShow}>
                            Create Sub Post
                        </button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create Post</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><input type="body" className="form-control" placeholder="title" value={text} onChange={(e) => setText(e.target.value)} /></Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => subPostDetails()}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
            </div>
            <div style={{ flex: 1 }}>
                {
                    data.map(item => {
                        return (
                            <div className='card home-card' style={{ display: "flex" }}>
                                <div className='card-content'>
                                    <button className="#8d6e63 brown lighten-1" onClick={() => report(item._id,item.postedBy)}>
                                        Report
                                    </button>
                                    <input type="text" placeholder='Report Concern' value={reportConcern} onChange={(e) => setReportConcern(e.target.value)} />
                                    <button className="#8d6e63 brown lighten-1" onClick={() => saveForLater(item._id)}>
                                        Save For Later
                                    </button>
                                    {!item.upVotes.includes(state._id) && !item.downVotes.includes(state._id) ?
                                        <div><button className="#8d6e63 brown lighten-1" onClick={() => UpVote(item._id)}>
                                            UpVote
                                        </button>
                                            <button className="#8d6e63 brown lighten-1" onClick={() => DownVote(item._id)}>
                                                DownVote
                                            </button> </div> :
                                        <div> {item.upVotes.includes(state._id) ?
                                            <button className="#8d6e63 brown lighten-1" onClick={() => DownVote(item._id)}>
                                                DownVote
                                            </button> : <button className="#8d6e63 brown lighten-1" onClick={() => UpVote(item._id)}>
                                                UpVote
                                            </button>} </div>}
                                    <button className="#8d6e63 brown lighten-1" onClick={() => Follow(item.postedBy)}>
                                        Follow
                                    </button>
                                    <h5>UpVotes: {item.upVotes.length}</h5>
                                    <h5>DownVotes: {item.downVotes.length}</h5>
                                    {item.isBlocked == '0' ? (<h3>PostedBy: {item.postedBy.username}</h3>) : (<h3>PostedBy: BlockedUser </h3>)}
                                    <h3>Text: {item.text}</h3>
                                    <input type="text" placeholder='Comment' value={comments} onChange={(e) => setComments(e.target.value)} />
                                    <button className="#536dfe indigo accent-2" onClick={() => {
                                        AddComments(item._id)
                                    }}>
                                        Add Comment
                                    </button>
                                    {item.comments.length ?
                                        <div><h3>Comments</h3> {
                                            item.comments.map(item_comment => {
                                                return (
                                                    <div>
                                                        {item_comment.postedBy.fname + ": " + item_comment.text}
                                                    </div>
                                                )
                                            })

                                        } </div> : null
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SubGreddiitPostPage;