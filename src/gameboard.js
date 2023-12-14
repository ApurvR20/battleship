
const Gameboard = () => {

    const board = [];
    const misses = [];
    const locations = [];

    // create the grid for the board
    for(let i = 0;i < 10; i+=1)
    {
        board.push([]);
        for(let j = 0;j<10;j+=1)
        {
            board[i][j] = 0;
        }
    }

    // function for placing ships
    const placeShip = (ship, row, col, orient) => {

        if(row < 0 || col < 0 || row > 9 || col > 9)
        return false;

        // to check for available spaces        
        let flag = true;
        let i;
        let j; 
        const len = ship.length;
        if(orient === 'v') // vertically
        {
            flag = (row+len-1 < 10);
            for(i = row;flag && i < row+len; i+=1)
            {
                flag = (board[i][col] === 0); 
            }

            if(flag)
            {
                locations.push([row,col])
                for(i = row;i < row+len;i+=1)
                {
                    board[i][col] = ship;
                }
            }
        }
        
        else // horizontally
        {
            flag = (col+len-1 < 10);
            for(j = col;flag && j < col+len;j+=1)
            {
                flag = (board[row][j] === 0);
            }

            if(flag)
            {
                locations.push([row,col]);
                for(j = col;j < col+len;j+=1)
                {
                    board[row][j] = ship;
                }
            }
        }

        return flag;
    }

    const receiveAttack = (row,col) => {

        let res;

        if(board[row][col] === -1)
        res = false;
        else if(board[row][col] === 0)
        {
            misses.push([row,col])
            res = [row,col];
        }
        else 
        {
            res = board[row][col].length;
            board[row][col].hit();
        }
        board[row][col] = -1;

        return res;
    };

    const reportStatus = () => locations.every(([row,col]) => board[row][col].isSunk());

    // test reportStatus

    return {placeShip,receiveAttack, reportStatus};
}

export default Gameboard;