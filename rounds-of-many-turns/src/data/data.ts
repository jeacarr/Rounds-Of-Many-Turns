import { Character, PlayerType } from "./character/Character"


export const seededCharacters: Map<number,Character> = new Map<number,Character>([
[1, {
    id: 1,
    name: "Princess Rosamund du Prix",
    hp: 10,
    ac: 13,
    type: PlayerType.Player,
    conditions: "Prone, Blind",
    resistance: "Bludening, Peircing",
    immunity: "Fire",
    concentration: true
} as Character],
[2, {
    id: 2,
    name: "Prince Gerard of Greenleigh",
    hp: 0,
    ac: 20,
    type: PlayerType.Friendly,
    conditions: "",
    resistance: "",
    immunity: "",
    concentration: false
} as Character],
[3, {
    id: 3,
    name: "Puss In Boots",
    hp: 100,
    ac: 5,
    type: PlayerType.Enemy,
    conditions: "",
    resistance: "",
    immunity: "",
    concentration: false
} as Character],

]);

