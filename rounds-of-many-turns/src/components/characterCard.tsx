import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
// import { red } from '@mui/material/colors';
import { Character, DialogBoxes } from '../data/character/Character';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// Interface for props state
interface Props {
  character: Character;
  update: Function;
  damageTypes: string[];
  conditionList: string[];
  openDialog: Function;
}

const CharacterCard: React.FC<Props> = ({character, update, conditionList, damageTypes, openDialog}) => {
  //DND kit consts
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({id: character.id});
  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  return (
    <>
      <div key={character.id} id={character.id + ""} ref={setNodeRef}  {...attributes} className="character-card" style={{...dragStyle, background: "#174a17", borderRadius: "0.5rem", margin: ".25rem"}}>
        <Box  component="section" sx={{alignItems: "center", justifyContent: "flex-start", p: 2, }}>
          <Grid container spacing={2} sx={{alignItems: "center"}}>
            <div {...listeners} ref={setActivatorNodeRef} style={{padding:".5rem"}}>
              <MenuIcon></MenuIcon>
            </div>
            <Grid >
                <div style={{display: "flex", justifyContent: "center", width: "5rem", height: "5rem", overflow: "hidden", borderRadius: "50%"}}>
                    <img style={{ minWidth: "100%", minHeight: "100%", objectPosition: "center center", objectFit: "cover"}} src={character.image}/>
                </div>
              </Grid>
            <Grid container spacing={2} size="grow" sx={{alignItems: "center"}}>
              <Grid size={"auto"}>
                <Typography variant="h5">{character.name}</Typography>
              </Grid>
              <Grid size={"auto"}>
                <IconButton size="small" color="error" aria-label="add" onClick={() => update(character.id, "hp", character.hp - 1)}>
                  <RemoveIcon sx={{ color: "white", fontSize: "2rem", padding: ".2rem", background: "red", borderRadius: "1000rem"}}/>
                </IconButton>
                <Typography sx={{display: "inline", margin: "0 0.75rem", fontWeight: "bold"}}>HP: {character.hp}</Typography>
                <IconButton size="small"  aria-label="add" onClick={() => update(character.id, "hp", character.hp + 1)}>
                  <AddIcon sx={{ color: "white", fontSize: "2rem", padding: ".2rem", background: "green", borderRadius: "1000rem"}}  />
                </IconButton>
              </Grid>
              <Grid size={"auto"}>
                <Typography style={{fontWeight: "bold"}}>AC {character.ac}</Typography>
              </Grid>
                <Grid size={"auto"} onClick={() => openDialog(DialogBoxes.Condition, character.id)}>
                  <Typography style={{display: "inline"}}>Cond: </Typography>
                    <Typography style={{fontWeight: "bold", display: "inline"}}>{character.conditions.map((v, k)=> (!v ? "" : conditionList[k] + " ")  )}</Typography>
                  <IconButton size="small" color="primary" aria-label="add" >
                    <AddCircleIcon /> 
                  </IconButton >            
                </Grid>
              <Grid container sx={{alignItems: "center"}}size={"auto"} spacing={0}>
                <Checkbox onClick={() => update(character.id, "concentration", !character.concentration)} checked={character.concentration}/>
                <Typography style={{display: "inline"}}>Concentration</Typography>
              </Grid>
                <Grid size={"auto"} onClick={() => openDialog(DialogBoxes.Resist, character.id)}>
                  <Typography style={{display: "inline"}}>Resist: </Typography>
                    {character.resistance.length < 1 ? "" :
                        <Typography style={{fontWeight: "bold", display: "inline"}}>{character.resistance.map((v, k) => (!v ? "" : damageTypes[k] + " ") )}</Typography>
                    }
                  <IconButton size="small" color="primary" aria-label="add">
                    <AddCircleIcon /> 
                  </IconButton >   
                </Grid>
                <Grid size={"auto"} onClick={() => openDialog(DialogBoxes.Immunity, character.id)}>
                  <Typography style={{display: "inline"}}>Immune: </Typography>
                    {character.immunity.length < 1 ? "" :
                      <Typography style={{fontWeight: "bold", display: "inline"}}>{character.immunity.map((v, k) => (!v ? "" : damageTypes[k] + " ") )}</Typography>
                    }
                  <IconButton size="small" color="primary" aria-label="add" >
                    <AddCircleIcon /> 
                  </IconButton >   
                </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  )
}

export default CharacterCard;