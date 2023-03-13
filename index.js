
let taskList = loadTasksFromLocalStorage(); // Carrega a lista de tarefas do armazenamento local
const taskDefault = (id, task, statusTask) => ({id, task, statusTask,})  

function init() {
    // Criando novas Array apartir do taskList
    let notSpecifiedList = taskList.filter(task => task.statusTask === 'not-Specified')
    let toDoList = taskList.filter(task => task.statusTask === 'to-Do')
    let inProgressList = taskList.filter(task => task.statusTask === 'in-Progress')
    let completedList = taskList.filter(task => task.statusTask === 'completed')

    notSpecifiedList.forEach(task => loadTaskInColumn('not-Specified', task.id));
    toDoList.forEach(task => loadTaskInColumn('to-Do', task.id));
    inProgressList.forEach(task => loadTaskInColumn('in-Progress', task.id));
    completedList.forEach(task => loadTaskInColumn('completed', task.id));

}

init();

/**
 *
 */

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasksJSON = localStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

function generateUniqueId() {
    return (
        Math.random().toString(16).substr(2, 8)
    );
}

function filterColumn(column) {
    return column.slice(4); // remove o "btn-" do id da coluna encontrado.
}

function addTask(columnName) {
    let uniqueID = generateUniqueId(); // Gera um ID único para a nova tarefa
    let newColumn = filterColumn(columnName); // Filtra a coluna especificada
    if (newColumn) { // Verifica se a coluna existe
        let newTask = taskDefault(uniqueID, "new task", newColumn);
        taskList.push(newTask); // Adiciona a nova tarefa à lista de tarefas
        loadTaskInColumn(newColumn, uniqueID); // Carrega a nova tarefa na coluna correspondente
        saveTasksToLocalStorage(taskList); // Salva a lista de tarefas atualizada no armazenamento local
    }
}
function loadTaskInColumn(column, idTask) {
    
    const columnDiv = document.getElementById(column);
    const matchingTask = taskList.find(task => task.id === idTask);
    
    if (!matchingTask) {
        console.error(`Tarefa com ID ${idTask} não encontrada na lista.`);
        return;
    }
    
    try {
        const newDiv = createTaskCard(matchingTask);
        columnDiv.appendChild(newDiv);
    } catch (error) {
        console.error(`Erro ao criar cartão de tarefa: ${error.message}`);
    }
    
}




function createTaskCard(task) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('card-task', 'rounded-2', 'shadow-sm');
    newDiv.setAttribute('id', 'cardTask');
    
    newDiv.innerHTML = `
    <span class="me-2">${task.task}</span>
    <button onclick="deleteTask(${task.id})" class="btn border-0"><i class="bi bi-x-circle-fill"></i></button>
    `;
    
    return newDiv;
}

window.addEventListener('storage', function(e) {
    if (e.key === 'taskList') {
        taskList = loadTasksFromLocalStorage();
    }
});