import gameBoard from "./gameBoard";
import Ship from "./ship";

const Player = () => {

    const playerBoard = gameBoard();

    const predeterminedPlacement = () => {

        //   0 1 2 3 4 5 6 7 8 9 
        // 0 o - - - - - - - - -
        // 1 o - - - - - - - - -
        // 2 o - - - - - - - - -
        // 3 o - - o o o - o - -
        // 4 - - - - - - - o - -
        // 5 - - - - - - - - - -
        // 6 - - - - - - - - - -
        // 7 - - - - - - o o o -
        // 8 - - - - - - - - - -
        // 9 o o o o o - - - - -

        playerBoard.placeShip(Ship(5),9,0,'h');
        playerBoard.placeShip(Ship(4),0,0,'v');
        playerBoard.placeShip(Ship(3),3,3,'h');
        playerBoard.placeShip(Ship(3),7,6,'h');
        playerBoard.placeShip(Ship(2),3,7,'v');

    }
    
    const randomPlacement = () => {

        const Ships = [Ship(5),Ship(4),Ship(3),Ship(3),Ship(2)];
        Ships.forEach((ship)=>{

            let notPlaced = true;
            while(notPlaced)
            {
                const row = Math.floor(Math.random() * 10);
                const col = Math.floor(Math.random() * 10);
                const orient = Math.random() <= 0.5 ? 'v' : 'h';
                notPlaced = !playerBoard.placeShip(ship,row,col,orient);
            }
        })
    }

    const randomTargetGen = () => ([Math.floor(Math.random()*10), Math.floor(Math.random()*10)]);

    return {...playerBoard, predeterminedPlacement, randomPlacement,randomTargetGen};
}

export default Player;