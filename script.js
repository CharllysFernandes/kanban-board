const tasks = []

// Seleciona todos os botões com ID "adicionarTarefa"
const botoes = document.querySelectorAll('#adicionarTarefa');

// Função para salvar o JSON no localStorage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para carregar o JSON do localStorage
function loadTasksFromLocalStorage() {
    const tasksJSON = localStorage.getItem('tasks');
    if (tasksJSON === null) {
        return [];
    } else {
        return JSON.parse(tasksJSON);
    }
}

// Adiciona um evento de clique a cada botão


botoes.forEach(button => {
    button.addEventListener('click', () => {
        // Encontra o id do elemento pai do elemento pai do botão
        const column = button.parentElement.parentElement;
        const status = column.id.slice(7); // remove o "column-" do id encontrado.

        // Cria um novo elemento div com a classe "cardTask rounded-2 shadow-sm"
        const newDiv = document.createElement('div');
        newDiv.classList.add('cardTask', 'rounded-2', 'shadow-sm');

        // Adiciona o conteúdo da div, incluindo o texto e o botão com o ícone
        newDiv.innerHTML = `
          <span class="me-2">Empty the little box</span>
          <button id="excluirTarefa" class="btn border-0"><i class="bi bi-x-circle-fill"></i></button>
        `;

        // Adiciona a div como um filho do elemento pai do elemento pai do botão
        column.appendChild(newDiv);

        const newTask = {
            task: "Empty the little box",
            status,
        }

        tasks.push(newTask);

        newDiv.querySelector('#excluirTarefa').addEventListener('click', () => {
            newDiv.remove();
        });
    });
});

