document.addEventListener('DOMContentLoaded', async () => {
    const treinadorInfo = document.getElementById('treinadorInfo');
    const timePokemon = document.getElementById('timePokemon');

    const trainerId = localStorage.getItem('trainerId');

    async function fetchTrainerWithPokemons() {
        try {
            const response = await fetch(`/api/trainers/${trainerId}`);
            if (!response.ok) throw new Error('Erro ao buscar dados do treinador');

            const data = await response.json();
            displayTrainerData(data);
        } catch (error) {
            console.error("Erro ao buscar treinador e seus Pokémons:", error);
        }
    }

    function displayTrainerData(data) {
        treinadorInfo.innerHTML = `
            <p>Nome: ${data.nome}</p>
            <p>Idade: ${data.idade}</p>
            <p>Cidade: ${data.cidade}</p>
            <p>Insights: ${data.insights}</p>
        `;

        data.pokemons.forEach(pokemon => {
            const card = document.createElement('div');
            card.classList.add('pokemon-card');
            card.style.backgroundColor = getTypeColor(pokemon.type);

            card.innerHTML = `
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon_id}.png" alt="${pokemon.pokemon_name}">
                <strong>${capitalize(pokemon.pokemon_name)}</strong>
                <p>Tipo: ${capitalize(pokemon.type || "Desconhecido")}</p>
                <p>Peso: ${(pokemon.weight / 10).toFixed(1) || "Desconhecido"} kg</p>
                <p>Altura: ${(pokemon.height / 10).toFixed(1) || "Desconhecido"} m</p>
            `;
            timePokemon.appendChild(card);
        });
    }

    function getTypeColor(type) {
        const typeColors = {
            grass: '#78C850',
            fire: '#F08030',
            water: '#6890F0',
            electric: '#F8D030',
            ice: '#98D8D8',
            fighting: '#C03028',
            poison: '#A040A0',
            ground: '#E0C068',
            flying: '#A890F0',
            psychic: '#F85888',
            bug: '#A8B820',
            rock: '#B8A038',
            ghost: '#705898',
            dragon: '#7038F8',
            dark: '#705848',
            steel: '#B8B8D0',
            fairy: '#EE99AC',
            normal: '#A8A878'
        };
        return typeColors[type] || '#68A090';
    }

    function capitalize(str) {
        return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    }

    fetchTrainerWithPokemons();
});
