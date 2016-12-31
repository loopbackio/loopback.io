---
title: "app-name.yaml"
lang: pt-br
layout: page
keywords: LoopBack
tags:
sidebar: pt-br_lb2_sidebar
permalink: /doc/pt-br/lb2/app-name.yaml.html
summary:
---

Este é um exemplo de um arquivo YAML de um aplicativo para um aplicativo LoopBack "vazio".

OBERVAÇÃO: Aplicável à aplicativos da API Connect.

```
swagger: '2.0'
info:
  x-ibm-name: empty
  version: 1.0.0
  title: empty
schemes:
  - https
host: $(catalog.host)
basePath: /api
consumes:
  - application/json
produces:
  - application/json
securityDefinitions:
 clientIdHeader:
   type: apiKey
   in: header
   name: X-IBM-Client-Id
 clientSecretHeader:
   in: "header"
   name: "X-IBM-Client-Secret"
   type: "apiKey"

security:
 -
   clientIdHeader: []
   clientSecretHeader: []
x-ibm-configuration:
  gateway: micro-gateway
  catalogs:
    apic-dev:
      properties:
        runtime-url: $(TARGET_URL)
    sb:
      properties:
        runtime-url: 'http://localhost:3001'
  assembly:
    execute:
      - invoke:
          target-url: $(runtime-url)$(request.path)
paths: {}

definitions: {}
```
