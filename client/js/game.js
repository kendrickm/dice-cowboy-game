import { SV_GAME_STATE, CMD_SET_PLAYERS } from './constants.js';
export default class Game {

    processMessage(eventData) {
        var msg = JSON.parse(eventData);
        switch (msg.type) {
            case SV_GAME_STATE:
                this.updateGameState(msg.payload);
                break;
            default:
                break;
        }
    }
    updateGameState(stateData) {
        this.id = stateData.player.id;
        this.leader = stateData.player.leader;
        if (this.leader) {
            console.log("Should reveal the leader button")
            document.getElementById("button").style.display = 'block';
            document.getElementById("playercount").style.display = 'block';
        }
    }
}
