import React, { useEffect, useState, useContext } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import { UserContext } from '../App';
import io from "socket.io-client";
const mongoose = require('mongoose');

const socket = io.connect("http://localhost:3001");

function Chat() {
  const { state, dipatch } = useContext(UserContext)
  var username = localStorage.getItem("User2Id")
  const [cnt,setCnt] = useState("0")
  console.log(username)
  console.log(state)
  // username = new mongoose.Types.ObjectId(username);
  const person1 = parseInt((new mongoose.Types.ObjectId(username)).toHexString(), 16);
  const person2 = parseInt((new mongoose.Types.ObjectId(String(state._id))).toHexString(), 16);
  const room = String(person1+person2)
  socket.emit("join_room", room);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: String(person1+person2),
        author: username,
        message: currentMessage,
        fname: state.fname,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        console.log(messageList)
        console.log("PART 1 above ")
        setCurrentMessage("");
    }
  };


  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      console.log(messageList)
      console.log("PART 2 above ")
    });
  }, [socket]);

  return (
    <div className='card home-card' style={{ display: "flex" }}>
    <div className='card-content'>
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.fname}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Chat;