import React, {useState, useEffect, act}  from 'react'
import { Map } from "immutable";
import { Character, PlayerType, DialogBoxes } from "../data/character/Character";
import CharacterCard from "../components/characterCard";
import {useDroppable} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';
import {arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy} from '@dnd-kit/sortable';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

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
import Button from '@mui/material/Button';



// Interface for props state
interface Props {
  data: Map<number,Character>;
  add: Function;
  update: Function;
}


const CharacterCardList: React.FC<Props> = ({data, update, add}) => {
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
    const [conditionList, setConditionList] = useState(["Blinded","Charmed","Deafened","Frightened","Grappled","Incapacitated","Invisible","Paralyzed","Petrified","Poisoned","Prone","Restrained","Stunned","Unconscious","Exhaustion"])
    const [damageTypeList, setDamageTypeList] = useState(["Acid", "Bludgeoning", "Cold", "Fire", "Force", "Lightning", "Necrotic", "Piercing", "Poison", "Psychic", "Radiant", "Slashing", "Thunder"])
    const [open, setOpen] = React.useState(DialogBoxes.None);
    const [activeCharacter, setActiveCharacter] = useState(0)
    
    const handleDialogOpen = (boxType:DialogBoxes, character?:number) => {
        setOpen(boxType);
        if (character) {
            setActiveCharacter(character)
        }
    };

    const handleDialogClose = () => {
        setOpen(DialogBoxes.None);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let newId = Array.from(data.keys())[data.size - 1] + 1
        var character = {id: newId, name: formData.get("name"), hp: Number(formData.get("hp")), ac: Number(formData.get("ac")), type: Number(formData.get("ac")), image: formData.get("image"),
            conditions: [],
            resistance: [],
            immunity: [],
            concentration: false,}
        add(newId, character)
        setIds([...ids, newId])
        handleDialogClose();
    };

    //Debug
    useEffect(() => {
    console.log(data)
    }, [data]);

    return (
        <DndContext modifiers={[restrictToVerticalAxis, restrictToParentElement]} sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <Button variant="contained" onClick={() => handleDialogOpen(DialogBoxes.NewCharacter)}>New Entry</Button>
            <Dialog open={open == DialogBoxes.NewCharacter} onClose={handleDialogClose}>
                <DialogTitle>Add Entry</DialogTitle>
                <DialogContent sx={{ paddingBottom: 0 }}>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
                            <RadioGroup
                                defaultValue={PlayerType.Player}
                                name="type"
                            >
                                <FormControlLabel defaultChecked={true} value={PlayerType.Player} control={<Radio />} label="PC" />
                                <FormControlLabel value={PlayerType.Friendly} control={<Radio />} label="Ally" />
                                <FormControlLabel value={PlayerType.Enemy} control={<Radio />} label="Foe" />
                            </RadioGroup>
                        </FormControl>
                    <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined"
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    id="image"
                    name="image"
                    label="Image"
                    type="link"
                    variant="outlined"
                    />
                    <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="hp"
                    name="hp"
                    label="HP"
                    type="number"
                    variant="outlined"
                    />
                    <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="ac"
                    name="ac"
                    label="AC"
                    type="number"
                    variant="outlined"
                    />
                    <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                    </DialogActions>
                </form>
                </DialogContent>
            </Dialog>
            <Dialog open={open == DialogBoxes.Resist || open == DialogBoxes.Immunity} onClose={handleDialogClose}>
                <DialogTitle>Select {open == DialogBoxes.Immunity ? "Immunities" : "Resistances"} for {data.get(activeCharacter)?.name}</DialogTitle>
                <DialogContent sx={{ paddingBottom: 0 }}>
                <FormGroup>
                    {damageTypeList.map((type, index) => <FormControlLabel control={<Checkbox checked={open == DialogBoxes.Immunity ? data.get(activeCharacter)?.immunity[index] : data.get(activeCharacter)?.resistance[index]} onChange={(e) => {
                        if (data.get(activeCharacter ) !== undefined) {
                        let newlist = open == DialogBoxes.Immunity ? [...data.get(activeCharacter)?.immunity] : [...data.get(activeCharacter)?.resistance]
                        newlist[index] = e.target.checked
                        update(activeCharacter, open == DialogBoxes.Immunity ? "immunity" : "resistance", newlist )} }}/>}  label={type} />)}
                </FormGroup>
                </DialogContent>
            </Dialog>
            <Dialog open={open == DialogBoxes.Condition} onClose={handleDialogClose}>
                <DialogTitle>Select Conditions </DialogTitle>
                <DialogContent sx={{ paddingBottom: 0 }}>
                <FormGroup>
                    {conditionList.map((type, index) => <FormControlLabel control={<Checkbox checked={data.get(activeCharacter)?.conditions[index]} onChange={(e) => {
                        if (data.get(activeCharacter ) !== undefined) {
                        let newlist = [...data.get(activeCharacter)?.conditions]
                        newlist[index] = e.target.checked
                        update(activeCharacter, "conditions", newlist )} }}/>}  label={type} />)}
                </FormGroup>
                </DialogContent>
            </Dialog>
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                <div  style={style}>
                    {ids.map(id => <CharacterCard openDialog={handleDialogOpen} damageTypes={damageTypeList} conditionList={conditionList} key={id} character={ data.get(id)! } update={update}/>)}
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