// app.js
const express = require('express');
const app = express();
const router = require('./routes/pokemonRoutes');
const path = require('path');

// Middleware para processar JSON
app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar as rotas definidas no arquivo de rotas
app.use('/', router);

// Definir a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
