# Find A Friend API

A **Find A Friend** é uma plataforma desenvolvida para facilitar o processo de adoção de animais, conectando pessoas interessadas a Organizações (ORGs) responsáveis. Este projeto foi construído para consolidar conhecimentos em **SOLID**, **Testes Automatizados (TDD)** e **Arquitetura de Software**.

---

## Sobre o Projeto

O sistema permite que ORGs cadastrem animais disponíveis para adoção, detalhando características como porte, idade e nível de energia. Para quem deseja adotar, a API oferece um sistema de busca refinado por localização e filtros específicos, facilitando o encontro do "match" ideal com um pet.

---

## Requisitos (Checklist)

Abaixo, o acompanhamento das tarefas e regras de negócio solicitadas:

- [x] Rota para cadastrar uma ORG, garantindo que inclua endereço e número de WhatsApp.
- [x] Rota de login para uma ORG.
- [x] Rota para cadastrar um pet, garantindo que ele seja associado a uma ORG.
- [x] Rota para listar pets, exigindo a cidade como parâmetro obrigatório.
- [x] Implementar a funcionalidade de filtros opcionais por características dos pets na listagem.
- [x] Rota para visualizar os detalhes de um pet específico.
- [x] Garantir que o acesso de administrador da ORG seja restrito a usuários logados.
- [x] Aplicar os princípios **SOLID** durante o desenvolvimento da estrutura da API.
- [x] Criar testes para validar as funcionalidades e regras de negócio.

---

## Regras de Negócio Implementadas

Para garantir a consistência dos dados e a melhor experiência do usuário, as seguintes regras foram aplicadas:

- A busca de pets é obrigatoriamente filtrada por cidade.
- O contato para adoção é feito via redirecionamento para o WhatsApp da ORG responsável.
- Todo pet está estritamente associado a uma ORG (relacionamento 1:N).
- Ações administrativas (como cadastro) exigem autenticação via JWT.

---

## Decisões de Arquitetura (SOLID)

A estrutura do projeto foi desenhada para ser escalável e testável:

1. Casos de uso isolados para cada funcionalidade da API.
2. Utilização de repositórios para abstrair a camada de dados (Prisma ORM), facilitando a criação de _Mocks_ para testes.
3. Nomenclatura semântica e validação de esquemas rigorosa com **Zod**.

---

## 🚀 Como Executar o Projeto

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/FilipeVBF/API-FindAFriend.git
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configuração do Ambiente:**
    - Crie e configure o arquivo .env baseado no .env.example.

4.  **Banco de Dados:**
    - Inicia os containers em background.

    ```bash
    docker compose up -d
    ```

5.  **Migrations e Prisma:**
    - Gera o cliente do Prisma.

    ```bash
    npm run prisma:generate
    ```

    - Executa as migrations para criar as tabelas.

    ```bash
    npm run prisma:migrate
    ```

6.  **Inicie a aplicação:**

    ```bash
    npm run dev
    ```

7.  **Testes:**
    ```bash
    npm run test
    ```
