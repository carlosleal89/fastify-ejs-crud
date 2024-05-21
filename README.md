# Aplicativo de Gerenciamento de Clientes

## Descrição:

Esta é uma aplicação SSR desenvolvida em ambiente Node com Fastify e renderização de templates EJS. Foi criada para permitir aos usuários visualizar uma lista de clientes, assim como criar ou editar um registro de cliente.
Algumas funcionalidades ainda serão implementadas, como tela de login de usuários, gerenciamento de permissões, validação dos campos de input e melhor formatação das mensagens de erro.


## Funcionalidades principais:

- Visualizar a lista de clientes cadastrados:

<img src="">

- Cadastrar um novo cliente:

<img src="">

- Editar um cliente já existente:

<img src="">

## Dependencias:

 - Node 18;
 - Fastify V4;
 - Sweet Alert;
 - Docker;

## Como Executar o Projeto:

  A aplicação utiliza um banco de dados Postgres rodando em um container Docker;

  1. Instale as dependencias:

        npm install

  2. Executar o container com o banco de dados:

        docker-compose up --build

  3. Execute o servidor:

        npm run dev

  4. Acesse o aplicativo:

        http://localhost:5000/customers/
