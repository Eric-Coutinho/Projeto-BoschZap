let photo = document.getElementById('imgFoto');
let file = document.getElementById('flImage');

photo.addEventListener('click', () => {
    file.click();
});

file.addEventListener('change', () => {
    if (file.files.length == 0) {
        return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file.files[0]);

    reader.onload = () => {
        photo.src = reader.result
    }
});



document.querySelector('.digitar .textarea').addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        const messageInput = this;
        const message = messageInput.value.trim();
        if (message !== '') {
            socket.emit('chat message', { message });
            messageInput.value = '';
        }
    }
});

socket.on('chat message', (data) => {
    const { sender, message } = data;
    const balao = document.querySelector('.balao .txtmensagem');
    const balao2 = document.querySelector('.balao2 .txtmensagem');

    if (sender === 'Nome aluno') {
        const span = document.createElement('span');
        span.textContent = `${sender}: ${message}`;
        balao.appendChild(span);
        balao.appendChild(document.createElement('br'));
    } else if (sender === 'Nome aluno 2') {
        const span = document.createElement('span');
        span.textContent = `${sender}: ${message}`;
        balao2.appendChild(span);
        balao2.appendChild(document.createElement('br'));
    }
});


$(document).ready(function() {
    $('.grupos').on('click', function(e) {
      e.preventDefault();
      
      // Obtém o ID do grupo a partir do atributo data
      const grupoId = $(this).data('grupo-id');
      
      // Realiza uma requisição AJAX para carregar as mensagens do grupo
      $.ajax({
        url: '/grupo/' + grupoId + '/mensagens',
        method: 'GET',
        success: function(response) {
          // Processa a resposta e exibe as mensagens no chat
          // Por exemplo, você pode atualizar o conteúdo do chat na página ou adicionar as mensagens dinamicamente
        },
        error: function(error) {
          // Trata o erro, se necessário
        }
      });
    });
  });