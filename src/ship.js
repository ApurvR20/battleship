
const Ship = (length) => {

    let hits = 0;
    
    const hit = () => 
    {
        hits+=1;
    }

    const isSunk = () => length === hits;

    return {length, hit, isSunk};
}

export default Ship;