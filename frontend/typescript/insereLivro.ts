onload = () => {
    (document.getElementById('insere') as HTMLButtonElement).addEventListener('click', evento => {
        evento.preventDefault();
        const elements = (document.getElementById('newLivroForm') as HTMLFormElement).elements;
        let data: Record<string, string> = {};
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLInputElement;
            data[element.name] = element.value;
        }
        fetch(backendAddress + "livros/livro/", {
            method: 'POST', body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                console.log(response);
                if (response.ok) {
                    (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Dados inseridos com sucesso'
                } else {
                    (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Dados inseridos com erro'
                }
            })
            .catch(error => { console.log(error) })
    });
}