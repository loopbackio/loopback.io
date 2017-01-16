---
title: Todas as tags
toc: false
lang: pt-br
keywords:
tags: [reference]
sidebar: pt-br_lb2_sidebar
permalink: /doc/pt-br/lb2/All-tags.html
summary:
---

## Lista de tags definidas

{% for tag in site.data.tags.allowed-tags %}
- [{{tag}}](tag_{{tag}}.html)
{% endfor %}
