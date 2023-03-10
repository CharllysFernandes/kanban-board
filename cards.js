
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
  
  