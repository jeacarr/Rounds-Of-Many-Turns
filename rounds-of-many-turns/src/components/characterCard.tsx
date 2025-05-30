import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import { Character } from '../data/character/Character';


// Interface for props state
interface Props {
  character: Character;
}

const CharacterCard: React.FC<Props> = ({character}) => {
  return (
    <>
      <div class="character-card" style={{filter: "drop-shadow(5px 5px 10px #000000)", background: "rgba(0,255, 0, 0.2)", borderRadius: "0.5rem"}}>
      <Box  component="section" sx={{alignItems: "center", justifyContent: "flex-start", p: 2 }}>
        <Grid container spacing={2}>
          <Grid size={1}>
              <img style={{height: "100%", borderRadius: "50%" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6H0D0tW9w98LYOwE1erdcD7CCgS1DEN8PLw&s"/>
          </Grid>
          <Grid size={"auto"}>
            <span>{character.name}</span>
          </Grid>
          <Grid size={"auto"}>
          <IconButton color={red[500]} aria-label="delete">
            <RemoveIcon />
          </IconButton>
            <span style={{margin: "0 0.75rem", fontWeight: "bold"}}>HP: {character.hp}</span>
            <Fab size="small" color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Grid>
          <Grid size={"auto"}>
            <span style={{fontWeight: "bold"}}>AC {character.ac}</span>
          </Grid>
          <Grid size={"auto"}>
            <span>Cond: </span>
            <span style={{fontWeight: "bold"}}>{character.conditions}</span>
          </Grid>
          <Grid size={"auto"}>
          <Checkbox checked={character.concentration}/>
            <span>Concentration</span>
          </Grid>
          <Grid size={"auto"}>
            <span>Resist: </span>
            <span style={{fontWeight: "bold"}}>{character.resistance}</span>
          </Grid>
          <Grid size={"auto"}>
            <span>Immune: </span>
            <span style={{fontWeight: "bold"}}>{character.immunity}</span>
          </Grid>
        </Grid>
      </Box>
      </div>
    </>
  )
}

export default CharacterCard;