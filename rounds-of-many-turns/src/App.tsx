import React, { useState } from "react";
import { seededCharacters } from "./data/data";

const App: React.FC= () => {
    const [data, setData] = useState(seededCharacters)
    return (
        <>
        <div>Hello World</div>
        </>
    )
};

export default App;