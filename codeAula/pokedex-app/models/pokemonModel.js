const pokemons = [
    { id: 1, nome: 'Bulbassauro', tipo: 'Vegetal/Veneno' },
    { id: 2, nome: 'Squirtle', tipo: 'Água' },
    { id: 3, nome: 'Charmander', tipo: 'Fogo' },
];

const getPokemons = () => pokemons;
const getPokemonById = (id) => pokemons.find(p => p.id === parseInt(id));
const createPokemon = (nome, tipo) => pokemons.push(pokemons.length+1, nome, tipo)

module.exports = { getPokemons, getPokemonById, createPokemon };