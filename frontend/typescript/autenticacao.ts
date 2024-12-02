window.addEventListener('load', () => {
    // Define o prefixo do token no cabeçalho
    const tokenKeyword = 'Bearer ';  // Define o token como Bearer (com um espaço após "Bearer")

    // Verifica o username e coloca no cabeçalho da página
    const token = localStorage.getItem('token'); // Recupera o token de autenticação
    if (token) { // Garante que o token existe antes de fazer a requisição
        fetch(backendAddress + 'accounts/token-auth/', {
            method: 'GET',
            headers: {
                'Authorization': tokenKeyword + token // Reenvia o token no cabeçalho HTTP
            }
        })
            .then(response => {
                if (response.ok) {
                    // Se a resposta for OK, processa o JSON
                    return response.json();
                } else {
                    throw new Error('Token inválido ou não autorizado');
                }
            })
            .then(data => {
                const usuario = data || { username: 'visitante' }; // Caso o dado não seja encontrado, define 'visitante'

                // Mostra ou esconde as seções de login de acordo com a autenticação
                const loggedDiv = document.getElementById('logged') as HTMLDivElement;
                const unloggedDiv = document.getElementById('unlogged') as HTMLDivElement;

                if (usuario.username !== 'visitante') {
                    loggedDiv.classList.remove('invisivel');
                    loggedDiv.classList.add('visivel');
                    unloggedDiv.classList.remove('visivel');
                    unloggedDiv.classList.add('invisivel');
                } else {
                    loggedDiv.classList.remove('visivel');
                    loggedDiv.classList.add('invisivel');
                    unloggedDiv.classList.remove('invisivel');
                    unloggedDiv.classList.add('visivel');
                }

                // Atualiza o nome do usuário
                const spanElement = document.getElementById('identificacao') as HTMLSpanElement;
                spanElement.innerHTML = usuario.username;
            })
            .catch(erro => {
                console.log('[setLoggedUser] deu erro: ' + erro);
            });
    } else {
        console.log('[setLoggedUser] Token não encontrado');
    }
});
