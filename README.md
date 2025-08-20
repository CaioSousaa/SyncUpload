# SyncUpload API

## Descrição

SyncUpload é uma API desenvolvida em NestJS para manipulação, armazenamento e exportação de dados de clientes e localizações. O projeto foi criado com foco em boas práticas de arquitetura, documentação e testes automatizados.

---

## Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **Yarn** (gerenciador de pacotes)
- **Docker** (opcional, para rodar o banco de dados PostgreSQL)
- **PostgreSQL** (caso não utilize Docker)

---

## Passo a Passo para Execução

1. **Clone o repositório**

   ```sh
   git clone https://github.com/CaioSousaa/SyncUpload.git
   ```

2. **Instale as dependências**

   ```sh
   yarn install
   ```

3. **Configure as variáveis de ambiente**

   - Copie o arquivo `.env.example` para `.env` e ajuste as configurações do banco de dados conforme necessário.

4. **(Opcional) Suba o banco de dados com Docker**

   ```sh
   docker-compose up -d
   ```

5. **Rode as migrations (se houver)**

   ```sh
   yarn typeorm migration:run
   ```

6. **Inicie a aplicação**

   ```sh
   yarn start:dev
   ```

7. **Acesse a documentação**
   - Acesse [http://localhost:3333/api](http://localhost:3333/api) para visualizar a documentação Swagger dos endpoints.

---

## Arquitetura do Projeto

```
src/
  adapters/
    responses/
    consoles/
  app/
  infra/
    database/
  modules/
    csv/
      domain/
      infra/
      ports/
      services/
    seeder/
      domain/
      dto/
      infra/
      mocks/
      ports/
      services/
    location/
      domain/
      infra/
      ports/
      services/
```

- **adapters**: Respostas padronizadas e utilitários.
- **infra**: Configurações e providers de infraestrutura (ex: banco de dados).
- **modules**: Cada domínio da aplicação (clientes, localizações, exportação CSV, etc).
- **services**: Lógica de negócio de cada módulo.
- **domain**: Entidades e regras de domínio.
- **ports**: Interfaces para abstração de repositórios e serviços.

---

## Principais Tecnologias

- **NestJS**: Framework Node.js para construção de APIs escaláveis.
- **TypeORM**: ORM para integração com bancos de dados relacionais.
- **PostgreSQL**: Banco de dados relacional.
- **Swagger**: Documentação automática dos endpoints.
- **Jest**: Testes automatizados.
- **Yarn**: Gerenciador de pacotes.
- **Docker**: Containerização do banco de dados.

---

## Serviços Criados

- **Seeder de Clientes**: Permite popular o banco de dados com registros fictícios de clientes.
- **Exportação para CSV**: Exporta todos os clientes cadastrados para um arquivo CSV.
- **Cadastro de Localizações**: Consome a API do IBGE para cadastrar estados e regiões no banco de dados.

Todos os serviços estão **documentados** via Swagger e possuem **testes automatizados** para garantir a qualidade e confiabilidade da aplicação.

---

## Observações

- Recomenda-se rodar o banco de dados via Docker para facilitar o setup.
- A documentação Swagger facilita o entendimento e uso dos endpoints.
- O projeto segue boas práticas de arquitetura, separando responsabilidades em módulos e
