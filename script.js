const botoes = document.querySelectorAll('#adicionarTarefa');
const tasks = loadTasksFromLocalStorage();
const excluirTarefaButton = document.createElement('button');
excluirTarefaButton.id = 'excluirTarefa';
excluirTarefaButton.classList.add('btn', 'border-0');
excluirTarefaButton.innerHTML = '<i class="bi bi-x-circle-fill"></i>';

botoes.forEach(button => {
  button.addEventListener('click', () => {
    const column = button.parentElement.parentElement;
    const status = column.id.slice(7); // remove o "column-" do id encontrado.
    const newDiv = document.createElement('div');
    newDiv.classList.add('cardTask', 'rounded-2', 'shadow-sm');
    newDiv.setAttribute('id', 'cardTask');
    newDiv.insertAdjacentHTML('beforeend', '<span class="me-2">Empty the little box</span>');

    const excluirTarefaButtonClone = excluirTarefaButton.cloneNode(true);
    excluirTarefaButtonClone.addEventListener('click', () => {
      window.location.reload()
      newDiv.remove();
      const spanText = newDiv.querySelector('span').textContent;
      excluirDoLocalStorage(spanText);
    });

    newDiv.appendChild(excluirTarefaButtonClone);
    column.appendChild(newDiv);

    const newTask = {
      task: "Empty the little box",
      status,
    }

    tasks.push(newTask);

    saveTasksToLocalStorage(tasks)
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

