document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('treinadorForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const idade = document.getElementById('idade').value.trim();
        const cidade = document.getElementById('cidade').value.trim();
        const insights = document.getElementById('insights').value.trim();

        if (!nome || !idade || !cidade || !insights || Number(idade) <= 0 || Number(insights) < 0) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        const treinador = { nome, idade, cidade, insights };

        try {
            const response = await fetch('/api/trainers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(treinador)
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro ao cadastrar treinador: ${errorData.error}`);
                return;
            }

            const data = await response.json();

            // Armazena o ID do treinador para a próxima sessão (escolha de Pokémons)
            localStorage.setItem('trainerId', data.id);

            window.location.href = '/escolherPokemon';
        } catch (error) {
            console.error("Erro ao cadastrar treinador:", error);
            alert("Erro ao cadastrar treinador.");
        }
    });
});
