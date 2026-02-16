# InvenNode: Code Lab

📌 Contextualização
Este projeto foi desenvolvido como parte da Iniciativa Code Lab, do Instituto Programadores do Amanhã, com o objetivo de desenvolver um probjeto backend, com a linguagem JavaScript, utilziando Node.Js e a biblioteca Express. A proposta é criar uma API Rest, no protocolo HTTP com as operações CRUD(Criar, Ler, Atualizar e Deletar) que resolva o problema de alguma empresa.
O objetivo do projeto é solucionar o problema do microempreendedor que está cansado de perder o controle de suas vendas em caderninhos que somem. 

🚀 Tecnologias Utilizadas
- Node.js: Ambiente de execução para o JavaScript no servidor.
- Express: Framework para construção de APIs REST estruturadas sob o protocolo HTTP.
- UUID (node:crypto): Para geração de identificadores únicos e universais para as notas.
- Validation.js: para validação de emails, telefones e ceps.
- JavaScript (ES6+): Utilizando módulos nativos (ESM) para um código limpo e moderno.

--------------------------------------------------------------------------------
🏗️ Arquitetura e Organização
O projeto segue a arquitetura MVC (Model-View-Controller), garantindo que o código seja bem organizado, limpo e escalável:
- Models: Responsáveis pela lógica de dados, persistência (banco mocado) e cálculos de valores.
- Controllers: Atuam como intermediários, gerenciando as rotas e aplicando regras de negócio rigorosas (validações).
- Routes: Definem os pontos de entrada da API.

--------------------------------------------------------------------------------
🛠️ Funcionalidades Principais (CRUD)
A API permite o gerenciamento completo de Notas de Venda:
- Create: Gera uma nota validando se o Remetente e o Cliente existem, calculando o totalValue automaticamente com base no preço atual dos produtos.
- Read: Listagem de todas as notas ou busca específica por ID.
- Update: Atualização parcial (PATCH) de campos como status e methodPayment, com validações de tipos e valores permitidos.
- Delete: Remoção de registros da base de dados.

--------------------------------------------------------------------------------
🛡️ Regras de Negócio e Validações
Para garantir a segurança dos dados, a API conta com barreiras de proteção no Controller:
- Status Permitidos: canceled, waiting, paid.
- Métodos de Pagamento: pix, debit, credit, cash.
- Integridade: Bloqueio de inputs inválidos (como números em campos de texto) e normalização de strings [Conversa].

--------------------------------------------------------------------------------
🏁 Como Executar o Projeto
1. Clone o repositório:
2. Instale as dependências:
```
npm install
```
3. Inicie o servidor:
```
npm run dev 
```
4. Acesse a API: O servidor estará rodando em http://localhost:3000. Utilize ferramentas como Insomnia ou Postman para testar as rotas.


