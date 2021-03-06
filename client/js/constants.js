// Commands sent by the client
export const CMD_SET_PLAYERS = 'CMD_SET_PLAYERS';
export const CMD_PICK_SEAT = 'CMD_PICK_SEAT';
export const CMD_ROLL_DICE = 'CMD_ROLL_DICE';
export const CMD_SAVE_DICE = 'CMD_SAVE_DICE';
// Commands sent by the server
export const SV_GAME_STATE = 'SV_GAME_STATE';
export const SV_PLAYER_JOINED = 'SV_PLAYER_JOINED';
export const SV_PLAYER_LEFT = 'SV_PLAYER_LEFT';
export const SV_GAME_STATE_CHANGED = 'SV_GAME_STATE_CHANGED';
export const SV_GAME_DATA_CHANGED = 'SV_GAME_DATA_CHANGED';

// Player sitting positions on a clockface
export const PLAYER_SEAT_3_PLAYER = [12,3,9];
export const PLAYER_SEAT_4_PLAYER = PLAYER_SEAT_3_PLAYER.concat(6);
export const PLAYER_SEAT_5_PLAYER = PLAYER_SEAT_4_PLAYER.concat(10);
export const PLAYER_SEAT_6_PLAYER = PLAYER_SEAT_5_PLAYER.concat(5);
export const PLAYER_SEAT_7_PLAYER = PLAYER_SEAT_6_PLAYER.concat(8);
export const PLAYER_SEAT_8_PLAYER = PLAYER_SEAT_7_PLAYER.concat(2);
