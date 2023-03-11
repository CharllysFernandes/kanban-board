const buttons = document.querySelectorAll('#add-Task');
const tasks = loadTasksFromLocalStorage();
const deleteTask = document.createElement('button');

deleteTask.id = 'deleteTask';
deleteTask.classList.add('btn', 'border-0');
deleteTask.innerHTML = '<i class="bi bi-x-circle-fill"></i>';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const column = button.parentElement.parentElement;
    const status = column.id.slice(7); // remove o "column-" do id encontrado.
    const newDiv = document.createElement('div');

    newDiv.classList.add('cardTask', 'rounded-2', 'shadow-sm');
    newDiv.setAttribute('id', 'cardTask');
    newDiv.insertAdjacentHTML('beforeend', '<span class="me-2">Empty the little box</span>');

    const deleteTaskClone = deleteTask.cloneNode(true);
    deleteTaskClone.addEventListener('click', () => {
      window.location.reload()
      newDiv.remove();
      const spanText = newDiv.querySelector('span').textContent;
      excluirDoLocalStorage(spanText);
    });

    newDiv.appendChild(deleteTaskClone);
    column.appendChild(newDiv);

    const newTask = {
      id: generateUniqueId(),
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

const [tasksNoSpecified, tasksToDo, tasksInProgress, tasksCompleted] = distributeTasksByColumnFromLocalStorage();

const taskLists = {
  'column-Not-Specified': tasksNoSpecified,
  'column-To-Do': tasksToDo,
  'column-In-Progress': tasksInProgress,
  'column-Completed': tasksCompleted
};

for (const [listId, tasks] of Object.entries(taskLists)) {
  const taskList = document.querySelector(`#${listId}`);
  tasks.forEach(task => {
    const newDiv = createTaskCard(task);
    taskList.appendChild(newDiv);
  });
}
