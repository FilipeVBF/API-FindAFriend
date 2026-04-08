# Tarefas

## Use este checklist para ajudar a organizar a sua entrega

- [ ] Rota para cadastrar uma ORG, garantindo que inclua endereço e número de WhatsApp
- [ ] Rota de login para uma ORG
- [ ] Rota para cadastrar um pet, garantindo que ele seja associado a uma ORG
- [ ] Rota para listar pets, exigindo a cidade como parâmetro obrigatório
- [ ] Implementar a funcionalidade de filtros opcionais por características dos pets na listagem
- [ ] Rota para visualizar os detalhes de um pet específico
- [ ] Garantir que o acesso de administrador da ORG seja restrito a usuários logados
- [ ] Aplicar os princípios SOLID durante o desenvolvimento da estrutura da API
- [ ] Criar testes para validar as funcionalidades e regras de negócio

## Dados Necessários no PET

[ ] Nome, Sobre (Descrição), Idade(ENUM), Porte(ENUM), Nível de energia(ENUM), Nível de independência(ENUM), Ambiente(ENUM), Fotos, Requisito, ORG (Sempre vinculado a uma ORG)

######

- [x] Deve ser possível cadastrar uma org
- [x] Deve ser possível logar em uma org
- [ ] Deve gerar uma token quando logado
- [x] Deve ser possível cadastrar um pet, garantindo que ele seja associado a uma org
- [ ] Deve ser possível listar pets, exigindo a cidade como parâmetro obrigatório
- [ ] Deve ser possível listar pets, por filtros opcionais de características dos pets
- [ ] Deve ser possível buscar detalhes de um pet por seu ID


## 🚀 Como Executar o Projeto

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/FilipeVBF/API-FindAFriend.git](https://github.com/FilipeVBF/API-FindAFriend.git)
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
