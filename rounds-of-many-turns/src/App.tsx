import React, { useState } from "react";
import { seededCharacters } from "./data/data";
import CharacterCard from "./components/characterCard";


const App: React.FC= () => {
    const [data, setData] = useState(seededCharacters)
    return (
        <>
        <CharacterCard character={ data[0] } />
        {/* {data.map((character) => {
            return (<CharacterCard character={ character } />)
            
        })} */}
        </>
    )
};

export default App;