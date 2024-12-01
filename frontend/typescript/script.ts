window.onload = function () {
    // Exibe a lista de livros ao carregar a página
    exibeListaDeLivros();

    // Adiciona evento de clique no botão 'insere'
    const insereButton = document.getElementById('insere');
    const removeButton = document.getElementById('remove');
    if (insereButton) {
        insereButton.addEventListener('click', evento => {
            location.href = 'insereLivro.html';  // Redireciona para a página de inserção de livro
        });
    }
    if (removeButton) {
        removeButton.addEventListener('click', apagaLivro);  // Passa a função apagaLivro para lidar com a exclusão
    }
};

function exibeListaDeLivros() {
    fetch(backendAddress + "livros/lista/")
        .then(response => response.json())
        .then(livros => {
            const campos = ['id', 'titulo', 'autor', 'categoria', 'capa', 'sinopse'];
            const tbody = document.getElementById('idtbody') as HTMLTableSectionElement;
            tbody.innerHTML = ""; // Limpa o conteúdo anterior da tabela

            // Preenche a tabela com os livros
            for (let livro of livros) {
                let tr = document.createElement('tr') as HTMLTableRowElement;

                for (let i = 0; i < campos.length; i++) {
                // Preenche cada célula com os dados do livro
                    let td = document.createElement('td') as HTMLTableCellElement;
                    let href = document.createElement('a') as HTMLAnchorElement;
                    href.setAttribute('href', 'update.html?id=' + livro['id']);
                    let texto = document.createTextNode(livro[campos[i]]) as Text;
                    href.appendChild(texto);
                    td.appendChild(href);
                    tr.appendChild(td);
                }

                // Adiciona a coluna "Ação" com o link de atualização
                let tdAção = document.createElement('td') as HTMLTableCellElement;
                let linkAtualiza = document.createElement('a') as HTMLAnchorElement;
                linkAtualiza.setAttribute('href', `update.html?id=${livro.id}`);
                linkAtualiza.textContent = 'Atualiza';
                tdAção.appendChild(linkAtualiza);
                tr.appendChild(tdAção);

                // Adiciona a coluna "Ação" com o link de delete
                let checkbox = document.createElement('input') as HTMLInputElement;
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('name', 'id');
                checkbox.setAttribute('id', 'id');
                checkbox.setAttribute('value', livro['id']);
                let td = document.createElement('td') as HTMLTableCellElement;
                td.appendChild(checkbox);
                tr.appendChild(td);
                tbody.appendChild(tr);

                // Adiciona a linha à tabela
                tbody.appendChild(tr);
            }
        })
        .catch(error => {
            console.error("Erro:", error);  // Exibe o erro caso o fetch falhe
        });
}

let apagaLivro = (evento: Event) => {
    evento.preventDefault();
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]:checked');
    const checkedValues: string[] = [];
    checkboxes.forEach(checkbox => { checkedValues.push(checkbox.value); });
    fetch(backendAddress + "livros/lista/", {
        method: 'DELETE',
        body: JSON.stringify(checkedValues),
        headers: { 'Content-Type': 'application/json', }
    })
        .then(response => {
            if (response.ok) {
                alert('Dados removidos com sucesso');
            } else {
                alert('Dados removidos com erro');
            }
        })
        .catch(error => { console.log(error) })
        .finally(() => { exibeListaDeLivros(); })
}