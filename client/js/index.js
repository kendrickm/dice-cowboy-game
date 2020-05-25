import Game from './game.js';
import { CMD_SET_PLAYERS } from './constants.js';
window.onload = function () {
    document.getElementById("button").style.display = 'none';
    document.getElementById("playercount").style.display = 'none';
    document.querySelector('button').addEventListener('click', setPlayerCount)
};
const webSocket = new WebSocket("ws://localhost:3000/ws");
const game = new Game();
webSocket.onmessage = function (event) {
    console.log(event.data);
    game.processMessage(event.data);
};

function setPlayerCount() {
  console.log("Setting some players", document.getElementById("playercount").value)
  var msg = {
    type: CMD_SET_PLAYERS,
    payload: document.getElementById("playercount").value
  };
 webSocket.send(JSON.stringify(msg));
}
