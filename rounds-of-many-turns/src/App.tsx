import React, { useCallback, useState } from "react";
import { seededCharacters } from "./data/data";
import CharacterCard from "./components/characterCard";
import { Map } from "immutable";
import { Character } from "./data/character/Character";


const App: React.FC= () => {
 
    const [data, setData] = useState<Map<number,Character>>(seededCharacters)

    const updateData = useCallback((id:number, fieldname: string, value: number | string | boolean) => {
        // TODO Update Data
        setData(data);
    },[]);

    return (
        <>
        {data.valueSeq().map((character) => {
            return (<CharacterCard character={ character } update={updateData}/>)
            
        })}
        </>
    )
};

export default App;