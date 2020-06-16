import { GAME_STATE_WAITING, CMD_SET_PLAYERS} from '../constants';
import { inRange } from '../util';
import GameRoom, { Message } from '../game-room';
import Player from '../player';
import GameState from '../game-state';


/**
 * First player is denoted as leader.
 * This player must set the desired player count, this transitions to the
 */

export default class SetupState extends GameState {

    processMessage(message: Message, sender: Player) {
        // Make sure it's coming from the host
        if (!sender.leader) {
            console.log("ERROR: Only the leader should be here")
            return;
        }

        if (message.type === CMD_SET_PLAYERS) {
            const numberOfPlayers= parseInt(message.payload, 10);

            if (inRange(numberOfPlayers, 3, 8)) {
                this.gameRoom.setGameData({ numberOfPlayers });
                this.gameRoom.setState(GAME_STATE_WAITING);
            }
            else {
              console.log("Invalid number of players: ", numberOfPlayers)
            }
        }
    }

}
