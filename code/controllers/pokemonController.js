const pokemonModel = require('../models/pokemonModel');

// Salvar apenas o Treinador
async function saveTrainer(req, res) {
    try {
        const { nome, idade, cidade, insights } = req.body;

        // Validação dos dados do treinador
        if (!nome || !idade || !cidade || !insights) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        // Salva o treinador no banco de dados
        const newTrainer = await pokemonModel.addTrainer({ nome, idade, cidade, insights });
        res.status(201).json(newTrainer);
    } catch (error) {
        console.error("Erro ao salvar o treinador:", error);
        res.status(500).json({ error: "Erro ao salvar o treinador" });
    }
}

// Associar Pokémons ao Treinador
async function assignPokemonsToTrainer(req, res) {
    try {
        const trainerId = req.params.trainerId; // ID do treinador na URL
        const { selectedPokemons } = req.body;

        // Valida se foram enviados 6 IDs de Pokémons
        if (!selectedPokemons || selectedPokemons.length !== 6) {
            return res.status(400).json({ error: "6 Pokémons devem ser selecionados." });
        }

        // Associa os IDs dos Pokémons ao treinador
        await pokemonModel.addTrainerPokemons(trainerId, selectedPokemons);
        res.status(201).json({ message: "Pokémons associados com sucesso!" });
    } catch (error) {
        console.error("Erro ao associar Pokémons ao treinador:", error);
        res.status(500).json({ error: "Erro ao associar Pokémons ao treinador" });
    }
}

// Buscar um treinador e seus Pokémons
async function fetchTrainerWithPokemons(req, res) {
    try {
        const trainerId = req.params.id;
        const trainerData = await pokemonModel.getTrainerWithPokemons(trainerId);
        
        if (trainerData) {
            res.json(trainerData);
        } else {
            res.status(404).json({ error: "Treinador não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao buscar treinador e seus Pokémons:", error);
        res.status(500).json({ error: "Erro ao buscar treinador e seus Pokémons" });
    }
}

// Buscar todos os Pokémons (usando o banco de dados)
async function fetchAllPokemons(req, res) {
    try {
        const pokemons = await pokemonModel.getAllPokemons();
        res.json(pokemons);
    } catch (error) {
        console.error("Erro ao buscar Pokémons:", error);
        res.status(500).json({ error: "Erro ao buscar Pokémons" });
    }
}

module.exports = {
    saveTrainer,
    assignPokemonsToTrainer,
    fetchTrainerWithPokemons,
    fetchAllPokemons
};
