window.addEventListener('load', (evento) => {
    // Define o prefixo para o token
    const tokenKeyword = 'Token '; // Adiciona o espaço após "Token"

    (document.getElementById('formulario') as HTMLFormElement).addEventListener('submit', async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token não encontrado.');
            return;
        }

        // Obtenção dos valores dos campos do formulário
        const oldPassword = (document.getElementById('old_password') as HTMLInputElement).value;
        const newPassword1 = (document.getElementById('new_password1') as HTMLInputElement).value;
        const newPassword2 = (document.getElementById('new_password2') as HTMLInputElement).value;

        try {
            const response = await fetch(backendAddress + 'accounts/token-auth/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tokenKeyword + token, // Usando tokenKeyword definido acima
                },
                body: JSON.stringify({
                    old_password: oldPassword,
                    new_password1: newPassword1,
                    new_password2: newPassword2,
                }),
            });

            if (response.ok) {
                // Se a resposta for bem-sucedida, processa os dados
                const data = await response.json();
                const newToken: string = data.token;
                localStorage.setItem('token', newToken);

                // Redireciona após a troca de senha
                console.log('Senha trocada com sucesso!');
                window.location.replace('passwordChangeDone.html');
            } else {
                // Se a resposta não for OK, exibe um erro
                const errorData = await response.json();
                console.error('Erro ao trocar a senha:', errorData);
                throw new Error('Erro ao trocar a senha: ' + response.status);
            }
        } catch (error) {
            // Captura erros de rede ou outros tipos de exceção
            console.error('Ocorreu um erro:', error);
        }
    });
});
