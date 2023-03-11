
function createTaskCard(task) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('card-task', 'rounded-2', 'shadow-sm');
    newDiv.setAttribute('id', 'cardTask');
    
    newDiv.innerHTML = `
        <span class="me-2">${task.task}</span>
        <button id="deleteTask" class="btn border-0"><i class="bi bi-x-circle-fill"></i></button>
      `;
  
      newDiv.querySelector('#deleteTask').addEventListener('click', () => {
        newDiv.remove();
        // window.location.reload();
        
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
      const newText = prompt('Update the task text.', taskText.textContent);
  
      if (newText !== null) {
        taskText.textContent = newText;
  
        const taskToUpdate = tasks.find(task => task.task === oldText);
  
        if (taskToUpdate) {
          taskToUpdate.task = newText;
          saveTasksToLocalStorage(tasks);
        }
      }
  
  
    });
  });
  
  function generateUniqueId() {
    return (
      Math.random().toString(16).substr(2, 8)
    );
  }
  