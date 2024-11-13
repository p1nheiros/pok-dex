const pool = require('../db');

// Função para adicionar um treinador ao banco de dados
async function addTrainer(trainer) {
    const { nome, idade, cidade, insights } = trainer;
    const result = await pool.query(
        'INSERT INTO trainers (nome, idade, cidade, insights) VALUES ($1, $2, $3, $4) RETURNING *',
        [nome, idade, cidade, insights]
    );
    return result.rows[0];
}

// Função para salvar os IDs e nomes dos Pokémons escolhidos por um treinador
async function addTrainerPokemons(trainerId, pokemonIds) {
    try {
        const insertPromises = pokemonIds.map(async pokemonId => {
            // Buscar o nome do Pokémon pelo ID
            const result = await pool.query('SELECT name FROM pokemons WHERE id = $1', [pokemonId]);
            const pokemonName = result.rows[0]?.name;

            if (!pokemonName) {
                throw new Error(`Nome do Pokémon não encontrado para o ID ${pokemonId}`);
            }

            // Insere o trainer_id, pokemon_id e pokemon_name na tabela trainer_pokemons
            return pool.query(
                'INSERT INTO trainer_pokemons (trainer_id, pokemon_id, pokemon_name) VALUES ($1, $2, $3)',
                [trainerId, pokemonId, pokemonName]
            );
        });

        await Promise.all(insertPromises);
    } catch (error) {
        console.error("Erro ao associar Pokémons ao treinador:", error);
        throw error;
    }
}

// Função para buscar um treinador e seus Pokémons
async function getTrainerWithPokemons(trainerId) {
    const trainerResult = await pool.query('SELECT * FROM trainers WHERE id = $1', [trainerId]);
    const trainer = trainerResult.rows[0];

    if (!trainer) throw new Error("Treinador não encontrado");

    const pokemonsResult = await pool.query(`
        SELECT tp.pokemon_id, tp.pokemon_name, p.type, p.weight, p.height
        FROM trainer_pokemons tp
        JOIN pokemons p ON p.id = tp.pokemon_id
        WHERE tp.trainer_id = $1
    `, [trainerId]);

    return {
        ...trainer,
        pokemons: pokemonsResult.rows
    };
}

// Função para buscar todos os Pokémons no banco de dados e preencher se vazio
async function getAllPokemons() {
    const result = await pool.query('SELECT * FROM pokemons');
    
    if (result.rows.length === 0) {
        await populateDatabaseWithPokemons();
        const updatedResult = await pool.query('SELECT * FROM pokemons');
        return updatedResult.rows;
    }

    return result.rows;
}

// Função para preencher o banco com os primeiros 151 Pokémons da PokeAPI
async function populateDatabaseWithPokemons() {
    try {
        for (let i = 1; i <= 151; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const pokemon = await response.json();
            const { name, types, weight, height } = pokemon;
            const type = types[0].type.name;

            await pool.query(
                'INSERT INTO pokemons (name, type, weight, height) VALUES ($1, $2, $3, $4)',
                [name, type, weight, height]
            );
        }
        console.log("Banco de dados populado com os primeiros 151 Pokémons.");
    } catch (error) {
        console.error("Erro ao popular o banco com Pokémons:", error);
    }
}

module.exports = {
    addTrainer,
    addTrainerPokemons,
    getTrainerWithPokemons,
    getAllPokemons
};
