const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const { formateMessage } = require("./utils/message");
const { userjoin, getCurrentUser } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const finalPath = path.join(__dirname, "./public");
app.use(express.static(finalPath));

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userjoin(socket.id, username, room);
    console.log("user detail:", user);
    socket.emit(
      "message",
      formateMessage("ChatCord bot", "welcome to Chat...")
    );

    socket.broadcast.emit(
      "message",
      formateMessage("ChatCord bot", `${username} has joined the chat`)
    );

    socket.on("disconnect", () => {
      io.emit(
        "message",
        formateMessage("ChatCord bot", `${username} has left the chat`)
      );
    });

    // listen for chatMessage

    socket.on("chatMessage", (msg) => {
      io.emit("message", formateMessage(username, msg));
    });
  });
});

server.listen("3000", () => {
  console.log("server runing on port 3000");
});
