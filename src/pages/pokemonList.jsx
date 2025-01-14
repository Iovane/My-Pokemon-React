import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import pokeColor from '../pages/pokeColor';
import '../scss/style.scss';

const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

function PokemonList({ pokemon }) {
  const classes = useStyles();

  return (
    <div className='gridContainer'>
      <div className={classes.grid}>
        <div className='pokeType' style={{ backgroundColor: pokeColor[pokemon.name] }}>
          <img className='pokeImage' src={pokemon.sprites.front_default} alt='pokemon' />
          <Grid container>
            <Grid item xs={6}>
              <div className='pokeName'>
                {pokemon.name}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className='pokeOwned'>
                <div># <span>{pokemon.order}</span></div>
              </div>
            </Grid>
          </Grid>
          <div className='pokeTypes'>
            {pokemon.types.map((type, i) => (
              <div className='pokeSkill' key={i}>
                {type.type.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonList;
