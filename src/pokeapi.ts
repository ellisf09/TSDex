import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  closeCache(): void {
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area?offset=0&limit=20`;

    const cached = this.cache.get<ShallowLocations>(url);
    if (cached !== undefined) {
      return cached;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.status} ${response.statusText}`);
    }

    const locations: ShallowLocations = await response.json();
    this.cache.add(url, locations);
    return locations;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cached = this.cache.get<Pokemon>(url);
    if (cached !== undefined) {
      return cached;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch pokemon "${pokemonName}": ${response.status} ${response.statusText}`,
      );
    }

    const pokemon: Pokemon = await response.json();
    this.cache.add(url, pokemon);
    return pokemon;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.cache.get<Location>(url);
    if (cached !== undefined) {
      return cached;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch location "${locationName}": ${response.status} ${response.statusText}`,
      );
    }

    const location: Location = await response.json();
    this.cache.add(url, location);
    return location;
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  location: {
    name: string;
    url: string;
  };
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      version: {
        name: string;
        url: string;
      };
      max_chance: number;
      encounter_details: {
        min_level: number;
        max_level: number;
        chance: number;
        method: {
          name: string;
          url: string;
        };
        condition_values: {
          name: string;
          url: string;
        }[];
      }[];
    }[];
  }[];
};
