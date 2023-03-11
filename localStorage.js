
function excluirDoLocalStorage(texto) {
    const index = tasks.findIndex(task => task.task === texto);

    if (index !== -1) {
        tasks.splice(index, 1);
        saveTasksToLocalStorage(tasks)
    }
}
