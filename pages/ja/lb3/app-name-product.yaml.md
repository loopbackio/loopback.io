---
title: "app-name-product.yaml"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/app-name-product.yaml.html
summary:
---

This is an example of a default product YAML file for an "empty" LoopBack application.

NOTE: Applicable to API Connect apps.

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
