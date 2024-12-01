"use strict";
window.onload = function () {
    var _a;
    // Exibe a lista de livros ao carregar a página
    exibeListaDeLivros();
    // Adiciona evento de clique no botão 'insere'
    (_a = document.getElementById('insere')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', evento => {
        location.href = 'insereLivro.html'; // Redireciona para a página de inserção de livro
    });
};
function exibeListaDeLivros() {
    fetch(backendAddress + "livros/lista/")
        .then(response => response.json())
        .then(livros => {
        let campos = ['id', 'titulo', 'autor', 'categoria', 'capa', 'sinopse'];
        let tbody = document.getElementById('idtbody');
        tbody.innerHTML = ""; // Limpa o conteúdo anterior da tabela
        // Preenche a tabela com os livros
        for (let livro of livros) {
            let tr = document.createElement('tr');
            for (let i = 0; i < campos.length; i++) {
                let td = document.createElement('td');
                let texto = document.createTextNode(livro[campos[i]]);
                td.appendChild(texto);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    })
        .catch(error => {
        console.error("Erro:", error); // Exibe o erro caso o fetch falhe
    });
}
