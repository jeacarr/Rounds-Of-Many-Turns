import React, { useState } from "react";
import { seededCharacters } from "./data/data";
import CharacterCard from "./components/characterCard";


const App: React.FC= () => {
    const [data, setData] = useState(seededCharacters)
    return (
        <>
        <div>Hello World</div>
        {data.map((character) => {
            return (<CharacterCard character={ character } />)
            
        })}
        </>
    )
};

export default App;