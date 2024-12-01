"use strict";
window.onload = function () {
    // Exibe a lista de livros ao carregar a página
    exibeListaDeLivros();
    // Adiciona evento de clique no botão 'insere'
    const insereButton = document.getElementById('insere');
    if (insereButton) {
        insereButton.addEventListener('click', evento => {
            location.href = 'insereLivro.html'; // Redireciona para a página de inserção de livro
        });
    }
};
function exibeListaDeLivros() {
    fetch(backendAddress + "livros/lista/")
        .then(response => response.json())
        .then(livros => {
        const campos = ['id', 'titulo', 'autor', 'categoria', 'capa', 'sinopse'];
        const tbody = document.getElementById('idtbody');
        tbody.innerHTML = ""; // Limpa o conteúdo anterior da tabela
        // Preenche a tabela com os livros
        for (let livro of livros) {
            let tr = document.createElement('tr');
            // Preenche cada célula com os dados do livro
            campos.forEach((campo, i) => {
                let td = document.createElement('td');
                let href = document.createElement('a');
                href.setAttribute('href', 'update.html?id=' + livro['id']);
                let texto = document.createTextNode(livro[campos[i]]);
                href.appendChild(texto);
                td.appendChild(href);
                tr.appendChild(td);
            });
            // Adiciona a coluna "Ação" com o link de atualização
            let tdAção = document.createElement('td');
            let linkAtualiza = document.createElement('a');
            linkAtualiza.setAttribute('href', `update.html?id=${livro.id}`);
            linkAtualiza.textContent = 'Atualiza';
            tdAção.appendChild(linkAtualiza);
            tr.appendChild(tdAção);
            // Adiciona a linha à tabela
            tbody.appendChild(tr);
        }
    })
        .catch(error => {
        console.error("Erro:", error); // Exibe o erro caso o fetch falhe
    });
}
