import Player from "./Player";
import Computer from "./Computer";
import Ship from "./ship";

const player = Player();
const computer = Computer();

// to create and place ships for player
const playShipPlacer = (len,row,col,orient) => player.placeShip(Ship(len),row,col,orient);
const compShipPlacer = () => computer.compShipPlacer();

export {player,computer,playShipPlacer,compShipPlacer};