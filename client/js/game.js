import { SV_GAME_STATE, SV_PLAYER_JOINED, SV_PLAYER_LEFT, CMD_SET_PLAYERS } from './constants.js';
export default class Game {
    constructor() {
      this.player_count = 0;
    }

    processMessage(eventData) {
        var msg = JSON.parse(eventData);
        switch (msg.type) {
            case SV_GAME_STATE:
                this.updateGameState(msg.payload);
                break;
            case SV_PLAYER_JOINED:
                this.player_count++;
                break;
            case SV_PLAYER_LEFT:
                this.player_count--;
                break;
            default:
                break;
        }

      this.refreshGameScreen();
    }
    updateGameState(stateData) {
        this.id = stateData.player.id;
        this.leader = stateData.player.leader;
        this.gamestate = stateData.state.stateName;
        this.player_count = stateData.state.players.length;
    }

    refreshGameScreen(){
      document.getElementById("playercount").innerHTML = this.player_count;
      if (this.leader) {
          console.log("Should reveal the leader button");
          document.getElementById("button").style.display = 'block';
          document.getElementById("playermax").style.display = 'block';
      }
    }
}
