const socket = io();

let user;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");
let sendMsg = document.querySelector(".sendMsg");

do {
  user = prompt("Please enter your name: ");
} while (!user);

sendMsg.addEventListener("click", () => {
  // console.log(textarea.value);
  if (textarea.value.trim() != "") sendMessage(textarea.value);
});

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    // console.log(textarea.value);
    if (e.target.value.trim() != "") sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user,
    message: message.trim(),
  };
  // Append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  // Send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
      <h4>${msg.user}</h4>
      <p>${msg.message}</p>
  `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// Recieve messages
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
