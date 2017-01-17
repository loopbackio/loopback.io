---
title: "Instalando o StrongLoop"
lang: pt-br
layout: page
toc: false
keywords: LoopBack
tags:
sidebar: pt-br_lb2_sidebar
permalink: /doc/pt-br/lb2/Installing-StrongLoop.html
summary:
---

A plataforma StrongLoop's Node API consiste de:

*   [LoopBack](index.html), um framework de aplicações Node com base no [Express](http://expressjs.com/).
*   [Gerenciador de Processos StrongLoop](https://strong-pm.io) e ferramentas de devops embutidas para aplicações Node.

{% include important.html content="StrongLoop Arc e `slc` já não está em desenvolvimento ativo, e em breve será descontinuado. Os recursos do Arc's estão sendo incluídos no [IBM API Connect Developer Toolkit](https://developer.ibm.com/apiconnect).
" %}

## O que você terá que fazer

Segue as instruções para o seu sistema operacional:

* [MacOS](Installing-on-MacOS.html)
* [Windows](Installing-on-Windows.html)
* [Linux](Installing-on-Linux.html)

Você irá executar **`npm install -g strongloop`**, o qual instalará:

*   A ferramenta de linha de comando StrongLoop, `slc`, para criar, executar e gerenciar aplicações LoopBack e Node.
*   [Ferramentas de linha de comando Angular LoopBack](https://github.com/strongloop/loopback-sdk-angular-cli). Veja [SDK do JavaScript AngularJS ](AngularJS-JavaScript-SDK) para mais detalhes.
*   StrongLoop Arc, é um conjunto de ferramentas gráficas para o ciclo de vida da API, incluindo ferramentas para compilação, criação de perfil e monitoramento da aplicação. **OBSERVAÇÃO**: StrongLoop Arc foi descontinuado em favor de [API Connect](https://developer.ibm.com/apiconnect/) API Designer.
*   Varias outras ferramentas, incluindo [Yeoman](http://yeoman.io/), o gerador Yeoman LoopBack para criar o scaffold da aplicação, e [Grunt](http://gruntjs.com/), o automatizador de tarefas JavaScript.
