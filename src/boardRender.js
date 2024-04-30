const boardRender = (screenBoard, player) => {
    
    for(let i = 0; i < 10; i+=1)
    {
        for (let j = 0; j < 10; j+=1)
        {
            const cell = document.createElement('div');
            cell.setAttribute("data-row", `${i}`);
            cell.setAttribute("data-col", `${j}`);
            screenBoard.appendChild(cell);
            cell.classList.add('cell');
            if(screenBoard.id === 'pScreen')
            {
                if(player.checkShip(i,j))
                {
                    cell.classList.add('ship');
                }
            }
            else{
                const markIt = 
                cell.addEventListener('click', () => {

                    player.receiveAttack([i,j]);
                    cell.textContent = '\u{274C}';
                    console.log(`clicked (${i},${j})!`);
                    // cell.removeEventListener('click');
                })
            }
        }
    }
}

export default boardRender;