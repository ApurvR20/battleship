import Gameboard from "./gameboard";

const Player = (receiveAttack) => {


    const prevAttacks = [];
    const attack = (row,col) => {

        if(prevAttacks.includes((row,col)))
        return false;

        


    }
    const playerBoard = Gameboard();

    return {playerBoard, attack};

}

export default Player;