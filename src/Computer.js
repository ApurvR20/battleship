import Gameboard from "./gameboard";
import Ship from "./ship";

const Computer = () => {
    
    const computerBoard = Gameboard();

    const Ships = [Ship(5),Ship(4),Ship(3),Ship(3),Ship(2)];
    
    Ships.forEach((ship)=>{

        let notPlaced = true;
        while(notPlaced)
        {
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * 10);
            const orient = Math.random() <= 0.5 ? 'v' : 'h';
            notPlaced = !computerBoard.placeShip(ship,row,col,orient);
        }
    })

    const targetGen = () => ([Math.floor(Math.random()*10), Math.floor(Math.random()*10)]);

    return {...computerBoard,targetGen};
}

export default Computer;