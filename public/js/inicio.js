document.addEventListener("DOMContentLoaded", function () {
  var botaoSidebar = document.querySelector(".botãoSidebar");
  var collapseGrupo = document.querySelector("#collapsegrupo");
  var recomendacao = document.querySelector('.recomendacao');
  var cardrecomend = document.querySelector('.cardrecomend');

  botaoSidebar.addEventListener("click", function () {
    if (window.innerWidth < 992) { 
      if (collapseGrupo.style.maxHeight) {
        collapseGrupo.style.maxHeight = null;
        recomendacao.style.marginTop = '0'; 
      } else {
        collapseGrupo.style.maxHeight = collapseGrupo.scrollHeight + "px";
        recomendacao.style.marginTop = '5em'; 
      }
    }
  });

  window.addEventListener('DOMContentLoaded', ajustarMargemRecomendacao);
  window.addEventListener('resize', ajustarMargemRecomendacao);

  function ajustarMargemRecomendacao() {
    if (window.innerWidth >= 992) { 
      recomendacao.style.marginTop = `calc(33.4em - ${recomendacao.offsetHeight}px)`;
    } else {
      recomendacao.style.marginTop = '0';
    }
  }
});


$(document).ready(function () {
  $('select').selectize({
      sortField: 'text'
  });
});



const grupos = [];

// Função para criar um novo grupo
function criarNovoGrupo() {
    const nomeGrupo = document.getElementById('recipient-name').value;
    const selectParticipantes = document.getElementById('add-participante');
    const participantesSelecionados = [];

    for (let i = 0; i < selectParticipantes.options.length; i++) {
        if (selectParticipantes.options[i].selected) {
            participantesSelecionados.push(selectParticipantes.options[i].value);
        }
    }

    if (nomeGrupo.trim() === '' || participantesSelecionados.length === 0) {
        alert('Por favor, insira um nome válido para o grupo e selecione pelo menos um participante.');
        return;
    }

    // Cria um objeto representando o novo grupo
    const novoGrupo = {
        nome: nomeGrupo,
        participantes: participantesSelecionados
    };

    // Adiciona o novo grupo ao array de grupos
    grupos.push(novoGrupo);

    // Atualiza a lista de grupos na barra lateral
    atualizarListaDeGrupos();

    // Fecha o modal de criação de novo grupo
    $('#exampleModal').modal('hide');
}

// Função para atualizar a lista de grupos na barra lateral
function atualizarListaDeGrupos() {
    const listaGrupos = document.getElementById('collapsegrupo');
    listaGrupos.innerHTML = '';
    grupos.forEach((grupo) => {
        const divGrupo = document.createElement('div');
        divGrupo.classList.add('grupo');

        const linkGrupo = document.createElement('a');
        linkGrupo.classList.add('displaylink', 'grupos');
        linkGrupo.href = '#';
        linkGrupo.textContent = grupo.nome;

        // Adicione aqui qualquer outra informação que desejar exibir sobre o grupo

        divGrupo.appendChild(linkGrupo);
        listaGrupos.appendChild(divGrupo);
    });
}

// Adiciona um evento de clique no botão "Criar" para criar o novo grupo
document.getElementById('criar-grupo-btn').addEventListener('click', criarNovoGrupo);


// const grupos = [];

// // Função para criar um novo grupo
// function criarNovoGrupo() {
//     const nomeGrupo = document.getElementById('recipient-name').value;
//     const numParticipantes = parseInt(document.getElementById('numero-participante').value);

//     if (nomeGrupo.trim() === '' || isNaN(numParticipantes) || numParticipantes <= 0 || numParticipantes > 20) {
//         alert('Por favor, insira um nome válido para o grupo e um número de participantes entre 1 e 20.');
//         return;
//     }

//     // Cria um objeto representando o novo grupo
//     const novoGrupo = {
//         nome: nomeGrupo,
//         participantes: numParticipantes
//     };

//     // Adiciona o novo grupo ao array de grupos
//     grupos.push(novoGrupo);

//     // Atualiza a lista de grupos na barra lateral
//     atualizarListaDeGrupos();

//     // Fecha o modal de criação de novo grupo
//     $('#exampleModal').modal('hide');
// }

// // Função para atualizar a lista de grupos na barra lateral
// function atualizarListaDeGrupos() {
//     const listaGrupos = document.getElementById('collapsegrupo');
//     listaGrupos.innerHTML = '';
//     grupos.forEach((grupo) => {
//         const divGrupo = document.createElement('div');
//         divGrupo.classList.add('grupo');

//         const linkGrupo = document.createElement('a');
//         linkGrupo.classList.add('displaylink', 'grupos');
//         linkGrupo.href = '#';
//         linkGrupo.textContent = grupo.nome;

//         // Adicione aqui qualquer outra informação que desejar exibir sobre o grupo

//         divGrupo.appendChild(linkGrupo);
//         listaGrupos.appendChild(divGrupo);
//     });
// }

// // Adiciona um evento de clique no botão "Criar" para criar o novo grupo
// document.getElementById('criar-grupo').addEventListener('click', criarNovoGrupo);