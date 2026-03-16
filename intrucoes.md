[x] npm init -y
[x] npm i typescript @types/node tsx tsup -D // Instala o typescript, tsx (biblioteca usada para executar o codigo typescript pois o node nao entende ts), tsup ( Biblioteca utilizada na criacao da build da aplicacao, para quando colocar o projeto em producao o codigo ts seja convertido para js)
[x] npx tsc --init (Cria o tsconfig.json)
[x] npm i fastify
[x] npm i dotenv (Biblioteca usada para ler o arquivo .env e transformar em variaveis ambiente dentro do node)
[x] npm i zod
[x] npm i prisma -D
[x] npx prisma init
[x] npx prisma generate, cria uma forma automatica de tipagem do schema, que seria a integracao do typescript para que o codiga entenda que existe a tabela criada, e que ela tem os campos inseridos.
[ ] npx prisma migrate dev, le o arquivo schema.prima, compara com o banco de dados que esta rodando, ve as alteracao que nao foram criadas e insere no banco (tabelas, colunas). USAR QUANDO PRECISAR FAZER ALGUMA ALTERACAO NO BANCO
[ ] npx prisma studio - mostra o banco no navegador
[x] npm i @prisma/client, usada para acessar o banco de dados
[x] npm i @prisma/adapter-pg
[x] npm i pg
[x] npm i @types/pg -D
[x] npm i bcryptjs, umas das bibliotecas mais famosas para fazer hashing de senhas
[x] npm i vitest vite-tsconfig-paths -D // intalando o vitest com com um plugin para o vitest entender as configurações de paths feitas no tsconfig.js
[x] npm i @vitest/ui -D
[ ] npm run test:covarage // O Coverage é uma métrica utilizada para medir a quantidade de código que está sendo testado em uma aplicação.
[ ] npm i dayjs -> biblioteca para trabalhar com datas
[x] npm i @fastify/jwt
[x] npm i supertest -D -> biblioteca mais usada para fazer as requisicoes http do teste para a aplicacao, sem precisar subir a aplicacao
[x] npm i @types/supertest -D -> instala os tipos e dependencias
[x] npm i @fastify/cookie -> sera utilizado cookie para passar o refresh token para o frontend

========= Docker Setup ===========

[x] Instalar Docker na máquina
→ Ferramenta usada para rodar containers isolados (banco, redis, etc).

[x] Criar o arquivo docker-compose.yml na raiz do projeto
→ Arquivo que define os containers que a aplicação precisa rodar.

[x] Subir o container do banco
→ docker compose up -d

[x] Verificar se o container está rodando
→ docker ps

[x] Criar/Alterar variável de ambiente de conexão com o banco
→ Arquivo .env: DATABASE_URL="postgresql://docker:docker@localhost:5432/findafriend"

[x] Rodar migrations do banco
→ npx prisma migrate dev

[x] Verificar banco com Prisma Studio
→ npx prisma studio

======== Comandos úteis do Docker no dia a dia ========

[ ] Parar containers
docker compose down

[ ] Reiniciar containers
docker compose restart

[ ] Apagar container + volumes (reset total do banco)
docker compose down -v
→ Remove banco e todos os dados.

[ ] Subir novamente
docker compose up -d

======== Utils =========

## Utils

[x] (ALIAS DE IMPORTACAO) No tsconfig.js, descomentar e aplicar esses comandos:

<!--
  "baseUrl": "./",
  "paths": {
    "@/_": ["./src/_"]
  },
  Torna possivel importar utilizando apenas @/nomedoarquivo, sem precisar utilizar ../../ para voltar pastas
-->

[x] No settings.json, aplicar esses comandos para quando salvar arquivos prisma ocorrer uma formatação:

<!--
  "[prisma]": {
     "editor.formatOnSave": true
   }
-->
