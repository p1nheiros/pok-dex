const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');
const path = require('path');

// Rotas para páginas HTML
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/escolherPokemon', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'escolherPokemon.html'));
});

router.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'perfil.html'));
});

// Rota para salvar o treinador
router.post('/api/trainers', pokemonController.saveTrainer);

// Rota para associar Pokémons ao treinador
router.post('/api/trainers/:trainerId/pokemons', pokemonController.assignPokemonsToTrainer);

// Rota para buscar um treinador e seus Pokémons
router.get('/api/trainers/:id', pokemonController.fetchTrainerWithPokemons);

// Rota para buscar todos os Pokémons
router.get('/api/pokemons', pokemonController.fetchAllPokemons);

module.exports = router;
