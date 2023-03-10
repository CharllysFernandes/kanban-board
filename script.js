
const botoes = document.querySelectorAll('#adicionarTarefa');
const tasks = loadTasksFromLocalStorage();

botoes.forEach(button => {
  button.addEventListener('click', () => {
    const column = button.parentElement.parentElement;
    const status = column.id.slice(7); // remove o "column-" do id encontrado.
    const newDiv = document.createElement('div');
    newDiv.classList.add('cardTask', 'rounded-2', 'shadow-sm');
    newDiv.setAttribute('id', 'cardTask');

    newDiv.innerHTML = `
          <span class="me-2">Empty the little box</span>
          <button id="excluirTarefa" class="btn border-0"><i class="bi bi-x-circle-fill"></i></button>
        `;

    column.appendChild(newDiv);

    const newTask = {
      task: "Empty the little box",
      status,
    }

    tasks.push(newTask);

    saveTasksToLocalStorage(tasks)

    newDiv.querySelector('#excluirTarefa').addEventListener('click', () => {
      window.location.reload()
      newDiv.remove();

      const spanText = newDiv.querySelector('span').textContent;
      excluirDoLocalStorage(spanText);

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
  newDiv.setAttribute('id', 'cardTask');


  // Adiciona o conteúdo da div, incluindo o texto e o botão com o ícone
  newDiv.innerHTML = `
      <span class="me-2">${task.task}</span>
      <button id="excluirTarefa" class="btn border-0"><i class="bi bi-x-circle-fill"></i></button>
    `;

  // Adiciona um evento de clique ao botão de exclusão para remover a tarefa da lista e do localStorage
  newDiv.querySelector('#excluirTarefa').addEventListener('click', () => {
    newDiv.remove();

    const spanText = newDiv.querySelector('span').textContent;
    excluirDoLocalStorage(spanText);


  });

  return newDiv;
}


const taskCards = document.querySelectorAll('#cardTask');
taskCards.forEach(card => {
  const taskText = card.querySelector('span');
  taskText.addEventListener('click', () => {

    const tasks = loadTasksFromLocalStorage();
    const oldText = taskText.textContent;
    const newText = prompt('Atualize o texto da tarefa', taskText.textContent);

    if (newText !== null) {
      taskText.textContent = newText;

      // Localiza o objeto correspondente no array tasks
      const taskToUpdate = tasks.find(task => task.task === oldText);

      if (taskToUpdate) {
        // Atualiza a propriedade task com o novo valor
        taskToUpdate.task = newText;

        // Salva o array atualizado de volta no localStorage
        saveTasksToLocalStorage(tasks);
      }
    }


  });
});


function excluirDoLocalStorage(texto) {
  const index = tasks.findIndex(task => task.task === texto);

  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage(tasks)
  }
}

function saveTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasksJSON = localStorage.getItem('tasks');
  return tasksJSON ? JSON.parse(tasksJSON) : [];
}