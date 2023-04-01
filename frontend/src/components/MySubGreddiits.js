import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const MySubGreddiits = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])

    const [edit, setEdit] = useState("0")
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const [tags_current, setTags_current] = useState("")
    const [tags, setTags] = useState([])
    const [bannedKeywords_current, setBannedKeywords_current] = useState("")
    const [bannedKeywords, setBannedKeywords] = useState([])
    const toggleEdit = () => {
        if (edit === "0") {
            setEdit("1")
        }
        else {
            setEdit("0")
        }
    }

    useEffect(() => {
        fetch("http://localhost:5010/myPost", {
            headers: {
                "Authorization": "DASS " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.myPost)
            })
    }, [])

    function censorString(bannedKeywords, largeString) {
        for (let i = 0; i < bannedKeywords.length; i++) {
          let regex = new RegExp(bannedKeywords[i], "gi");
          largeString = largeString.replace(regex, "*".repeat(bannedKeywords[i].length));
        }
        return largeString;
      }

    useEffect(() => {
        if (url) {
            console.log(url)
            console.log(title, body, url, tags, bannedKeywords)
            console.log(body)
            let censoredString = censorString(bannedKeywords, body);
            console.log(censoredString)
            if(censorString != body && bannedKeywords != []) {
                alert("Your Description contained some banned Keywords.")
            }

        fetch("http://localhost:5010/createPost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title: title,
                body: censoredString,
                photo: url,
                tags: tags,
                bannedKeywords: bannedKeywords
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data, "wow why")
                if (data.error) {
                    alert(data.error)
                    console.log(data.error, "data_error")
                } else {
                    console.log(data.post._id, "data")
                    stats(data.post._id)
                    alert("Created Post Successfully")
                }
            }).catch(err => {
                console.log(err)
            })
        setBannedKeywords([]);
        setTags([]);

        }
    }, [url])

    // const createPostinDatabase = (id_mem) => {
    //     console.log(id_mem,"WE need this id")
    //     fetch("http://localhost:5010/createPost", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "DASS " + localStorage.getItem("jwt")
    //         },
    //         body: JSON.stringify({
    //             title: title,
    //             body: body,
    //             photo: url,
    //             tags: tags,
    //             bannedKeywords: bannedKeywords,
    //             id_mem: id_mem
    //         })
    //     }).then(res => res.json())
    //         .then(data => {
    //             console.log(data, "wow why")
    //             if (data.error) {
    //                 alert(data.error)
    //                 console.log(data.error, "data_error")
    //             } else {
    //                 console.log(data.post._id, "!!!data")
    //                 setBannedKeywords([]);
    //                 setTags([]);
    //                 alert("Created Post Successfully")
    //             }
    //             // stats(data.post._id)
    //         }).catch(err => {
    //             console.log(err)
    //         })
    //     setBannedKeywords([]);
    //     setTags([]);
    // }

    const stats = (id) => {
        console.log(id,"Aaja aaja")
        fetch("http://localhost:5010/statsInit", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => res.json())
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

    const createPost = () => {
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

    const removeSubGreddiit = (id) => {
        console.log(id)
        fetch("http://localhost:5010/SubGreddiitDeleteJoinReq", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id: id
            }) 
        }).then(res => res.json())


        fetch("http://localhost:5010/SubGreddiitDelete", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => res.json())


        fetch("http://localhost:5010/SubGreddiitDeleteReport", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => res.json())


        fetch("http://localhost:5010/SubGreddiitDeleteSubPost", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => res.json())

        
        fetch("http://localhost:5010/SubGreddiitDeleteStats", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => res.json())



        fetch("http://localhost:5010/SubGreddiitDeleteSaved", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => res.json())

        alert("Subgreddiit Deleted Sucessfully")

    }


    return (
        <div className='home'>
            {/* <Link to="/Create">Create Post</Link> */}
            <button className="btn waves-effect waves-light #e040fb purple accent-2" onClick={() => { toggleEdit() }}>
                Create Post
            </button>
            {edit === "1" && createPost()}


            <h2>My Sub Greddiits</h2>
            {
                data.map(item => {
                    return (
                        <div className='card home-card' style={{ display: "flex" }}>
                            <div className="card-image" style={{ display: "flex" }}>
                                <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={item.photo} alt="Not available"/>
                                <div className='card-content'>
                                    <h6>Title: {item.title}</h6>
                                    <p>Description: {item.body}</p>
                                    <p>Number of People: {(item.listOfMembers).length}</p>
                                    <p>Number of SubPost: {item.numberOfSubPost}</p>
                                    <p>Banned Keywords: {item.bannedKeywords + " "}</p>
                                    <button className="#64dd17 light-green accent-4" onClick={() => {removeSubGreddiit(item._id)}} >
                                        Remove Sub Greddiit
                                    </button>
                                    <button className="#64dd17 light-green accent-4" onClick={() => {
                                        localStorage.setItem("CurrentGreddiit", JSON.stringify(item))
                                        console.log(item)
                                        navigate("/SubGreddiitPostTabs")
                                    }}>
                                        Open Sub Greddiit
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

export default MySubGreddiits;