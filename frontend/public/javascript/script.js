"use strict";
onload = function () {
    exibeListaDeLivros(); // exibe lista de carros ao carregar a página
};
function exibeListaDeLivros() {
    fetch(backendAddress + "livros/lista/")
        .then(response => response.json())
        .then(livros => {
        let campos = ['id', 'titulo', 'autor', 'categoria', 'capa', 'sinopse'];
        let tbody = document.getElementById('idtbody');
        tbody.innerHTML = "";
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
        console.error("Erro:", error);
    });
}
