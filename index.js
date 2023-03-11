const COLUMN_NOT_ESPECIFIED = document.getElementById('not-Specified');
const COLUMN_TO_DO = document.getElementById('To-Do');
const COLUMN_IN_PROGRESS = document.getElementById('in-Progress');
const COLUMN_COMPLETED = document.getElementById('completed');

const taskDefault = (id, task, statusTask) => ({id, task, statusTask,})  

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

function addTask(column) {

    let taskList = loadTasksFromLocalStorage()
    let uniqueID = generateUniqueId()
    let newTask = taskDefault(uniqueID, "new task", column);
    taskList.push(newTask)
    saveTasksToLocalStorage(taskList);
    loadTaskInColumn(column, uniqueID)

}

function loadTaskInColumn(column, idTask) {
    let taskList = loadTasksFromLocalStorage();

    console.log(column, idTask)
    const columnDiv = document.getElementById(column);
    const matchingTask = taskList.find(task => task.id === idTask);

    const newDiv = document.createElement('div');
    newDiv.classList.add('card-task', 'rounded-2', 'shadow-sm');
    newDiv.setAttribute('id', 'cardTask');
    newDiv.innerHTML = `
    <span class="me-2">${matchingTask.task}</span>
    <button onclick="deleteTask(${idTask})" class="btn border-0"><i class="bi bi-x-circle-fill"></i></button>
    `;

    columnDiv.innerHTML += newDiv;


}
