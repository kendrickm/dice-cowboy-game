import GameState from './game-state';
import Player, { PlayerSerialized } from './player';
import * as actions from './actions';
import { GAME_STATE_SETUP} from './constants';

export interface StateMap {
    [stateName: string]: GameState
}

export interface GameRoomOptions {
    defaultState: string;
    stateFactory: (gameRoom: GameRoom) => StateMap;
}

export interface DiceScore {
    dice: number[];
    value: number;
}

export interface GameData {
    round?: number;
    roundStarted?: number;
    numberOfDice?: number;
    numberOfPlayers?: number;
    score?: {
        [playerId: number]: DiceScore
    };
    winners?: {
        [playerId: number]: boolean;
    }
}

export interface GameRoomSerialized {
    stateName: string;
    gameData: GameData;
    players: PlayerSerialized[];
}

export interface Message {
    type: string;
    payload?: any;
}

/**
 * Responsible for keeping track of the players and relaying incoming messages to active game state
 */
export default class GameRoom {

    public maxPlayers: number;
    public players: Player[];
    public states: StateMap;
    public gameData: GameData;
    public state: GameState;
    public stateName: string;

    constructor(options: GameRoomOptions) {
        this.players = [];
        this.states = options.stateFactory(this);
        this.gameData = {
            round: 0,
            roundStarted: null,
            numberOfDice: 0,
            score: {},
            winners: {},
            numberOfPlayers: 0
        };
        this.state = null;
        this.stateName = '';
        this.setState(options.defaultState);
    }

    setState(stateName: string) {
        console.log("State change ", stateName)
        const newState: GameState = this.states[stateName];
        if (this.state === newState) {
            return;
        }

        if (newState) {
            this.stateName = stateName;
            this.state = newState;

            actions.gameStateChanged(this, stateName);
            this.state.enterState();
        }
    }

    setGameData(changes: GameData) {
        this.gameData = Object.assign({}, this.gameData, changes);
        actions.gameDataChanged(this, changes);
    }

    /**
     * @throws {Error} Will throw an error on attempts to add a new player when the room is full
     */
    addPlayer(player: Player) {
        if (this.players.length == 0){ //First player to join becomes the leader
          player.setLeader(true)
          console.log("WE have a leader")
        } else if (!this.isAvailable) { //Room isn't empty, but not ready for players. Shouldn't reach this state
            throw new Error('The room is full');
        }

        player.room = this;
        this.players.push(player);

        actions.playerJoined(this, player);
        this.state.playerJoined(player);
    }

    removePlayer(player: Player) {
        const index = this.players.indexOf(player);
        if (index >= 0) {
            player.room = null;
            this.players.splice(index, 1);
            actions.playerLeft(this, player);
            this.state.playerLeft(player);
        }
    }

    /**
     * Parse a message coming from the client
     * @return {Message|undefined}
     */
    parseMessage(message: string): Message {
        try {
            return JSON.parse(message);
        } catch (err) {
          console.log(err)
        }
    }

    processMessage(message: string, sender: Player) {
        const parsedMessage = this.parseMessage(message);

        if (parsedMessage) {
            this.state.processMessage(parsedMessage, sender);
        }
    }

    /**
     * Send message to all players in the room
     * @param {Player} [exclude] - this player will be skipped
     */
    broadcast(message: any, exclude?: Player) {
        const json = JSON.stringify(message);
        this.players.forEach(
            (player) => player !== exclude && player.ws.send(json)
        );
    }

    serialize(): GameRoomSerialized {
        return {
            stateName: this.stateName,
            gameData: this.gameData,
            players: this.players.map(
                (player) => player.serialize()
            )
        };
    }

    /**
     * Checks if a new player can be added to the room
     */
    get isAvailable(): boolean {
        return this.stateName != GAME_STATE_SETUP
    }

    get playerCount(): number {
        return this.players.length;
    }

}
