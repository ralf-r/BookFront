"use strict";
window.onload = () => {
    document.getElementById('btnLogin').addEventListener('click', evento => {
        evento.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const msg = document.getElementById('msg');
        fetch(backendAddress + 'accounts/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        })
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                if (response.status === 401) {
                    msg.innerHTML = 'Usuário ou senha inválidos.';
                }
                throw new Error('Falha na autenticação');
            }
        })
            .then((data) => {
            const token = data.token;
            localStorage.setItem('token', token);
            window.location.replace('loginDone.html');
        })
            .catch(erro => {
            console.log(erro);
        });
    });
};
