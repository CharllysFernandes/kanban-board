
const taskDefault = (id, task, taskStates) => ({ id, task, taskStates });
let taskList = loadTasksFromLocalStorage()

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

function filterColumn(idColumn) {
    return idColumn.slice(4);
}
function addNewTask(column, taskName = "New Task") {
    const newColumn = filterColumn(column);

    if (!newColumn) {
        console.error(`Invalid column: ${column}`);
        return null;
    }

    const uniqueID = generateUniqueId();
    const newTask = taskDefault(uniqueID, taskName, newColumn);

    taskList.push(newTask);
    loadTaskInColumn(newColumn, uniqueID);
    saveTasksToLocalStorage(taskList);

    return newTask;
}


function loadTaskInColumn(column, idTask) {

    const columnDiv = document.getElementById(column);
    const matchingTask = taskList.find(task => task.id === idTask)

    if (!matchingTask) {
        console.error(`Task with ID ${idTask} not found in list`)
        return;
    }

    try {
        const newDiv = createTaskCard(matchingTask)
        columnDiv.appendChild(newDiv)
        addNewButtons()
        addEditTask()

    } catch (error) {
        console.error(`Error creating task card: ${idTask}`)

    }

}

function createTaskCard({ id, task }) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('card-task', 'rounded-2', 'shadow-sm', 'px-2');
    newDiv.setAttribute('data-task-id', id);
    newDiv.setAttribute('id', id);

    newDiv.innerHTML = `
        <span class="me-2">${task}</span>
        <button id="btnDeleteTask" class="btn border-0 m-0 p-0"><i class="bi bi-x-circle-fill"></i></button>
    `;

    return newDiv;
}

function addEditTask() {
    const taskDiv = document.querySelectorAll('.card-task');
    taskDiv.forEach(event => {
        event.addEventListener('click', editTask)
    })
}

function addNewButtons() {
    const deleteButtons = document.querySelectorAll('#btnDeleteTask');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteTask);
    });
}

function init() {
    let taskLists = {
        'not-Specified': [],
        'to-Do': [],
        'in-Progress': [],
        'completed': []
    };

    taskList.forEach(task => {
        taskLists[task.taskStates].push(task);
    });

    for (const status in taskLists) {
        const tasks = taskLists[status];
        tasks.forEach(task => {
            loadTaskInColumn(status, task.id);
        });
    }
}

function deleteTask(event) {
    const taskCard = event.target.closest('.card-task');
    if (!taskCard) {
        return;
    }

    const taskId = taskCard.getAttribute('data-task-id');
    const taskIndex = taskList.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        taskList.splice(taskIndex, 1);
        removeTaskCard(taskCard);
        saveTasksToLocalStorage(taskList);
    }
}

function removeTaskCard(taskCard) {
    const columnDiv = taskCard.parentNode;
    columnDiv.removeChild(taskCard);
}


window.addEventListener('storage', function (e) {
    if (e.key === 'taskList') {
        taskList = loadTasksFromLocalStorage()
    }
})

document.addEventListener('DOMContentLoaded', function () {
    init();

});

function editTask(event) {
    const taskSpan = event.target;
    const taskId = taskSpan.parentNode.getAttribute('data-task-id');
    const taskIndex = taskList.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        const newTaskName = prompt('Enter the new task name: ', taskList[taskIndex].task);
        if (newTaskName) {
            taskList[taskIndex].task = newTaskName;
            taskSpan.textContent = newTaskName;
            saveTasksToLocalStorage(taskList);
        }
    }
}

const columns = document.querySelectorAll('.task-column');

columns.forEach(column => {
    new Sortable(column, {
        group: 'tasks', // Agrupa as colunas da lista de tarefas
        animation: 150, // Define a velocidade da animação de arrastar e soltar
        onEnd: () => { // Quando a tarefa for solta em outra coluna
            taskList.forEach(task => {
                const taskCard = document.getElementById(task.id);
                const columnId = taskCard.parentNode.id;
                console.log(columnId)
                task.taskStates = columnId;
            });
            saveTasksToLocalStorage(taskList);
        }
    });
});
