# TSDex

![GitHub License](https://img.shields.io/github/license/ellisf09/TSDex)
![GitHub last commit](https://img.shields.io/github/last-commit/ellisf09/TSDex)

<img src="https://skillicons.dev/icons?i=ts,nodejs">

An interactive command-line Pokédex built in TypeScript that fetches live Pokémon data from the PokéAPI with built-in response caching.

## ✨ Features
- **Interactive REPL:** Explore locations, encounter wild Pokémon, catch them, and inspect your Pokédex directly from the terminal.
- **In-Memory Caching:** Caches API responses with automatic expiration intervals to minimise network requests and speed up exploration.

## 🎮 Available Commands
- `explore <area_name>` – List Pokémon found in a specific location area
- `catch <pokemon_name>` – Attempt to catch a Pokémon and add it to your Pokédex
- `inspect <pokemon_name>` – View stats, height, weight, and types of a caught Pokémon
- `pokedex` – List all Pokémon you have caught
- `map` / `mapb` – Paginate forward or backward through world locations

## 🚀 Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/ellisf09/TSDex
   cd TSDex
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the REPL:**
   ```bash
   npm run dev
   ```
