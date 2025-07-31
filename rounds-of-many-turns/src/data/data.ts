import { Character, PlayerType } from "./character/Character"
import { Map } from "immutable";


export const seededCharacters: Map<number,Character> =  Map<number,Character>([
[1, {
    id: 1,
    name: "Princess Rosamund du Prix",
    hp: 10,
    ac: 13,
    type: PlayerType.Player,
    conditions: [false, false, false, true, false, true],
    resistance: [false, true, false, false, true],
    immunity: [false, false ,false, true],
    concentration: true,
    image: "https://i.pinimg.com/736x/bf/6e/5c/bf6e5cf14b3e179e09d9bceff875a7f5.jpg"
} as Character],
[2, {
    id: 2,
    name: "Prince Gerard of Greenleigh",
    hp: 0,
    ac: 20,
    type: PlayerType.Friendly,
    conditions: <boolean[]>[],
    resistance: [false, false, true],
    immunity: <boolean[]>[],
    concentration: false,
    image: "https://static.wikia.nocookie.net/fantasy-high/images/6/67/GerardOfGreenleigh3.png/revision/latest/scale-to-width/360?cb=20230329234957"
} as Character],
[3, {
    id: 3,
    name: "Puss In Boots",
    hp: 100,
    ac: 5,
    type: PlayerType.Enemy,
    conditions: <boolean[]>[],
    resistance: <boolean[]>[],
    immunity: [false, false, false, true],
    concentration: false,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRjhhLA5isWP3WdJCqfMJOpdIU0htmI84yrw&s"
} as Character],

]);

