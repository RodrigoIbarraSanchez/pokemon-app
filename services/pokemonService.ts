import { PokemonDetail, PokemonListResponse } from '@/types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (offset = 0, limit = 20): Promise<PokemonListResponse> => {
  const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  return response.json();
};

export const getPokemonDetail = async (id: string | number): Promise<PokemonDetail> => {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  return response.json();
};

export const getColorForPokemonType = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  return typeColors[type] || '#777777';
};