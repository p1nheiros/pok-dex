document.addEventListener("DOMContentLoaded", async () => {
    const pokemonGrid = document.getElementById("pokemonGrid");
    const confirmSelectionButton = document.getElementById("confirmSelection");
    const searchInput = document.getElementById("search-input");
    let selectedPokemons = [];
    let allPokemons = [];

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

    function createPokemonCard(pokemon) {
        const card = document.createElement("div");
        card.classList.add("pokemon-card");

        const pokemonType = pokemon.type;
        card.style.backgroundColor = getTypeColor(pokemonType);

        card.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
            <h2>${capitalize(pokemon.name)}</h2>
            <p>Tipo: ${capitalize(pokemonType)}</p>
            <p>Peso: ${(pokemon.weight / 10).toFixed(1)} kg</p>
            <p>Altura: ${(pokemon.height / 10).toFixed(1)} m</p>
        `;

        card.addEventListener("click", () => {
            const isSelected = selectedPokemons.some(p => p === pokemon.id);

            if (isSelected) {
                selectedPokemons = selectedPokemons.filter(p => p !== pokemon.id);
                card.classList.remove("selected");
            } else if (selectedPokemons.length < 6) {
                selectedPokemons.push(pokemon.id);
                card.classList.add("selected");

                if (selectedPokemons.length === 6) {
                    scrollToConfirmButton();
                    animateConfirmButton();
                }
            }

            confirmSelectionButton.disabled = selectedPokemons.length === 0;
        });

        pokemonGrid.appendChild(card);
    }

    async function fetchPokemons() {
        try {
            const response = await fetch('/api/pokemons');
            allPokemons = await response.json();
            allPokemons.forEach(createPokemonCard);
        } catch (error) {
            console.error("Erro ao buscar Pokémons:", error);
        }
    }

    searchInput.addEventListener("input", (e) => {
        const searchQuery = e.target.value.toLowerCase();
        pokemonGrid.innerHTML = "";

        const filteredPokemons = allPokemons.filter(pokemon => 
            pokemon.name.toLowerCase().includes(searchQuery)
        );

        filteredPokemons.forEach(createPokemonCard);
    });

    function scrollToConfirmButton() {
        confirmSelectionButton.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function animateConfirmButton() {
        confirmSelectionButton.classList.add("pulse");
    }

    confirmSelectionButton.addEventListener("mouseover", () => {
        confirmSelectionButton.classList.remove("pulse");
    });

    confirmSelectionButton.addEventListener("click", async () => {
        const trainerId = localStorage.getItem('trainerId');

        if (!trainerId) {
            alert("Erro: ID do treinador não encontrado.");
            return;
        }

        try {
            const response = await fetch(`/api/trainers/${trainerId}/pokemons`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ selectedPokemons }) // Envia IDs dos Pokémons
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro ao associar Pokémons: ${errorData.error}`);
                return;
            }

            window.location.href = "/perfil";
        } catch (error) {
            console.error("Erro ao associar Pokémons ao treinador:", error);
            alert("Erro ao associar Pokémons.");
        }
    });

    fetchPokemons();
});
