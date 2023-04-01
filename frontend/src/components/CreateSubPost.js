// import React, { useState, useEffect } from 'react'

// const CreateSubPost = () => {
//     const [text, setText] = useState("")
//     // const [postedBy, setPostedBy] = useState([])
//     // const [postedIn, setPostedIn] = useState([])
//     // const [upvotes, setUpvotes] = useState(0)
//     // const [downvotes, setDownvotes] = useState(0)

//     const [item, setItem] = useState({})
//     useEffect(() => {
//         setItem(JSON.parse(localStorage.getItem("CurrentGreddiit")))
//     }, [])

//     const subPostDetails = () => {
//         fetch("http://localhost:5010/createSubPost", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "DASS " + localStorage.getItem("jwt")
//             },
//             body: JSON.stringify({
//                 text: text,
//                 postedIn: item._id
//             })
//         }).then(res => res.json())
//             .then(data => {
//                 console.log(item._id, "subPostChk")
//                 if (data.error) {
//                     alert(data.error)
//                     console.log(data.error, "data_error")
//                 } else {
//                     alert("Created Post Successfully")
//                 }
//             }).catch(err => {
//                 console.log(err)
//             })
            

//             fetch("http://localhost:5010/postTiming", {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": "DASS " + localStorage.getItem("jwt")
//                 },
//                 body: JSON.stringify({
//                     id: JSON.parse(localStorage.getItem("CurrentGreddiit"))._id
//                 })
//             }).then(res => res.json())
// }

// return (
//     <div className='card-content black-text'>
//         <div className="card home-card">
//             <h2>Create Post</h2>
//             <input type="body" className="form-control" placeholder="title" value={text} onChange={(e) => setText(e.target.value)} />
//         </div>
//         <button className="btn waves-effect waves-light #e040fb purple accent-2" onClick={() => subPostDetails()} >
//             Submit SubPost
//         </button>
//     </div>
// )

// }



