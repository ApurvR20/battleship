import Ship from "./ship";
import Gameboard from "./gameboard";
import gameController from "./gameController";
import Computer from "./Computer";

const testObj = Ship(5);

test('test ship size',()=> {
    expect(testObj.length).toBe(5);
});

test('Ship has a hit function', ()=>{
    expect(typeof testObj.hit).toBe("function");
})

test('Ship has a isSunk function', ()=>{
    expect(typeof testObj.isSunk).toBe("function");
})

// current hits should be zero
for(let i=0; i<5;i+=1)
{
    testObj.hit();
}

test('Sunk and consequently hit function works',()=>{
    expect(testObj.isSunk()).toBe(true);
})

const testBoard = Gameboard();

// Ship, row, col, orient
test('First horizontal ship placement by passing ship as args',()=>{
    expect(testBoard.placeShip(Ship(3),3,3,'h')).toBe(true);
})

// board should be
//   0 1 2 3 4 5 6 7 8 9 
// 0 - - - - - - - - - -
// 1 - - - - - - - - - -
// 2 - - - - - - - - - -
// 3 - - - o o o - - - -
// 4 - - - - - - - - - -
// 5 - - - - - - - - - -
// 6 - - - - - - - - - -
// 7 - - - - - - - - - -
// 8 - - - - - - - - - -
// 9 - - - - - - - - - -

// Checking what happens if ship is tried to be placed in supposedly filled blocks
// this also checks if the prev ship is properly placed
test(`Ships can't be placed in preoccupied blocks `, ()=>{
    expect(testBoard.placeShip(Ship(2),2,3,'v') || testBoard.placeShip(Ship(2),2,4,'v') || testBoard.placeShip(Ship(2),2,5,'v')).toBe(false);
})

test('First vertical ship placement',()=>{
    expect(testBoard.placeShip(Ship(2),3,7,'v')).toBe(true);
})

//   0 1 2 3 4 5 6 7 8 9 
// 0 - - - - - - - - - -
// 1 - - - - - - - - - -
// 2 - - - - - - - - - -
// 3 - - - o o o - o - -
// 4 - - - - - - - o - -
// 5 - - - - - - - - - -
// 6 - - - - - - - - - -
// 7 - - - - - - - - - -
// 8 - - - - - - - - - -
// 9 - - - - - - - - - -

test(`Ship isn't placed if invalid coordinates are passed`,()=>{
    expect(testBoard.placeShip(Ship(4),-1,6,'v') ||
    testBoard.placeShip(Ship(4),10,6,'v') ||
    testBoard.placeShip(Ship(4),1,-1,'h') ||
    testBoard.placeShip(Ship(4),-1,10,'h')).toBe(false);
})

test(`Ship isn't placed if it goes out of bounds`,()=>{
    expect(testBoard.placeShip(Ship(3),8,8,'v') || testBoard.placeShip(Ship(3),8,8,'h')).toBe(false);
})

//   0 1 2 3 4 5 6 7 8 9 
// 0 - - - - - - - - - -
// 1 - - - - - - - - - -
// 2 - - - - - - - - - -
// 3 - - - o o o - o - -
// 4 - - - - - - - o - -
// 5 - - - - - - - - - -
// 6 - - - - - - - - - -
// 7 - - - - - - - - - -
// 8 - - - - - - - - - -
// 9 - - - - - - - - - -

// Receive length of the ship that is hit
test(`receiveAttack determines that the correct ship is hit`,()=>{
    expect(testBoard.receiveAttack(3,3)).toBe('hit');
})

//   0 1 2 3 4 5 6 7 8 9 
// 0 - - - - - - - - - -
// 1 - - - - - - - - - -
// 2 - - - - - - - - - -
// 3 - - - x o o - o - -
// 4 - - - - - - - o - -
// 5 - - - - - - - - - -
// 6 - - - - - - - - - -
// 7 - - - - - - - - - -
// 8 - - - - - - - - - -
// 9 - - - - - - - - - -

test(`Pre-hit coordinates, ship or otherwise can't be hit`,()=>{
    expect(testBoard.receiveAttack(3,3)).toBe('prehit')
})

test(`receiveAttack determines that miss is updated properly`,()=>{
    expect(testBoard.receiveAttack(0,0)).toBe('miss');
})

//   0 1 2 3 4 5 6 7 8 9 
// 0 x - - - - - - - - -
// 1 - - - - - - - - - -
// 2 - - - - - - - - - -
// 3 - - - x o o - o - -
// 4 - - - - - - - o - -
// 5 - - - - - - - - - -
// 6 - - - - - - - - - -
// 7 - - - - - - - - - -
// 8 - - - - - - - - - -
// 9 - - - - - - - - - -

// testing sink before everything is sunk
test(`allSunk properly reports float/sink status`,()=>{

    let float = testBoard.allSunk();// should be false

    const locations = [[3,4],[3,5],[0,0],[2,4],[3,7],[8,9],[4,7],[0,9]];
    let count = 0;
    const bombed = [];
    while(!float)
    {
        testBoard.receiveAttack(locations[count][0],locations[count][1]);
        float = testBoard.allSunk();
        bombed.push(locations[count]);
        count+=1;
    }

    expect(bombed).toEqual( [[3,4],[3,5],[0,0],[2,4],[3,7],[8,9],[4,7]]);
})

test(`Computer can properly place ships`,() => {

    const computer = Computer();
    let hitCount = 0;
    for(let i = 0; i < 10; i+=1)
    {
        for(let j = 0; j < 10; j+=1)
        {
            const res = computer.receiveAttack(i,j);
            if(res === 'hit') hitCount+=1;
        }
    }

    expect(hitCount).toBe(17);
})

// gameController testing from now

const controller = gameController();
test(`gameController properly makes Player and Computer boards`, ()=>{
    expect(Object.hasOwn(controller.player,'placeShip') && Object.hasOwn(controller.computer,'placeShip')).toBe(true);
})

test(`gameController can properly place ships in player`, () =>{

    controller.playShipPlacer(4,3,2,'v');

//   0 1 2 3 4 5 6 7 8 9 
// 0 - - - - - - - - - -
// 1 - - - - - - - - - -
// 2 - - - - - - - - - -
// 3 - - o - - - - - - -
// 4 - - o - - - - - - -
// 5 - - o - - - - - - -
// 6 - - o - - - - - - -
// 7 - - - - - - - - - -
// 8 - - - - - - - - - -
// 9 - - - - - - - - - -

const res = [
    controller.compAttack(2,2),
    controller.compAttack(3,2),
    controller.compAttack(4,2),
    controller.compAttack(5,2),
    controller.compAttack(6,2),
    controller.compAttack(7,2)
];
   
    expect(res).toEqual(['miss','hit','hit','hit','hit','miss']);
})

test(`Player can attack Computer`, ()=> {

    expect(['hit','miss']).toContain(controller.playAttack(0,0));
    expect(controller.playAttack(0,0)).toBe('prehit');
})

test(`Computer can attack Player` ,() => {

// Player
//   0 1 2 3 4 5 6 7 8 9 
// 0 - - - - - - - - - -
// 1 - - - - o o o - - -
// 2 - - x - - - - - - -
// 3 - - x - - - - - - -
// 4 - - x - - - - - - -
// 5 - - x - - - - - - -
// 6 - - x - - - - - - -
// 7 - - x - - - - - - -
// 8 - - - - - - - - - -
// 9 - - - - - - - - - -

    controller.playShipPlacer(3,1,4,'h');
    const res = [
        controller.compAttack(1,3),
        controller.compAttack(1,4),
        controller.compAttack(1,5),
        controller.compAttack(1,6),
        controller.compAttack(1,7),
        controller.compAttack(7,2)];
       
        expect(res).toEqual(['miss','hit','hit','hit','miss','prehit']);
})

test(`Computer does not attack out-of-bounds or same spot twice`,() => {

    // Player
//   0 1 2 3 4 5 6 7 8 9 
// 0 - - - - - - - - - -
// 1 - - - x x x x x - -
// 2 - - x - - - - - - -
// 3 - - x - - - - - - -
// 4 - - x - - - - - - -
// 5 - - x - - - - - - -
// 6 - - x - - - - - - -
// 7 - - x - - - - - - -
// 8 - - - - - - - - - -
// 9 - - - - - - - - - -

expect(controller.compAttack(1,-1)).toBe('invalid');
expect(controller.compAttack(1,3)).toBe('invalid');
expect(controller.compAttack()).toBe('valid');
})

