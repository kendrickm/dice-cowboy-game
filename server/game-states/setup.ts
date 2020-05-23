import { GAME_STATE_WAITING, CMD_SET_PLAYERS} from '../constants';
import { inRange } from '../util';
import GameRoom, { Message } from '../game-room';
import Player from '../player';
import GameState from '../game-state';


/**
 * Waits for the player to select the amount of dice to play with. Transitions to the WAITING state afterwards
 */
export default class SetupState extends GameState {

    processMessage(message: Message, sender: Player) {
        console.log("Got message!")
        // Make sure it's coming from the host
        if (!sender.leader) {
            console.log("Only the leader should be here")
            return;
        }

        if (message.type === CMD_SET_PLAYERS) {
            console.log("Leader is setting the number of players")
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
