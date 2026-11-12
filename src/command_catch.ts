import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
  const pokemonName = args[0];

  if (!pokemonName) {
    console.log("Please provide a Pokemon name to catch");
    return;
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokemon = await state.pokeapi.fetchPokemon(pokemonName);

  const catchChance = Math.min(0.95, Math.max(0.1, 1 - pokemon.base_experience / 300));

  if (Math.random() < catchChance) {
    state.pokedex[pokemon.name] = pokemon;
    console.log(`${pokemon.name} was caught!`);
    console.log("You may now inspect it with the inspect command.");
  } else {
    console.log(`${pokemon.name} escaped!`);
  }
}
