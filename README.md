# BookFront
Repositório Frontend da aplicação Booklyst por Rafael Feliciano e Lucas Ebrenz.

backend desse front end -> (https://github.com/MirandaWopps/BookLyst/tree/novo)
Segue explicação do que foi feito. Ele está em imagem docker(https://hub.docker.com/repository/docker/miyaaaa/bookfront/general). 
Instalação:

docker pull miyaaaa/bookfront

docker run -d -p 8080:8080 miyaaaa/bookfront

Existe a página home e da página home é possível logar,registrar, ver a lista de livros, acessar botão para inserir livros que leva para uma pagina com formulário para inserir livros na lista.

Para editar um livro da lista basta clicar sobre ele ou no campo atualizar ao lado do livro na lista.

Para excluir basta selecionar a checkbox de qual item da lista deseja excluir e clicar no botão excluir.

Todo o codigo .javascript foi gerado a partir do código .typescript

Existe o arquivo "constantes.ts" que possui  o endereço do site quando a imagem docker estiver rodando. (0.0.0.0:8080)

Existem arquivos .ts  fazendo ações do CRUD(create, read, update, delete).

O link para a troca de senhja apresenta problemas.


Os arquivos HTML tem comentários no topo explicando sua existência.

![Logo](home.png) ![Logo](insere.png) ![Logo](LOGIN.png)



