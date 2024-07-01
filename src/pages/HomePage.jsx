import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPokemon, getAllPokemon } from '../services/pokeService'
import PokemonList from '../pages/pokemonList'
import Axios from "axios";

const HomePage = () => {
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "", 
    species: "", 
    img: "", 
    hp: "",
    attack: "",
    defense: "",
    type: ""
  });

  const [pokemonName, setPokemonName] = useState("");
  const [error, setError] = useState("");

  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const searchPokemon = () => {
    const lowerCaseName = pokemonName.toLowerCase();
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${lowerCaseName}`).then(
        (response) => {
            setPokemon({
                name: formatName(lowerCaseName), 
                species: formatName(response.data.species.name), 
                img: response.data.sprites.other.dream_world.front_default, 
                hp: response.data.stats[0].base_stat,
                attack: response.data.stats[1].base_stat,
                defense: response.data.stats[2].base_stat,
                type: formatName(response.data.types[0].type.name)
            });
            setPokemonChosen(true);
            setError("");
        }
    ).catch((error) => {
        setError("Pokemon not found. Please enter a valid name.");
        setPokemonChosen(false);
    });
  };

  const [pokemonData, setPokemonData] = useState([]);
  const [loading, isLoading] = useState(true);
  const apiURL = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(apiURL);
      await loadPokemon(response.results);
      isLoading(false);
      console.log(response);
    }
    fetchData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonGet = await getPokemon(pokemon);
      return pokemonGet;
    }));
    setPokemonData(_pokemonData);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="container mt-4"
    >
        <div className='Message'>
            {!pokemonChosen ? (
                <h1>{error ? error : "Please Choose a Pokemon"}</h1>
            ) : null}
        </div>
        <div className='SearchContent'>
            <input type="text" onChange={(event) => {
                setPokemonName(event.target.value);
            }}/>
            <button onClick={searchPokemon}>Search Pokemon</button>
        </div>
        <div className='DisplaySection'>
            {pokemonChosen && (
            <>
                <h1>{pokemon.name}</h1>
                <img src={pokemon.img} alt={pokemon.name} />
                <h3>Species: {pokemon.species}</h3>
                <h3>Type: {pokemon.type}</h3>
                <h4>HP: {pokemon.hp}</h4>
                <h4>Attack: {pokemon.attack}</h4>
                <h4>Defense: {pokemon.defense}</h4>
            </>
            )}
        </div>

        <div className='gridContainer'>
        {loading ? <h1>Loading...</h1> : (
          pokemonData.map((pokemon, i) => {
            return <PokemonList key={i} pokemon={pokemon} />;
          })
        )}
        </div>
    </motion.div>
  );
};

export default HomePage;
