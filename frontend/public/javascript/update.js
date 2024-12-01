"use strict";
window.onload = () => {
    // Carrega os dados do banco de dados e preenche o formulário
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const idPlace = document.getElementById('id');
    if (id) {
        console.log('id = ', id);
        idPlace.innerHTML = id;
        // Preenche os dados do formulário com a resposta da API
        fetch(`${backendAddress}livros/livro/${id}/`)
            .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar o livro: ${response.statusText}`);
            }
            return response.json();
        })
            .then((livro) => {
            let campos = ['id', 'titulo', 'autor', 'categoria', 'sinopse'];
            // Preenche os campos de texto
            campos.forEach(campo => {
                const input = document.getElementById(campo);
                if (input) {
                    input.value = livro[campo] || ''; // Preenche com o valor, ou uma string vazia
                }
            });
            // Preenche o campo de imagem (capa) - Assumindo que a capa seja uma URL
            const capaElement = document.getElementById('capa');
            if (capaElement && livro.capa) {
                capaElement.src = livro.capa; // Define a URL da imagem
            }
        })
            .catch(erro => {
            console.log('Erro ao buscar dados do livro: ', erro);
            const mensagemElement = document.getElementById('mensagem');
            if (mensagemElement) {
                mensagemElement.innerHTML = 'Erro ao carregar os dados do livro.';
            }
        });
        // Adiciona o evento de atualização
        const atualizaButton = document.getElementById('atualiza');
        if (atualizaButton) {
            atualizaButton.addEventListener('click', (evento) => {
                evento.preventDefault();
                const form = document.getElementById('upLivroForm');
                const formData = new FormData(form); // Cria o FormData para lidar com arquivos
                // Adiciona o ID ao FormData, caso precise
                formData.append('id', id);
                // Envia os dados via PUT com o FormData
                fetch(`${backendAddress}livros/livro/${id}/`, {
                    method: 'PUT',
                    body: formData, // FormData será automaticamente enviado como multipart/form-data
                })
                    .then(response => {
                    const mensagemElement = document.getElementById('mensagem');
                    if (mensagemElement) {
                        if (response.ok) {
                            mensagemElement.innerHTML = 'Livro atualizado com sucesso!';
                        }
                        else {
                            mensagemElement.innerHTML = `Erro: ${response.status} ${response.statusText}`;
                        }
                    }
                })
                    .catch(erro => {
                    console.log('Erro ao atualizar livro: ', erro);
                    const mensagemElement = document.getElementById('mensagem');
                    if (mensagemElement) {
                        mensagemElement.innerHTML = 'Erro ao atualizar o livro.';
                    }
                });
            });
        }
    }
    else {
        if (idPlace) {
            idPlace.innerHTML = `URL mal formada: ${window.location}`;
        }
    }
};
