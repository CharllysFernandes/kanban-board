
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