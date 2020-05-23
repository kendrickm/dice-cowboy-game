import GameRoom from './game-room';
// import GameWaitingRoom from './game-waitingroom'

export interface GameRoomFactory {
    (): GameRoom;
}

export interface IGameServerOptions {
    roomFactory: GameRoomFactory;
}

/**
 * The class maintains a list of game rooms and is responsible for allocating game rooms to players
 */
export default class GameServer {

    private roomFactory: GameRoomFactory;
    private rooms: GameRoom[];
    // private waitingRoom: GameWaitingRoom;

    constructor(options: IGameServerOptions) {
        this.roomFactory = options.roomFactory;
        this.rooms = [];
    }

    /**
    * TODO: Create a waiting area so new players are just creating a new room.
    * New players get added to our waiting room which handles either creating a new room or waiting for a player to join
    */

    /**
     * Finds an existing room or creates a brand new one
     */
    findAvailableRoom(): GameRoom {
        for (let room of this.rooms) {
            if (room.isAvailable) {
                return room;
            }
        }

        const room = this.roomFactory();
        this.rooms.push(room);

        return room;
    }

    /**
     * Removes the room if there are no players registered
     */
    removeRoomIfEmpty(room: GameRoom) {
        if (room.playerCount > 0) return;

        const index = this.rooms.indexOf(room);
        return index >= 0 && this.rooms.splice(index, 1);
    }

    /**
     * Active game rooms
     */
    get roomCount(): number {
        return this.rooms.length;
    }

    /**
     * Active player count on the server
     */
    get playerCount(): number {
        return this.rooms.reduce(
            (count, room) => count + room.playerCount,
            0
        );
    }

}
