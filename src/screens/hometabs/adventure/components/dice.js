/*
    get a random number from min - max
*/
function Dice(max, min) {
    return parseInt(Math.floor(Math.random() * parseInt(max - min + 1) + min));
}

/*
    get a boolean from if luck is greater than a number from 1 - 100
*/
function Crit(luck) {
    return luck >= parseInt(Math.floor(Math.random() * parseInt(100) + 1));
}

export {Dice, Crit};
