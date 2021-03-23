---
title: "app-name.yaml"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/app-name.yaml.html
summary:
---

This is an example of an application YAML file for an "empty" LoopBack application.

NOTE: Applicable to API Connect apps.

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
