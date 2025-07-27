import React, {useState}  from 'react'
import { Map } from "immutable";
import { Character } from "../data/character/Character";
import CharacterCard from "../components/characterCard";
import {useDroppable} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';
import {arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {
  DndContext, 
  DragEndEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';


// Interface for props state
interface Props {
  data: Map<number,Character>;
  update: Function;
}


const CharacterCardList: React.FC<Props> = ({data, update}) => {
    //DND kit values
    const {isOver} = useDroppable({
        id: 'droppable',
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, 
        {coordinateGetter: sortableKeyboardCoordinates,})
    );
    //Get list of character ids in order
    const [ids, setIds] = useState(Array.from(data.values(), (character) => character.id));

    return (
        <DndContext modifiers={[restrictToVerticalAxis, restrictToParentElement]} sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                <div  style={style}>
                    {ids.map(id => <CharacterCard key={id} character={ data.get(id)! } update={update}/>)}
                </div>
            </SortableContext>
        </DndContext>
    )

    //TODO: implement similar code to change current turn
    function handleDragEnd(event: DragEndEvent) {

        const {active, over} = event;
        if (over == null || active == null) {
            return
        }
        setIds((items) => {
            const oldIndex = items.indexOf(Number(active.id));
            const newIndex = items.indexOf(Number(over.id));
            
            return arrayMove(items, oldIndex, newIndex);
        });
    }
}

export default CharacterCardList;