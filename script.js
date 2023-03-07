const tarefas = []

// Seleciona todos os botões com ID "adicionarTarefa"
const botoes = document.querySelectorAll('#adicionarTarefa');

// Função para salvar o JSON no localStorage
function salvarTarefasNoLocalStorage(tarefas) {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para carregar o JSON do localStorage
function carregarTarefasDoLocalStorage() {
    const tarefasJSON = localStorage.getItem('tarefas');
    if (tarefasJSON === null) {
        return [];
    } else {
        return JSON.parse(tarefasJSON);
    }
}

// Adiciona um evento de clique a cada botão


botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        // Encontra o id do elemento pai do elemento pai do botão
        const column = botao.parentElement.parentElement;
        const status = column.id.slice(7); // remove o "column-" do id encontrado.

        // Cria um novo elemento div com a classe "cardTask rounded-2 shadow-sm"
        const novaDiv = document.createElement('div');
        novaDiv.classList.add('cardTask', 'rounded-2', 'shadow-sm');

        // Adiciona o conteúdo da div, incluindo o texto e o botão com o ícone
        novaDiv.innerHTML = `
          <span class="me-2">Empty the little box</span>
          <button id="excluirTarefa" class="btn border-0"><i class="bi bi-x-circle-fill"></i></button>
        `;

        // Adiciona a div como um filho do elemento pai do elemento pai do botão
        column.appendChild(novaDiv);

        const novaTarefa = {
            task: "Empty the little box",
            status,
        }

        tarefas.push(novaTarefa);

        novaDiv.querySelector('#excluirTarefa').addEventListener('click', () => {
            novaDiv.remove();
        });
    });
});

