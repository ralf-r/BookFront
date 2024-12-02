window.onload = (evento) => {
    // Define o prefixo para o token
    const tokenKeyword = 'Token '; // Adiciona o espaço após "Token"

    (document.getElementById('logout') as HTMLInputElement).addEventListener('click', (evento) => {
        const token = localStorage.getItem('token');

        if (!token) {
            const mensagem = document.getElementById('mensagem') as HTMLDivElement;
            mensagem.innerHTML = 'Usuário não autenticado. Token não encontrado.';
            return; // Se o token não existir, não tenta a requisição
        }

        fetch(backendAddress + 'accounts/token-auth/', {
            method: 'DELETE',
            headers: {
                'Authorization': tokenKeyword + token, // Corrigido para incluir o token corretamente
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                const mensagem = document.getElementById('mensagem') as HTMLDivElement;
                if (response.ok) {
                    // Redireciona para a página inicial após logout
                    window.location.assign('/');
                } else {
                    mensagem.innerHTML = 'Erro ' + response.status;
                }
            })
            .catch(erro => {
                console.log(erro);
            });
    });
};
