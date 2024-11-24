// Função para listar os filmes
function listarFilmes() {
  fetch('https://app-avaliacao-brh0avd2ahegehac.brazilsouth01.azurewebsites.net/projeto1/fecaf/listar/filmes')
    .then(response => response.json())  // Converte a resposta da API para JSON
    .then(data => {
      // Verificando se a chave 'filmes' existe e é um array
      if (Array.isArray(data.filmes)) {
        const lista = document.getElementById("listaFilmes");
        lista.innerHTML = ""; // Limpa a lista antes de adicionar novos filmes

        // Adiciona cada filme na lista
        data.filmes.forEach(filme => {
          const item = document.createElement("li");

          // Criar o conteúdo para cada filme
          const filmeInfo = `
            <h3>${filme.nome}</h3>
            <p><strong>Sinopse:</strong> ${filme.sinopse}</p>
            <p><strong>Valor:</strong> R$ ${filme.valor}</p>
            <img src="${filme.image}" alt="${filme.nome}" width="150">
          `;

          item.innerHTML = filmeInfo;
          lista.appendChild(item);
        });
      } else {
        console.error('A resposta da API não contém um array de filmes:', data);
      }
    })
    .catch(error => {
      console.error('Erro ao listar filmes:', error);
      document.getElementById("mensagem").textContent = "Erro ao carregar a lista de filmes.";
      document.getElementById("mensagem").style.color = "red";
    });
}

// Função para cadastrar um novo filme
function cadastrarFilme() {
  const nomeFilme = document.getElementById("nomeFilme").value;
  const sinopseFilme = document.getElementById("sinopseFilme").value;
  const valorFilme = document.getElementById("valorFilme").value;
  const imageFilme = document.getElementById("imageFilme").value;

  if (!nomeFilme || !sinopseFilme || !valorFilme || !imageFilme) {
    document.getElementById("mensagem").textContent = "Por favor, preencha todos os campos.";
    document.getElementById("mensagem").style.color = "red";
    return;
  }

  const filmeData = {
    nome: nomeFilme,
    sinopse: sinopseFilme,
    valor: valorFilme,
    image: imageFilme
  };

  fetch('https://app-avaliacao-brh0avd2ahegehac.brazilsouth01.azurewebsites.net/projeto1/fecaf/novo/filme', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(filmeData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.sucesso) {
      document.getElementById("mensagem").textContent = "Filme cadastrado com sucesso!";
      document.getElementById("mensagem").style.color = "green";
      listarFilmes(); // Atualiza a lista de filmes após cadastro
    } else {
      document.getElementById("mensagem").textContent = "Erro ao cadastrar filme.";
      document.getElementById("mensagem").style.color = "red";
    }
  })
  .catch(error => {
    document.getElementById("mensagem").textContent = "Erro ao enviar os dados. Tente novamente.";
    document.getElementById("mensagem").style.color = "red";
    console.error('Erro ao cadastrar filme:', error);
  });
}
