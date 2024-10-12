const express = require('express');
const path = require('path');
const app = express();
const pokemonRoutes = require('./routes/pokemonRoutes');

// Middleware para interpretar o JSON enviado no body
app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usando as rotas definidas
app.use('/', pokemonRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
