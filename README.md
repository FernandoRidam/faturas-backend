# Lumi Faturas - API

Api que será consumida pela aplicação [Lumi Faturas - APP](https://github.com/FernandoRidam/faturas-frontend).

Serviços extração e controle de dados vindos de faturas em PDF. Suas principais funcionalidades são:

1. Extrair dados de arquivos PDFs.
2. Salvar no banco de dados.
3. Retornar esses dados paginados.
4 Disponibilizar os mesmo arquivos PDFs.

## Executando o projeto

- Após clonar o projeto:
- `yarn` para instalar as dependências;
- `.env` Crie um arquivo .env a partir do arquivo `.env.example`
- `yarn migrate` para rodar as migrations do Prisma;
- `yarn dev` para rodar o projeto;

## Tecnologias e Bibliotecas

### React

- O [NodeJS](https://nodejs.org/en) foi utilizado em sua versão 20.13.1

### Principais libs:

- [Typescript](https://www.typescriptlang.org/) Uma linguagem de programação fortemente tipada que se baseia em JavaScript.
- [Date FNS](https://date-fns.org/) Biblioteca que auxiliar na tratativa de datas.
- [Prisma](https://www.prisma.io/) ORM tipado que auxilia no controle do banco de dados.
- [Express](https://expressjs.com/pt-br/) Biblioteca para criação de rotas na api.
- [PDF Parse](https://www.npmjs.com/package/pdf-parse) Biblioteca para extração dos dados do PDF.

### Padrões

#### Camadas de código reutilizável

Camadas bem estruturadas com suas respectivas responsabilidades facilitando a reutilização de código.
