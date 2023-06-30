document.addEventListener("DOMContentLoaded", function () {
  var botaoSidebar = document.querySelector(".botãoSidebar");

  botaoSidebar.addEventListener("click", function () {
    var sidebar = document.querySelector(".sidebar");
    if (window.innerWidth < 992) { // Apenas para dispositivos móveis
      if (sidebar.classList.contains("show")) {
        sidebar.classList.remove("show");
      } else {
        sidebar.classList.add("show");
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var botaoSidebar = document.querySelector(".botãoSidebar");
  var collapseGrupo = document.querySelector("#collapsegrupo");

  botaoSidebar.addEventListener("click", function () {
    if (window.innerWidth < 992) { // Apenas para dispositivos móveis
      if (collapseGrupo.style.maxHeight) {
        collapseGrupo.style.maxHeight = null;
      } else {
        collapseGrupo.style.maxHeight = collapseGrupo.scrollHeight + "px";
      }
    }
  });
});

window.addEventListener('DOMContentLoaded', ajustarAlturaRecomendacao);
window.addEventListener('resize', ajustarAlturaRecomendacao);

function ajustarAlturaRecomendacao() {
  const recomendacao = document.querySelector('.recomendacao');
  const cardrecomend = document.querySelector('.cardrecomend');
  const alturaCard = cardrecomend.offsetHeight;

  if (window.innerWidth >= 992) {
    recomendacao.style.marginTop = `calc(29em - ${alturaCard}px)`;
  } else {
    recomendacao.style.marginTop = '0';
  }
};

document.addEventListener("DOMContentLoaded", function () {
  var botaoSidebar = document.querySelector(".botaoSidebar");
  var collapseGrupo = document.querySelector("#collapsegrupo");

  botaoSidebar.addEventListener("click", function (event) {
    event.preventDefault();
    if (window.innerWidth < 992) { // Apenas para dispositivos móveis
      if (collapseGrupo.style.maxHeight) {
        collapseGrupo.style.maxHeight = null;
      } else {
        collapseGrupo.style.maxHeight = collapseGrupo.scrollHeight + "px";
      }
    }
  });
});