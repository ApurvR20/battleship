import Player from "./Player";
import Computer from "./Computer";
import Ship from "./ship";

const gameController = () =>
{   
    const player = Player();
    const computer = Computer();
    const playShipPlacer = (len,row,col,orient) => player.placeShip(Ship(len),row,col,orient);
    const compShipPlacer = () => computer.compShipPlacer();
    const playAttack = ([row,col]) => computer.receiveAttack([row,col]);
    const hits = [];
    const compAttack = ([row,col] = computer.targetGen()) => {

        if(hits.includes([row,col]))
        return "prehitwa";

        hits.push([row,col]);
        return player.receiveAttack([row,col]);
    }

    return {player,playShipPlacer,playAttack,computer,compShipPlacer,compAttack}
}
export default gameController;