import Ship from "./ship";
import Gameboard from "./gameboard";

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
    expect(testBoard.receiveAttack(3,3)).toBe(3);
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
    expect(testBoard.receiveAttack(3,3)).toBe(false)
})

test(`receiveAttack `)

// // test('Testing receiveAttack hit',()=>{
// //     expect(testBoard.receiveAttack(5,1)).toBe(testBoard.);
// // })

// // test('Testing receiveAttack miss', ()=> {
// //     expect(testBoard.receiveAttack(4,1)).toStrictEqual([4,1]);
// // })