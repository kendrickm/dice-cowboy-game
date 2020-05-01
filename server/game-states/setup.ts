import { GAME_STATE_WAITING} from '../constants';
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
        if (sender !== this.gameRoom.players[0]) {
            return;
        }

        // if (message.type === CMD_SET_DICE) {
        //     console.log("Gonna set some dice")
        //     const numberOfDice = parseInt(message.payload, 10);
        //
        //     if (inRange(numberOfDice, 1, 4)) {
        //         this.gameRoom.setGameData({ numberOfDice });
        //         this.gameRoom.setState(GAME_STATE_WAITING);
        //     }
        // }
    }

}
