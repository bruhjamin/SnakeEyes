function Dice( max, min ) {
    return parseInt(Math.floor(Math.random() * parseInt(max - min + 1) + min));
}

function Crit( luck ) {
    return luck >= parseInt(Math.floor(Math.random() * parseInt(100) + 1));
}

export { Dice, Crit };
