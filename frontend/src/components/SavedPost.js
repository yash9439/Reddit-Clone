import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const SavedPost = () => {

    const [data, setData] = useState([])
    const [callUseEffect, setCallUseEffect] = useState("0")

    useEffect(() => {
        if (callUseEffect === "0") {
            setCallUseEffect("1")
        }
        else {
            setCallUseEffect("0")
        }
    }, [])
    
    useEffect(() => {
        fetch("http://localhost:5010/savedPost", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                // console.log(result.mySavedPost)
                setData(result.mySavedPost)
            })
    }, [callUseEffect])

    const DeleteSavedPost = (id) => {
        fetch("http://localhost:5010/deleteSavedPost", {
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
        alert("SavedPost Removed")
    }


    return (
        <Fragment>
            <h3>Saved Post</h3>
            {data.map((item) => {
                return (
                    <div>
                        <div className='card home-card' style={{ display: "flex" }}>
                            <div className="card-image" style={{ display: "flex" }}>
                                <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={item.subPostId.postedIn.photo} />
                                <div className='card-content'>
                                    <h6>Title: {item.subPostId.postedIn.title}</h6>
                                    <p>Description: {item.subPostId.postedIn.body}</p>
                                </div>
                            </div>
                            <hr></hr>
                            <h4>Saved Post</h4>
                            <div className='card home-card' style={{ display: "flex" }}>
                                <div className='card-content'>
                                    <button onClick={() => DeleteSavedPost(item._id)}>Remove from Saved Post</button>
                                    <h5>UpVotes: {item.subPostId.upVotes.length}</h5>
                                    <h5>DownVotes: {item.subPostId.downVotes.length}</h5>
                                    <h3>Text: {item.subPostId.text}</h3>
                                    {item.subPostId.comments.length ? 
                                        <div><h3>Comments</h3> {
                                            item.subPostId.comments.map(item_comment => {
                                                return (
                                                    <div>
                                                        { item_comment.postedBy.fname + ": " + item_comment.text}
                                                    </div>
                                                )
                                            })

                                        } </div> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </Fragment>
    )
}

export default SavedPost;