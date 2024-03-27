import Gameboard from "./gameboard";
import Ship from "./ship";

const Computer = () => {
    
    const computerBoard = Gameboard();

    const compShipPlacer = () => {

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
        }
        )

        // for(const i = 0; i < 10; i+=1)
        // {
        // for(const j = 0; j < 10; j+=1)
        // {
            
        // }
        // }
    }


    return {...computerBoard, compShipPlacer};
}


export default Computer;