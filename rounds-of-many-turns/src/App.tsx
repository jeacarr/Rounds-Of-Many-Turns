import React, { useCallback, useState } from "react";
import { seededCharacters } from "./data/data";
import CharacterCard from "./components/characterCard";
import Map from "immutable";
import { Character } from "./data/character/Character";


const App: React.FC= () => {
 
    const [data, setData] = useState(seededCharacters)

    const updateData = useCallback((id:number, fieldname: string, value: number | string | boolean) => {
        setData()
    },[]);

    return (
        <>
        {data.map((character) => {
            return (<CharacterCard character={ character } update={updateData}/>)
            
        })}
        </>
    )
};

export default App;