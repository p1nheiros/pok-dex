// models/pokemon.js

class Pokemon {
    constructor(nome, tipo, altura, peso, nivelDePoder) {
        this.nome = nome;
        this.tipo = tipo;
        this.altura = altura;
        this.peso = peso;
        this.nivelDePoder = nivelDePoder;
    }
}

module.exports = Pokemon;
