// controllers/pokemonController.js

const Pokemon = require('../models/pokemon');

// Função para criar um novo Pokémon
const criarPokemon = (req, res) => {
    const { nome, tipo, altura, peso, nivelDePoder } = req.body;

    // Criação de um novo objeto Pokemon
    const novoPokemon = new Pokemon(nome, tipo, altura, peso, nivelDePoder);

    // Enviar a descrição do Pokémon como resposta
    res.send(novoPokemon.descrever());
};

module.exports = { criarPokemon };
