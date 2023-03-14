
const taskList = loadTasksFromLocalStorage()
const taskDefault = (id, task, statusTask) => ({id, task, statusTask});

function loadTasksFromLocalStorage() {
    const tasksJSON = localStorage.getItem('tasks')
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

function saveTasksToLocalStorage(taskList) {
    localStorage.setItem('tasks', JSON.stringify(taskList))
}

function generateUniqueId() {
    return (
        Math.random().toString(6).substring(2, 8)
    )
}

function deleteTask(params) {
    console.log(params)
}

function filterColumn(params) {
    return params.slice(4);
}

function addNewTask(params) {
    let uniqueID = generateUniqueId();
    let newColumn = filterColumn(params);
    
    if (newColumn) {
        let newTask = taskDefault(uniqueID, "New Task", newColumn)
        taskList.push(newTask)
        
        loadTaskInColumn(newColumn, uniqueID)
        saveTasksToLocalStorage(taskList)
    }
}

function loadTaskInColumn(column, idTask) {
    
    const columnDiv = document.getElementById(column);
    const matchingTask = taskList.find(task => task.id === idTask)
    
    if (!matchingTask) {
        console.error(`Tarefa com ID ${idTask} não encontrada na lista`)
        return;
    }

    try {
        const newDiv = createTaskCard(matchingTask)
        columnDiv.appendChild(newDiv)
        
    } catch (error) {
        console.error(`Erro ao criar cartão de tarefa: `)
        
    }
}

function createTaskCard(params) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('card-task', 'rounded-2', 'shadow-sm')
    newDiv.setAttribute('id', 'cardTask')
    
    newDiv.innerHTML = `
    <span class="me-2">${params.task}</span>
    <button onclick="deleteTask(${params.id})" class="btn border-0"><i class="bi bi-x-circle-fill"></i></button>
    `
    
    return newDiv
}

function init() {
    // Criando objeto para agrupar as tarefas de acordo com o status
    let taskLists = {
        'not-Specified': [],
        'to-Do': [],
        'in-Progress': [],
        'completed': []
    };

    // Agrupando as tarefas de acordo com o status
    taskList.forEach(task => {
        taskLists[task.statusTask].push(task);
    });

    // Adicionando as tarefas à coluna correspondente
    for (const status in taskLists) {
        const tasks = taskLists[status];
        tasks.forEach(task => {
            loadTaskInColumn(status, task.id);
        });
    }
}

function deleteTaskById(id) {
    const index = taskList.findIndex(task => task.id === id);
    if (index !== -1) tasks.splice(index, 1);
    saveTasksToLocalStorage(taskList);
}

window.addEventListener('storage', function (e) {
    if (e.key === 'taskList') {
        taskList = loadTasksFromLocalStorage()
    }
})

document.addEventListener('DOMContentLoaded', function() {
    init();
});
