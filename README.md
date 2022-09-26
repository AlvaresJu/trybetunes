# TrybeTunes Project

[![TrybeTunes Screen Shot][product-screenshot]](githubpages)

Link do projeto: 

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o Projeto</a>
      <ul>
        <li><a href="#contexto">Contexto</a></li>
        <li><a href="#tecnologias-utilizadas">Tecnologias Utilizadas</a></li>
        <li><a href="#funcionalidades-implementadas">Funcionalidades Implementadas</a></li>
      </ul>
    </li>
    <li>
      <a href="#para-iniciar-a-aplicação">Para Iniciar a Aplicação</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#clonando-o-repositório">Clonando o Repositório</a></li>
        <li><a href="#instalando-dependências">Instalando Dependências</a></li>
        <li><a href="#executando-a-aplicação">Executando a Aplicação</a></li>
      </ul>
    </li>
    <li><a href="#contribuições-e-autorias">Contribuições e Autorias</a></li>
  </ol>
</details>


# Sobre o Projeto
  O projeto TrybeTunes é uma aplicação front-end que consome a [API gratúita do Itunes](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html#//apple_ref/doc/uid/TP40017632-CH3-SW1), permitindo que a pessoa usuária reproduza músicas das mais variadas bandas e artistas, crie uma lista de músicas favoritas e edite dados do seu perfil. 

## Contexto
  Esse projeto foi desenvolvido por _[Juliana Álvares](https://www.linkedin.com/in/juliana-%C3%A1lvares-246872112/)_, como parte do processo de aprendizado do Módulo de Front-end, do curso de Desenvolvimento Web da [Trybe](https://www.betrybe.com/) :rocket:
  
  _"A Trybe é uma escola do futuro para qualquer pessoa que queira mudar de vida e construir uma carreira de sucesso em tecnologia, onde a pessoa tem a possibilidadae de só pagar quando conseguir um bom trabalho."_

  O programa conta com mais de 1.500 horas de aulas presenciais e online, aborda introdução ao desenvolvimento de software, front-end, back-end, ciência da computação, engenharia de software, metodologias Ágeis e habilidades comportamentais.

## Tecnologias Utilizadas

  Front-end:
  * [![React][React.js]][React-url]
  * [![React Router][React-router]][React-router-url]

  Linguagens:
  * [![JavaScript - ES6][JavaScript]][JavaScript-url]
  * [![CSS3][CSS3]][CSS3-url]
  * [![HTML5][HTML5]][HTML5-url]

## Funcionalidades Implementadas

  [![TrybeTunes Gif][product-gif]](githubpages)

  - Configuração de rotas;
  - Login com identificação da pessoa usuária;
  - Busca por uma banda ou artista;
  - Listagem dos álbuns disponíveis da banda ou artista pesquisado;
  - Visualização das músicas de um álbum selecionado;
  - Reprodução de uma prévia das músicas de um álbum selecionado;
  - Possibilidade de favoritar e desfavoritar músicas;
  - Visualização da lista de músicas favoritas;
  - Visualização do perfil da pessoa logada;
  - Edição de informações do perfil da pessoa logada.


# Para Iniciar a Aplicação
  Para rodar localmente é necessário garantir o cumprimento dos pré-requisitos, fazer uma cópia e rodar as instruções conforme a seguir:

## Pré-requisitos
  [Node.js](https://nodejs.org/en/) em versão 16.

## Clonando o Repositório
  ```bash
    git clone git@github.com:AlvaresJu/trybetunes-project.git
  ```
## Instalando Dependências
  ```bash
    cd trybetunes-project/
    npm install
  ``` 
## Executando a Aplicação
  ```bash
    cd trybetunes-project/
    npm start
  ```
<!-- Caso a aplicação tenha testes:
## Executando testes e análise de cobertura
  ```bash
    npm test
    npm run test-coverage
  ```
-->


# Contribuições e Autorias
  Como descrito, este projeto foi proposto pela [Trybe](https://www.betrybe.com/) e desenvolvido por _[Juliana Álvares](https://www.linkedin.com/in/juliana-%C3%A1lvares-246872112/)_ durante o curso de Desenvolvimento Web realizado. Por isso, foram disponibilizados pela Trybe alguns arquivos base de configurações e auxiliares ao desenvolvimento do projeto. Segue especificação de autoria dos principais documentos:
  
  Arquivos/pastas desenvolvidos pela autora do projeto (Juliana Álvares):
  > src/components/ , src/pages/ , src/styles/ , src/App.js , src/index.js , src/index.css
  
  Arquivos/pastas desenvolvidos pela Trybe:
  > src/images/ , src/services/ , eslintrc.json , stylelintrc.json , package.json , package-lock.json

  
<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: images/screenshot.png
[product-gif]: images/features.gif
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[React-router]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[React-router-url]: https://reactrouter.com/en/main
[JavaScript]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[CSS3]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[HTML5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/en-US/docs/Glossary/HTML5
