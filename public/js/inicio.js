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



document.querySelector('.digitar textarea').addEventListener('keydown', function (e) {
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

