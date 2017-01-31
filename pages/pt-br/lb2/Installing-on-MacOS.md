---
title: "Instalação no MacOS"
lang: pt-br
trans_complete: false
layout: page
keywords: LoopBack
tags:
sidebar: pt-br_lb2_sidebar
permalink: /doc/pt-br/lb2/Installing-on-MacOS.html
summary:
---

## Pré-requisitos

### Instalar as Ferramentas de Compilação

Se você quer recursos tal como: [aplicações para criação de perfis](https://docs.strongloop.com/display/SLC/Profiling) ou [monitoramento](https://docs.strongloop.com/display/SLC/Monitoring-app-metrics), você pode precisar ferramentas de compilação antes de iniciar. Veja [Instalando ferramentas de compilação](Installing-compiler-tools.html#macos) para mais informações.

### Definir permissões de diretórios

{% include content/node-dir-privs.md %}

### Instalar Node.js

Se você ainda não instalou o Node, faça o download [instalação nativa de nodejs.org](http://nodejs.org/en/download) e execute-o.

{% include tip.html content="Para melhores resultados, use a última versão LTS (longo tempo de suporte) do Node.js.
" %}

## Instalar o StrongLoop

Siga estas etapas:

1.  Abra um terminal.
2.  Digite esses comandos:

    `$ npm install -g strongloop`

    Se você não definiu privilégios de arquivos e pastas, use **sudo** antes do comando.

    `$ sudo npm install -g strongloop`

    {% include note.html content="Durante a instalação, você pode ver um número de erros de `node-gyp` se você não tem [ferramentas de compilação](Installing-compiler-tools.html) instalado. Você pode ignorar esses erros por hora.
    " %}

Se você tiver qualquer problema, veja [Solucionando problemas de instalação](Installation-troubleshooting.html).
