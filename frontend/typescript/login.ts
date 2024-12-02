window.onload = () => {
    (document.getElementById('btnLogin') as HTMLInputElement).addEventListener('click', evento => {
        evento.preventDefault();

        const username: string = (document.getElementById('username') as HTMLInputElement).value;
        const password: string = (document.getElementById('password') as HTMLInputElement).value;
        const msg = (document.getElementById('msg') as HTMLDivElement);

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
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    if (response.status === 401) {
                        msg.innerHTML = 'Usuário ou senha inválidos.';
                    }
                    throw new Error('Falha na autenticação');
                }
            })
            .then((data: { token: string }) => {
                const token: string = data.token;
                localStorage.setItem('token', token);
                window.location.replace('loginDone.html');
            })
            .catch(erro => {
                console.log(erro);
            });
    });
};
