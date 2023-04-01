import React, { useState, useEffect } from 'react'

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const [tags_current, setTags_current] = useState("")
    const [tags, setTags] = useState([])
    const [bannedKeywords_current, setBannedKeywords_current] = useState("")
    const [bannedKeywords, setBannedKeywords] = useState([])

    useEffect(() => {
        if (url) {
            console.log(url)
            console.log(title, body, url, tags, bannedKeywords)
            fetch("http://localhost:5010/createPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "DASS " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title: title,
                    body: body,
                    photo: url,
                    tags: tags,
                    bannedKeywords: bannedKeywords
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data, "data")
                    if (data.error) {
                        alert(data.error)
                        console.log(data.error, "data_error")
                    } else {
                        console.log(data.post._id, "data")
                        Accept(data.post._id)
                        alert("Created Post Successfully")

                    }
                }).catch(err => {
                    console.log(err)
                })
        }
        setBannedKeywords([]);
        setTags([]);
    }, [url])

    const Accept = (memberOf) => {
        fetch("http://localhost:5010/addMember", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                memberOf: memberOf,
                isBlocked: "0",
                memberDetails: JSON.parse(localStorage.getItem("user"))._id
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
    }

    const postDetails = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "DASS-Assignment")
        data.append("cloud_name", "dj8nujy7y")
        fetch("https://api.cloudinary.com/v1_1/dj8nujy7y/image/upload", {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
            <div className='card-content black-text'>
                <div className="card home-card">
                    <h2>Create Post</h2>
                    <input type="body" className="form-control" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="body" className="form-control" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)} />
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Upload Image</span>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <input type="body" className="form-control" placeholder="tags" value={tags_current} onChange={(e) => setTags_current(e.target.value)} />
                        <button className="#00e676 green accent-3" onClick={() => {
                            setTags([...tags, tags_current])
                            alert("Tag added")
                        }} >
                            Add Tag
                        </button>
                    </div>
                    <div style={{ display: "flex" }}>
                        <input type="body" className="form-control" placeholder="bannedKeywords" value={bannedKeywords_current} onChange={(e) => setBannedKeywords_current(e.target.value)} />
                        <button className="#00e676 green accent-3" onClick={() => {
                            setBannedKeywords([...bannedKeywords, bannedKeywords_current])
                            alert("keyword added")
                        }} >
                            Add Banned Keyword
                        </button>
                    </div>
                    <button className="btn waves-effect waves-light #e040fb purple accent-2" onClick={() => postDetails()} >
                        Submit Post
                    </button>
                </div>
        </div>
    )

}


export default CreatePost;