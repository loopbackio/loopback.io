---
title: "app-name-product.yaml"
lang: pt-br
layout: page
keywords: LoopBack
tags:
sidebar: pt-br_lb2_sidebar
permalink: /doc/pt-br/lb2/app-name-product.yaml.html
summary:
---

Este é um exmplo de um arquivo YAML de produto padrão para um aplicativo LoopBack "vazio".

OBERVAÇÃO: Aplicável à aplicativos da API Connect.

```
product: '1.0.0'
info:
  name: empty
  title: empty
  version: 1.0.0
apis:
  'empty':
    $ref: empty.yaml
visibility:
  view:
    type: public
  subscribe:
    type: authenticated
plans:
  default:
    title: Default Plan
    description: Default Plan
    approval: false
    rate-limit:
      value: 100/hour
      hard-limit: false
```
