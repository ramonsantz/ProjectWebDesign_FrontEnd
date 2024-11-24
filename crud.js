const API_BASE_URL = "https://app-avaliacao-brh0avd2ahegehac.brazilsouth01.azurewebsites.net/projeto1/fecaf";

// Função para listar filmes
async function listarFilmes() {
    const lista = document.getElementById('lista-filmes');
    lista.innerHTML = '<p>Carregando...</p>';

    try {
        const response = await fetch(`${API_BASE_URL}/listar/filmes`);
        const filmes = await response.json();

        if (!filmes || filmes.length === 0) {
            lista.innerHTML = '<p>Nenhum filme encontrado.</p>';
            return;
        }

        lista.innerHTML = '';
        filmes.forEach(filme => {
            const div = document.createElement('div');
            div.classList.add('filme');
            div.innerHTML = `
                <div>
                    <h3>${filme.nome}</h3>
                    <p>${filme.sinopse}</p>
                    <p>R$ ${filme.valor.toFixed(2)}</p>
                </div>
                <div class="botoes">
                    <button onclick="excluirFilme(${filme.id})">Excluir</button>
                </div>
            `;
            lista.appendChild(div);
        });
    } catch (error) {
        lista.innerHTML = '<p>Erro ao carregar os filmes. Tente novamente mais tarde.</p>';
        console.error("Erro ao listar filmes:", error);
    }
}

// Função para adicionar um filme
async function adicionarFilme() {
    const nome = document.getElementById('nome').value.trim();
    const sinopse = document.getElementById('sinopse').value.trim();
    const valor = parseFloat(document.getElementById('valor').value);

    if (!nome || !sinopse || isNaN(valor)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const novoFilme = { nome, sinopse, valor };

    try {
        const response = await fetch(`${API_BASE_URL}/novo/filme`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoFilme)
        });

        if (response.ok) {
            alert("Registro inserido com sucesso!");
            document.getElementById('nome').value = '';
            document.getElementById('sinopse').value = '';
            document.getElementById('valor').value = '';
            listarFilmes();
        } else {
            alert("Erro ao cadastrar filme. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao adicionar filme:", error);
        alert("Erro ao se comunicar com a API.");
    }
}

// Função para excluir um filme
async function excluirFilme(id) {
    if (!confirm("Deseja realmente excluir o registro?")) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/excluir/filme/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Registro excluído com sucesso!");
            listarFilmes();
        } else {
            alert("Erro ao excluir filme. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao excluir filme:", error);
        alert("Erro ao se comunicar com a API.");
    }
}

// Função para atualizar um filme
async function atualizarFilme(id) {
    const nome = prompt("Digite o novo nome do filme:");
    const sinopse = prompt("Digite a nova sinopse do filme:");
    const valor = parseFloat(prompt("Digite o novo valor do filme:"));

    if (!nome || !sinopse || isNaN(valor)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const filmeAtualizado = { nome, sinopse, valor };

    try {
        const response = await fetch(`${API_BASE_URL}/atualizar/filme/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filmeAtualizado)
        });

        if (response.ok) {
            alert("Registro atualizado com sucesso!");
            listarFilmes();
        } else {
            alert("Erro ao atualizar filme. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao atualizar filme:", error);
        alert("Erro ao se comunicar com a API.");
    }
}

// Inicializa a lista de filmes ao carregar a página
listarFilmes();
