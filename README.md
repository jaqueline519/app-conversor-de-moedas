# Conversor de Moedas

Esta é uma aplicação Angular que exibe as cotações das moedas Dólar Canadense, Peso Argentino e Libra Esterlina, desenvolvido com Angular CLI 17.0.5.

## Pré-requisitos

Certifique-se de ter as seguintes instalações globais em seu ambiente para prosseguir:

- [Node.js](https://nodejs.org/) (versão 18.17.1 ou superior)
- [npm](https://www.npmjs.com/) (normalmente instalado juntamente com o Node.js)
- [Angular CLI](https://angular.io/cli) (versão 17.0.5)

## Instalação

1. Clone este repositório para o seu ambiente local:

    ```bash
    git clone https://github.com/jaqueline519/app-conversor-de-moedas.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd app-conversor-de-moedas
    ```

3. Instale as dependências do projeto usando o npm:

    ```bash
    npm install
    ```

## Execução e Visualização no Browser

Depois de instalar as dependências, você pode iniciar o servidor de desenvolvimento usando o seguinte comando:

- No bash ou prompt de comando, na pasta raiz do projeto `app-conversor-de-moedas`, certifique-se de não estar utilizando a porta 4200 (não deve existir outro servidor local ativo em http://localhost:4200/):

    ```bash
    npm start --open
    ```

    Este comando iniciará o servidor de desenvolvimento e abrirá automaticamente uma janela no browser em [http://localhost:4200/](http://localhost:4200/).

    Ou ainda, apenas execute:

    ```bash
    ng serve
    ```

    Neste caso, o servidor ainda será iniciado da mesma forma, e você pode acessar manualmente o link [http://localhost:4200/](http://localhost:4200/).

## Scripts Úteis

- **Modo de Observação para Desenvolvimento:**

    ```bash
    npm run watch
    ```

- **Executar Testes Unitários:**

    ```bash
    npm test
    ```

- **Executar Testes Unitários (Modo CI):**

    ```bash
    npm run test:ci
    ```

- **Abrir o Cypress (Testes E2E):**

    Certifique-se de ter seu ambiente configurado e o Cypress instalado:

    ```bash
    npm run cy:open
    ```
