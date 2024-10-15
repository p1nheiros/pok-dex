const form = document.getElementById('pokemonForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const nivelDePoder = document.getElementById('nivelDePoder').value;

    // Simulando o envio da requisição para o servidor
    fetch('http://localhost:3000/pokemon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: nome,
            tipo: tipo,
            altura: altura,
            peso: peso,
            nivelDePoder: nivelDePoder
        }),
    })
    .then(response => response.text())
    .then(data => {
        // Cria o card de Pokémon
        const cardContainer = document.getElementById('pokemonCardContainer');
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        
        // Adiciona uma imagem local de Pokémon
        const pokemonImage = document.createElement('img');
        pokemonImage.src = './images/pokemon1.png'; // Imagem fixa ou aleatória
        
        // Nome e detalhes do Pokémon
        const pokemonName = document.createElement('h2');
        pokemonName.textContent = nome;
        
        const details = document.createElement('div');
        details.classList.add('details');
        details.innerHTML = `
            <p><strong>Tipo:</strong> ${tipo}</p>
            <p><strong>Altura:</strong> ${altura} m</p>
            <p><strong>Peso:</strong> ${peso} kg</p>
            <p><strong>Nível de Poder:</strong> ${nivelDePoder}</p>
        `;

        // Adiciona os elementos ao card
        card.appendChild(pokemonImage);
        card.appendChild(pokemonName);
        card.appendChild(details);

        // Exibe o card no container (limpa cards anteriores)
        cardContainer.innerHTML = '';
        cardContainer.appendChild(card);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
