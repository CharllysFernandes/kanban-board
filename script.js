
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

const tasks = loadTasksFromLocalStorage();

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

        saveTasksToLocalStorage(tasks)

        newDiv.querySelector('#excluirTarefa').addEventListener('click', () => {
            newDiv.remove();
        });
    });
});

function distributeTasksByColumnFromLocalStorage() {
    const tasks = loadTasksFromLocalStorage();
    const tasksNoSpecified = tasks.filter(task => task.status === 'Not-Specified');
    const tasksToDo = tasks.filter(task => task.status === 'To-Do');
    const tasksInProgress = tasks.filter(task => task.status === 'In-Progress');
    const tasksCompleted = tasks.filter(task => task.status === 'Completed');

    
    return [tasksNoSpecified, tasksToDo, tasksInProgress, tasksCompleted];
  }

// Distribui as tarefas do localStorage por coluna
const [tasksNoSpecified, tasksToDo, tasksInProgress, tasksCompleted] = distributeTasksByColumnFromLocalStorage();

// Adiciona as tarefas à lista de tarefas correspondente a cada coluna
const notSpecifiedList = document.querySelector('#column-Not-Specified');
tasksNoSpecified.forEach(task => {
  const newDiv = createTaskCard(task);
  notSpecifiedList.appendChild(newDiv);
});

const tasksToDoList = document.querySelector('#column-To-Do');
tasksToDo.forEach(task => {
    const newDiv = createTaskCard(task);
    tasksToDoList.appendChild(newDiv);
})

const tasksInProgressList = document.querySelector('#column-In-Progress');
tasksInProgress.forEach(task => {
  const newDiv = createTaskCard(task);
  tasksInProgressList.appendChild(newDiv);
});

const tasksCompletedList = document.querySelector('#column-Completed');
tasksCompleted.forEach(task => {
  const newDiv = createTaskCard(task);
  tasksCompletedList.appendChild(newDiv);
});


function createTaskCard(task) {
    // Cria um novo elemento div com a classe "cardTask rounded-2 shadow-sm"
    const newDiv = document.createElement('div');
    newDiv.classList.add('cardTask', 'rounded-2', 'shadow-sm');
  
    // Adiciona o conteúdo da div, incluindo o texto e o botão com o ícone
    newDiv.innerHTML = `
      <span class="me-2">${task.task}</span>
      <button id="excluirTarefa" class="btn border-0"><i class="bi bi-x-circle-fill"></i></button>
    `;
  
    // Adiciona um evento de clique ao botão de exclusão para remover a tarefa da lista e do localStorage
    newDiv.querySelector('#excluirTarefa').addEventListener('click', () => {
      newDiv.remove(); // remove a div da lista de tarefas
      //removeTaskFromLocalStorage(taskId); // remove a tarefa correspondente do localStorage
    });
  
    return newDiv;
  }
  