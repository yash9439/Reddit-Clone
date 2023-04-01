import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import fuzzysearch from 'fuzzysearch';

const MySubGreddiits = () => {
    const navigate = useNavigate();
    const [allData, setAllData] = useState([])
    const [dataJoined_mod, setDataJoined_mod] = useState([])
    const [dataJoined, setDataJoined] = useState([])
    const [dataBlocked, setDataBlocked] = useState([])
    const [dataNotJoined, setDataNotJoined] = useState([])
    const [dataLeft, setDataLeft] = useState([])

    const [searchInput, setSearchInput] = useState("")
    const [sortFilterChk, setSortFilterChk] = useState("0")
    const [searchData,setSearchData] = useState([])
    const [filterData,setFilterData] = useState([])

    useEffect(() => {
        fetch("http://localhost:5010/allPost", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result.posts, "all")
                setAllData(result.posts)
                setSearchData(result.posts)
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:5010/myJoinedPostMod", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result, "my mod")
                setDataJoined_mod(result.myPost)
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:5010/myJoinedPost", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result, "Joined")
                setDataJoined(result.myPost)
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:5010/myBlockedPost", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result, "myBlocked")
                setDataBlocked(result.myPost)
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:5010/myNotJoinedPost", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result, "Not Joined")
                setDataNotJoined(result.myPost)
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:5010/myLeftPost", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result, "My Left")
                setDataLeft(result.myPost)
            })
    }, [])

    const PostReq = (id) => {
        fetch("http://localhost:5010/createReq", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "DASS " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postedIn: id
            })
        }).then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.error) {
                    // console.log(data.error, " " , data.message)
                    alert(data.error)
                }
                else {
                    console.log(data.error, " ", data.message)
                    alert(data.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }


    const LeavePost = (_id) => {
        fetch("http://localhost:5010/leavePost", {
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

            fetch("http://localhost:5010/membersDetLeft", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "DASS " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    id: _id
                })
            }).then(res => res.json())


        alert("Left");
    }

    const Visit = () => {
        fetch("http://localhost:5010/dailyVisitor", {
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



    useEffect(() => {
            const filteredArray = allData.filter(element => {
                const title = element.title.toLowerCase();
                return fuzzysearch(searchInput, title);
              });
              setSearchData(filteredArray);
              console.log(searchData);
              if(searchInput == "") {
                setSortFilterChk('0')
            }
            else {
                setSortFilterChk('1')
            }
    },[searchInput])


    // setSearchData(searchData.sort((a, b) => {
    //     if (sortCriteria === 'ascendingTitle') {
    //       return a.title.localeCompare(b.title);
    //     } else if (sortCriteria === 'descendingTitle') {
    //       return b.title.localeCompare(a.title);
    //     } else if (sortCriteria === 'numberOfMembers') {
    //       return a.listOfMembers.length - b.listOfMembers.length;
    //     } else if (sortCriteria === 'date') {
    //       return a.date - b.date;
    //     }
    //   }))

      const [selectedCheckbox, setSelectedCheckbox] = useState(null);
      const [sortState, setSortState] = useState("0")

      // sortState = 1(Ascending) 2(Descending) 3(Following) 4(Date) 
      //     134 143 234 243
      //     341 314 324 342
      //     431 413 423 432

      const handleChange = (event) => {
        setSelectedCheckbox(event.target.value);
      };

      const AscendingFunc = () => {
        setFilterData(searchData.sort((a, b) => a.title.localeCompare(b.title)));
        if(sortFilterChk == '1') {
            setSortFilterChk('2')
        }
        else {
            setSortFilterChk('1')
        }
        console.log(searchData)
      }

      const DescendingFunc = () => {
        setFilterData(searchData.sort((a, b) => b.title.localeCompare(a.title)));
        if(sortFilterChk == '1') {
            setSortFilterChk('2')
        }
        else {
            setSortFilterChk('1')
        }
        console.log(searchData)
      }

      const FollowersFunc = () => {
        setFilterData(searchData.sort((a, b) => b.listOfMembers.length - a.listOfMembers.length));
        if(sortFilterChk == '1') {
            setSortFilterChk('2')
        }
        else {
            setSortFilterChk('1')
        }
        console.log(searchData)
      }

      const DateFunc = () => {
        setFilterData(searchData.sort((a, b) => new Date(a.date) - new Date(b.date)));
        if(sortFilterChk == '1') {
            setSortFilterChk('2')
        }
        else {
            setSortFilterChk('1')
        }
        console.log(searchData)
      }

      const ResetFunc = () => {
        setSortFilterChk('0')
        alert("Reset")
      }


return (
    <div className='home'>
        <input type="search" className="form-control" placeholder="search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        <div>
            <button className="#8c9eff indigo accent-1" type="button" onClick={() => AscendingFunc()}>Ascending</button>
            <button className="#8c9eff indigo accent-1" type="button" onClick={() => DescendingFunc()}>Descending</button>
            <button className="#8c9eff indigo accent-1" type="button" onClick={() => FollowersFunc()}>Followers</button>
            <button className="#8c9eff indigo accent-1" type="button" onClick={() => DateFunc()}>Date</button>
            <button className="#8c9eff indigo accent-1" type="button" onClick={() => ResetFunc()}>Reset</button>
        </div>

        {sortFilterChk === "0" ? (<Fragment>{
            dataJoined_mod.map(item => {
                return (
                    <div className='card home-card' style={{ display: "flex" }}>
                        <div className="card-image" style={{ display: "flex" }}>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={item.photo} alt="Not Available" />
                            <div className='card-content'>
                                <h6 onClick={() => {
                                    localStorage.setItem("CurrentGreddiit", JSON.stringify(item))
                                    Visit()
                                    navigate("/SubGreddiitPostPage")
                                }}>Title: {item.title}</h6>
                                <p>Description: {item.body}</p>
                                <p>Number of People: {item.numberOfPeople}</p>
                                <p>Number of SubPost: {item.numberOfSubPost}</p>
                                <p>Banned Keywords: {item.bannedKeywords + " "}</p>
                                <button className="#8c9eff indigo accent-1" type="button" disabled>Leave</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        {
            dataJoined.map(item => {
                return (
                    <div className='card home-card' style={{ display: "flex" }}>
                        <div className="card-image" style={{ display: "flex" }}>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={item.photo} alt="Not Available" />
                            <div className='card-content'>
                                <h6 onClick={() => {
                                    localStorage.setItem("CurrentGreddiit", JSON.stringify(item))
                                    Visit()
                                    navigate("/SubGreddiitPostPage")
                                }}>Title: {item.title}</h6>
                                <p>Description: {item.body}</p>
                                <p>Number of People: {item.numberOfPeople}</p>
                                <p>Number of SubPost: {item.numberOfSubPost}</p>
                                <p>Banned Keywords: {item.bannedKeywords + " "}</p>
                                <button className="#8c9eff indigo accent-1" type="button" onClick={() => LeavePost(item._id)}>Leave</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        {
            dataBlocked.map(item => {
                return (
                    <div className='card home-card' style={{ display: "flex" }}>
                        <div className="card-image" style={{ display: "flex" }}>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={item.photo} alt="Not Available" />
                            <div className='card-content'>
                                <h6>Title: {item.title}</h6>
                                <p>Description: {item.body}</p>
                                <p>Number of People: {item.numberOfPeople}</p>
                                <p>Number of SubPost: {item.numberOfSubPost}</p>
                                <p>Banned Keywords: {item.bannedKeywords + " "}</p>
                                <button className="#8c9eff indigo accent-1" type="button" disabled>Blocked</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        {
            dataNotJoined.map(item => {
                return (
                    <div className='card home-card' style={{ display: "flex" }}>
                        <div className="card-image" style={{ display: "flex" }}>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={item.photo} alt="Not Available" />
                            <div className='card-content'>
                                <h6>Title: {item.title}</h6>
                                <p>Description: {item.body}</p>
                                <p>Number of People: {item.numberOfPeople}</p>
                                <p>Number of SubPost: {item.numberOfSubPost}</p>
                                <p>Banned Keywords: {item.bannedKeywords + " "}</p>
                                <button className="#8c9eff indigo accent-1" type="button" onClick={() => {
                                    // localStorage.setItem("CurrentGreddiit",JSON.stringify(item))
                                    PostReq(item._id)
                                }}>Join</button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        {
            dataLeft.map(item => {
                return (
                    <div className='card home-card' style={{ display: "flex" }}>
                        <div className="card-image" style={{ display: "flex" }}>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={item.photo} alt="Not Available" />
                            <div className='card-content'>
                                <h6>Title: {item.title}</h6>
                                <p>Description: {item.body}</p>
                                <p>Number of People: {item.numberOfPeople}</p>
                                <p>Number of SubPost: {item.numberOfSubPost}</p>
                                <p>Banned Keywords: {item.bannedKeywords + " "}</p>
                                <button className="#8c9eff indigo accent-1" type="button" disabled> Once Left </button>
                            </div>
                        </div>
                    </div>
                )
            })
        }</Fragment>) : (<Fragment>{ sortFilterChk === "2" ? (<Fragment>{
            filterData.map(item => {
                return (
                    <div className='card home-card' style={{ display: "flex" }}>
                        <div className="card-image" style={{ display: "flex" }}>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={item.photo} alt="Not Available" />
                            <div className='card-content'>
                                <h6 onClick={() => {
                                    localStorage.setItem("CurrentGreddiit", JSON.stringify(item))
                                    Visit()
                                    navigate("/SubGreddiitPostPage")
                                }}>Title: {item.title}</h6>
                                <p>Description: {item.body}</p>
                                <p>Number of People: {item.numberOfPeople}</p>
                                <p>Number of SubPost: {item.numberOfSubPost}</p>
                                <p>Banned Keywords: {item.bannedKeywords + " "}</p>
                                {/* <button className="#8c9eff indigo accent-1" type="button" disabled>Leave</button> */}
                            </div>
                        </div>
                    </div>
                )
            })
        }</Fragment>) : (<Fragment>{
            searchData.map(item => {
                return (
                    <div className='card home-card' style={{ display: "flex" }}>
                        <div className="card-image" style={{ display: "flex" }}>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={item.photo} alt="Not Available" />
                            <div className='card-content'>
                                <h6 onClick={() => {
                                    localStorage.setItem("CurrentGreddiit", JSON.stringify(item))
                                    Visit()
                                    navigate("/SubGreddiitPostPage")
                                }}>Title: {item.title}</h6>
                                <p>Description: {item.body}</p>
                                <p>Number of People: {item.numberOfPeople}</p>
                                <p>Number of SubPost: {item.numberOfSubPost}</p>
                                <p>Banned Keywords: {item.bannedKeywords + " "}</p>
                                {/* <button className="#8c9eff indigo accent-1" type="button" disabled>Leave</button> */}
                            </div>
                        </div>
                    </div>
                )
            })
        }</Fragment>)}</Fragment>)}
        
    </div>
)
}

export default MySubGreddiits;