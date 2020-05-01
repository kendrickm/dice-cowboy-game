const webSocket = new WebSocket("ws://localhost:3000/ws");

webSocket.onmessage = function (event) {
  console.log(event.data);
}
