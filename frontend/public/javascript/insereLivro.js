"use strict";
onload = () => {
    document.getElementById('insere').addEventListener('click', evento => {
        evento.preventDefault();
        const elements = document.getElementById('newLivroForm').elements;
        let data = {};
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            data[element.name] = element.value;
        }
        fetch(backendAddress + "livros/livro/", {
            method: 'POST', body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
            console.log(response);
            if (response.ok) {
                document.getElementById('mensagem').innerHTML = 'Dados inseridos com sucesso';
            }
            else {
                document.getElementById('mensagem').innerHTML = 'Dados inseridos com erro';
            }
        })
            .catch(error => { console.log(error); });
    });
};
