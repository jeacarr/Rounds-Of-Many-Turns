import { Record, RecordOf } from "immutable";

export enum DialogBoxes {
    None,
    NewCharacter,
    Condition,
    Resist,
    Immunity
}

export enum PlayerType {
    Player,
    Friendly,
    Enemy
}

interface ChacterContract {
    id: number;
    name: string;
    hp: number;
    ac: number;
    type: PlayerType;
    conditions: boolean[];
    resistance: boolean[];
    immunity: boolean[]; 
    concentration: boolean;
    image: string;
}

export const CharacterRecord = Record<ChacterContract>({
    id: 0,
    name: "",
    hp: 0,
    ac: 0,
    type: PlayerType.Player,
    conditions: [],
    resistance: [],
    immunity: [],
    concentration: false,
    image: ""
})

export type Character = RecordOf<ChacterContract>;

