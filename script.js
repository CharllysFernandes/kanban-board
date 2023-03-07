// Seleciona todos os botões com ID "adicionarTarefa"
const botoes = document.querySelectorAll('#adicionarTarefa');

// Adiciona um evento de clique a cada botão
botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        // Encontra o elemento pai do botão
        const elementoPaiDoBotao = botao.parentElement;
    
        // Encontra o elemento pai do elemento pai do botão
        const elementoPaiDoElementoPai = elementoPaiDoBotao.parentElement;
    
        // Cria um novo elemento div com a classe "cardTask rounded-2 shadow-sm"
        const novaDiv = document.createElement('div');
        novaDiv.classList.add('cardTask', 'rounded-2', 'shadow-sm');
    
        // Adiciona o conteúdo da div, incluindo o texto e o botão com o ícone
        novaDiv.innerHTML = `
          <span class="me-2">Empty the little box</span>
          <button class="btn border-0"><i class="bi bi-x-circle-fill"></i></button>
        `;
    
        // Adiciona a div como um filho do elemento pai do elemento pai do botão
        elementoPaiDoElementoPai.appendChild(novaDiv);
  });
});
