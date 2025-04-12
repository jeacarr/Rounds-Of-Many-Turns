import { Character, PlayerType } from "./character/Character"

export const seededCharacters = [{
    id: 1,
    name: "Princess Rosamund du Prix",
    hp: 10,
    ac: 13,
    type: PlayerType.Player,
    conditions: "",
    resistance: "",
    immunity: ""
},
{
    id: 2,
    name: "Prince Gerard of Greenleigh",
    hp: 0,
    ac: 20,
    type: PlayerType.Friendly,
    conditions: "",
    resistance: "",
    immunity: ""
},
{
    id: 3,
    name: "Puss In Boots",
    hp: 100,
    ac: 5,
    type: PlayerType.Enemy,
    conditions: "",
    resistance: "",
    immunity: ""
}] as Character[]  ;