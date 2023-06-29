document.addEventListener("DOMContentLoaded", function() {
    var botaoSidebar = document.querySelector(".botãoSidebar");

    botaoSidebar.addEventListener("click", function() {
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

document.addEventListener("DOMContentLoaded", function() {
    var botaoSidebar = document.querySelector(".botãoSidebar");
    var collapseGrupo = document.querySelector("#collapsegrupo");
  
    botaoSidebar.addEventListener("click", function() {
      if (window.innerWidth < 992) { // Apenas para dispositivos móveis
        if (collapseGrupo.style.maxHeight) {
          collapseGrupo.style.maxHeight = null;
        } else {
          collapseGrupo.style.maxHeight = collapseGrupo.scrollHeight + "px";
        }
      }
    });
  });