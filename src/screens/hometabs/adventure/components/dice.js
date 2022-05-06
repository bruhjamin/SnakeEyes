export default function Dice( max, min ) {
    return parseInt(Math.floor(Math.random() * parseInt(max - min + 1) + min));
}
