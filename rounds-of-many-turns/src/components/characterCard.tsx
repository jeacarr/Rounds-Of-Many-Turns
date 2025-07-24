import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { red } from '@mui/material/colors';
import { Character } from '../data/character/Character';


// Interface for props state
interface Props {
  character: Character;
  update: Function;
}

const CharacterCard: React.FC<Props> = ({character, update}) => {
  return (
    <>
      <div class="character-card" style={{filter: "drop-shadow(5px 5px 10px #000000)", width: "100%", background: "rgba(0,255, 0, 0.2)", borderRadius: "0.5rem"}}>
        <Box  component="section" sx={{alignItems: "center", justifyContent: "flex-start", p: 2, }}>
          <Grid container spacing={2} sx={{alignItems: "center"}}>
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
                <Fab size="small" color="error" aria-label="add">
                  <RemoveIcon />
                </Fab>
                <Typography sx={{display: "inline", margin: "0 0.75rem", fontWeight: "bold"}}>HP: {character.hp}</Typography>
                <Fab size="small" color="success" aria-label="add">
                  <AddIcon />
                </Fab>
              </Grid>
              <Grid size={"auto"}>
                <Typography style={{fontWeight: "bold"}}>AC {character.ac}</Typography>
              </Grid>
              {character.conditions == "" ? "" :
                <Grid size={"auto"}>
                  <Typography style={{display: "inline"}}>Cond: </Typography>
                  <Typography style={{fontWeight: "bold", display: "inline"}}>{character.conditions}</Typography>
                </Grid>
              }
              <Grid container sx={{alignItems: "center"}}size={"auto"} spacing={0}>
                <Checkbox checked={character.concentration}/>
                <Typography style={{display: "inline"}}>Concentration</Typography>
              </Grid>
              {character.resistance == "" ? "" :
                <Grid size={"auto"}>
                  <Typography style={{display: "inline"}}>Resist: </Typography>
                  <Typography style={{fontWeight: "bold", display: "inline"}}>{character.resistance}</Typography>
                </Grid>
              } 
              {character.immunity == "" ? "" :
                <Grid size={"auto"}>
                  <Typography style={{display: "inline"}}>Immune: </Typography>
                  <Typography style={{fontWeight: "bold", display: "inline"}}>{character.immunity}</Typography>
                </Grid>
              }
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  )
}

export default CharacterCard;