import React, { Fragment, useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
const moment = require('moment');

const SubGreddiitStats = () => {
    const [data, setData] = useState([])
    const [dataPost, setDataPost] = useState([])
    const [dataMem, setDataMem] = useState([])
    const [dataVisit, setDataVisit] = useState([])
    const [item, setItem] = useState({})

    const [_GraphData,_setGraphData] = useState([])  
    const [_GraphData1,_setGraphData1] = useState([])
    const [_GraphData2,_setGraphData2] = useState([])

    const [UseEffectCall,SetUseEffect] = useState("0")
 
    const [graphData, setGraphData] = useState([]);
    const [graphData1, setGraphData1] = useState([]);
    const [graphData2, setGraphData2] = useState([]);

    useEffect(() => {
        setItem(JSON.parse(localStorage.getItem("CurrentGreddiit")))
    }, []) 


    useEffect(() => {
        var url = "http://localhost:5010/getStats?_id="
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
                console.log(result.stats[0].postTiming," resultiii")
                setData(result.stats[0])
                setDataPost(result.stats[0].postTiming)
                setDataMem(result.stats[0].listOfMembers)
                setDataVisit(result.stats[0].numberOfDailyVisitor)                
            })
                            if(UseEffectCall === "0") {
                    SetUseEffect("1")
                }
                else {
                    SetUseEffect("0") 
                } 
    }, [item])
    
    
    const output = [];

    useEffect(() => {
      const groupedDataPostVsDate = dataPost.reduce((acc, item) => {
        const date = moment(item.actionDate).format('YYYY-MM-DD');
        if (!acc[date]) {
          acc[date] = { date, count: 1 };
        } else {
          acc[date].count += 1;
        }
        return acc;
      }, {});
    
      const groupedDataVisitorVsDate = dataVisit.reduce((acc, item) => {
        const date = moment(item.actionDate).format('YYYY-MM-DD');
        if (!acc[date]) {
          acc[date] = { date, count: 1 };
        } else {
          acc[date].count += 1;
        }
        return acc;
      }, {});
    
      
      let count = 0;
    
      dataMem.forEach(entry => {
        const date = entry.actionDate.split("T")[0];
        const isBlocked = entry.isBlocked;
    
        if (output.length === 0 || output[output.length - 1].date !== date) {  
          output.push({ date, count });
        }
    
        if (isBlocked === "0") {
          count += 1;
        } else if (isBlocked === "1" || isBlocked === "2") {
          count -= 1;
        }
    
        output[output.length - 1].count = count;
      });
    
      setGraphData(output);
      setGraphData1(Object.values(groupedDataPostVsDate));
      setGraphData2(Object.values(groupedDataVisitorVsDate));
    }, [dataPost, dataVisit, dataMem]);
    
    
      const Graph = () => {
        // const [graphData, setGraphData] = useState([]);
      
        // useEffect(() => {
        //   setGraphData(output);
        //   // console.log("asdfghjkl")
        // }, []); 

      // console.log("asdfghjkl1234567890")
        return ( 
          <BarChart
            width={500}
            height={300}
            data={graphData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis /> 
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        );
      };
    

      const Graph1 = () => {
        // const [graphData1, setGraphData1] = useState([]);
      
        // useEffect(() => {
        //   setGraphData1(Object.values(groupedDataPostVsDate));
        // }, []);
        
        return (
          <BarChart
            width={500}
            height={300}
            data={graphData1}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        );
      };



      const Graph2 = () => {
        // const [graphData2, setGraphData2] = useState([]);
      
        // useEffect(() => {
        //   setGraphData2(Object.values(groupedDataVisitorVsDate));
        // }, []);
      
        return (
          <BarChart
            width={500}
            height={300}
            data={graphData2}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        );
      };

      useEffect(() => {
        // window.location.reload()
      },[])

    return (
        <Fragment>
        {console.log("hi")}
        <div className='card home-card' style={{ display: "flex" }}>
        <div className="card-image" style={{ display: "flex" }}>
        <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Growth of the Sub-greddiit in terms of Members</th>
        </tr>
      </thead>
      <tbody>
        {output.map(item => (
          <tr key={item.date}>
            <td>{item.date}</td>
            <td>{item.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
      </div>


        <div className='card home-card' style={{ display: "flex" }}>
        <div className="card-image" style={{ display: "flex" }}>
        <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Post Timing Count</th>
          </tr>
        </thead>
        <tbody>
          {graphData1.map(item => (
            <tr key={item.date}>
              <td>{item.date}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>


      <div className='card home-card' style={{ display: "flex" }}>
        <div className="card-image" style={{ display: "flex" }}>
        <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Number of Daily Visitors</th>
        </tr>
      </thead>
      <tbody>
        {graphData2.map(item => (
          <tr key={item.date}>
            <td>{item.date}</td>
            <td>{item.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </div>
      </div>


      <div className='card home-card' style={{ display: "flex" }}>
        <div className="card-image" style={{ display: "flex" }}>
        <table>
      <thead>
        <tr>
          <th>Sub-greddiit ID</th>
          <th>Number of reported Posts</th>
          <th>Number of actually Deleted Posts</th>
        </tr>
      </thead>
      <tbody>
          <tr key={data._id}>
            <td>{data.SubGreddiitId}</td>
            <td>{data.numberOfReport}</td>
            <td>{data.numberOfDelete}</td>
          </tr>
      </tbody>
    </table>
      </div>
      </div>



      <div className='card home-card' style={{ display: "flex" }}>
        <div className="card-image">
            <h3>Number of Member VS Date</h3>
            {Graph()}
            {/* {_setGraphData([Graph()])} */}
            {/* {_GraphData.map(item => (item))} */}
        </div>
        </div>


        <div className='card home-card' style={{ display: "flex" }}>
        <div className="card-image">
            <h3>Number of Post VS Date</h3>
            {Graph1()}
            {/* {_setGraphData1([Graph1()])} */}
            {/* {_GraphData1.map(item => (item))} */}
        </div>
        </div>
  
 
        <div className='card home-card' style={{ display: "flex" }}>
        <div className="card-image">
            <h3>Number of Daily Visit VS Date</h3>
            {Graph2()}
            {/* {_setGraphData2([Graph2()])} */}
            {/* {_GraphData2.map(item => (item))} */}
        </div>
        </div>

          {/* {window.location.reload()} */}
      </Fragment>
    );


}

export default SubGreddiitStats;