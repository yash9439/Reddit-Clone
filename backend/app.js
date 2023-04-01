const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
//  Client Secret : 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
// Client Id : 344372028353-kkinb7lda1su1a6e3h2v6tp3k9ketmf1.apps.googleusercontent.com
const app = express()
const router = express.Router()

const mongoUrl = "mongodb+srv://yash:yash@cluster0.9yj8ysa.mongodb.net/?retryWrites=true&w=majority";


mongoose .connect(mongoUrl, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("Connected to database");
    })
    .catch((e) => console.log(e));


require('./Schemas/postDetails')
require('./Schemas/subPostDetails')
require('./Schemas/userDetails')
require('./Schemas/JoiningReqDetails')
require('./Schemas/SaveForLater')
require('./Schemas/StatsDetails')
require('./Schemas/reportDetails')
app.use(express.json());
app.use(cors());
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/feature'))
app.use(require('./routes/user'))


 
app.listen(5010, () => {
    console.log("Server Started");
});


// const http = require("http");
// const { Server } = require("socket.io");
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

// server.listen(3001, () => {
//   console.log("SERVER RUNNING");
// });