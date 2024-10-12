// routes/pokemonRoutes.js

const express = require('express');
const router = express.Router();
const { criarPokemon } = require('../controllers/pokemonController');

// Definindo rota POST para criar Pokémon
router.post('/pokemon', criarPokemon);

module.exports = router;
