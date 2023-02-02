const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

// get username and room url

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit("joinRoom", { username, room });

// Message from server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// message submits

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get massage text
  const msg = e.target.elements.msg.value;

  // emitng message to server
  socket.emit("chatMessage", msg);

  // clear input

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
