// Any config/setup happens here.
export const GAME_STATE_SETUP = 'GAME_STATE_SETUP';
// Waiting for at least 3 players to pick seats
export const GAME_STATE_WAITING = 'GAME_STATE_WAITING';
// Waiting for players to start the round
export const GAME_STATE_READY = 'GAME_STATE_READY';
//Dealing the cards
export const GAME_STATE_DEALING = 'GAME_STATE_DEALING';
// Round in progress
export const GAME_STATE_IN_PROGRESS = 'GAME_STATE_IN_PROGRESS';

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

// Roles
export const ROLE_SHERIFF = 'ROLE_SHERIFF'
export const ROLE_DEPUTY  = 'ROLE_DEPUTY'
export const ROLE_OUTLAW  = 'ROLE_OUTLAW'
export const ROLE_RENEGADE = 'ROLE_RENEGADE'
