import Gameboard from "./gameboard";
const Player = () => {

    // const prevAttacks = [];
    // const attack = (row,col) => {

    //     if(prevAttacks.includes((row,col)))
    //     return false;

    //     prevAttacks.push([row,col]);
    //     return receiveAttack(row,col);
    // }

    const playerBoard = Gameboard();

    return {...playerBoard};
}

export default Player;