import React, { useCallback, useState  } from "react";
import { seededCharacters } from "./data/data";
import { Map } from "immutable";
import { Character } from "./data/character/Character";
import  CharacterCardList  from "./components/characterCardList"


const App: React.FC= () => {
 
    const [data, setData] = useState<Map<number,Character>>(seededCharacters)

    const updateData = useCallback((id:number, fieldname: string, value: number | string | boolean) => {
        if (data !== undefined && data.get(id) !== undefined) {
            if (data.get(id) && fieldname in data.get(id)) {
                const newCharacter:Character = {...data.get(id)}
                newCharacter[fieldname] = value;
                setData(data.set(id, newCharacter));
            }
        }
    },[data]);

    const addData = useCallback((id:number, newCharacter: Character) => {
        setData(data.set(id, newCharacter));
    },[data]);

    return (
        <>
            <CharacterCardList data={ data } add={addData} update={updateData}/>
        </>
    )
};

export default App;