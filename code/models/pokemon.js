// models/pokemon.js

class Pokemon {
    constructor(nome, tipo, altura, peso, nivelDePoder) {
        this.nome = nome;
        this.tipo = tipo;
        this.altura = altura;
        this.peso = peso;
        this.nivelDePoder = nivelDePoder;
    }

    // Função para descrever o Pokémon
    descrever() {
        return `${this.nome} é um Pokémon do tipo ${this.tipo}, com ${this.altura}m de altura e ${this.peso}kg. Seu nível de poder é ${this.nivelDePoder}.`;
    }
}

module.exports = Pokemon;
