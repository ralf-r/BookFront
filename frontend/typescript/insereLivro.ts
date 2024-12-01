window.onload = () => {
    (document.getElementById('insere') as HTMLButtonElement).addEventListener('click', evento => {
        evento.preventDefault();

        // Obter os elementos do formulário
        const form = document.getElementById('newLivroForm') as HTMLFormElement;
        const elements = form.elements;
        let data: Record<string, string | File> = {};  // Agora suporta File para upload de arquivos

        // Coletar os dados do formulário
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLInputElement | HTMLTextAreaElement;

            // Verificar se o campo é do tipo 'file'
            if (element instanceof HTMLInputElement && element.type === 'file' && element.files) {
                if (element.files.length > 0) {
                    data[element.name] = element.files[0];  // Adicionar o arquivo
                }
            } else if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                // Adicionar o valor do campo de texto ou textarea
                data[element.name] = element.value;
            }
        }

        // Enviar os dados com o fetch
        const url = backendAddress + "livros/livro/";

        // Verifique se você está enviando arquivos ou dados simples
        const isFormData = Object.values(data).some(value => value instanceof File);

        // Caso haja arquivos, use FormData para enviar
        if (isFormData) {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key] instanceof File ? data[key] : data[key] as string);
            }

            fetch(url, {
                method: 'POST',
                body: formData,  // Enviar como FormData, não JSON
                // NÃO defina o 'Content-Type' manualmente, o navegador faz isso para você
            })
                .then(response => {
                    console.log(response);
                    if (response.ok) {
                        (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Dados inseridos com sucesso';
                    } else {
                        (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Dados inseridos com erro';
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                    (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Erro ao enviar os dados';
                });
        } else {
            // Caso não haja arquivos, envie os dados como JSON
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
                .then(response => {
                    console.log(response);
                    if (response.ok) {
                        (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Dados inseridos com sucesso';
                    } else {
                        (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Dados inseridos com erro';
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                    (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Erro ao enviar os dados';
                });
        }
    });
};
