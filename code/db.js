// db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',         // Substitua pelo seu usuário do PostgreSQL
    host: 'localhost',        // Certifique-se de que o PostgreSQL está rodando em localhost
    database: 'pokemon_db',   // Nome do banco de dados que você criou
    password: 'postgres',    // Substitua pela senha correta
    port: 5432                // Porta padrão do PostgreSQL
});

// Teste de conexão
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro ao conectar ao banco de dados:', err.stack);
    }
    console.log('Conectado ao banco de dados PostgreSQL');
    release();
});

module.exports = pool;


// Script para criação das tabelas e relações.
/*
-- Tabela de treinadores
CREATE TABLE trainers (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT,
    cidade VARCHAR(100),
    insights TEXT
);

-- Tabela de pokémons
CREATE TABLE pokemons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50),
    weight NUMERIC(6, 2),
    height NUMERIC(6, 2)


-- Tabela de associação entre treinadores e pokémons
CREATE TABLE trainer_pokemons (
    trainer_id INT REFERENCES trainers(id) ON DELETE CASCADE,
    pokemon_id INT REFERENCES pokemons(id) ON DELETE CASCADE,
    pokemon_name VARCHAR(100),
    PRIMARY KEY (trainer_id, pokemon_id)
);
*/