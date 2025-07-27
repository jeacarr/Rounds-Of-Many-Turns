import React, { useCallback, useState } from "react";
import { seededCharacters } from "./data/data";

import { Map } from "immutable";
import { Character } from "./data/character/Character";
import  CharacterCardList  from "./components/characterCardList"
import {DndContext} from '@dnd-kit/core';


const App: React.FC= () => {
 
    const [data, setData] = useState<Map<number,Character>>(seededCharacters)

    const updateData = useCallback((id:number, fieldname: string, value: number | string | boolean) => {
        // TODO Update Data
        setData(data);
    },[]);

    return (
        <>
            <CharacterCardList data={ data } update={updateData}/>
        </>
    )
};

export default App;