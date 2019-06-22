---
lang: es
title: LoopBack 4
toc: false
keywords: LoopBack 4
sidebar: es_lb4_sidebar
permalink: /doc/es/lb4/index.html
summary: LoopBack es una plataforma para crear API y microservicios en Node.js
---

{% include note.html content="This is a community translation into Spanish. For the latest information, see the [English version](/doc/en/lb4/index.html).
" %}

{% include important.html content="LoopBack 4 DT (Disponibilidad Total) ha sido lanzado en
Octubre 2018, lea más en el
[anuncio de publicación](http://strongloop.com/strongblog/loopback-4-ga)
" %}

{% include see-also.html title="GitHub Repo" content='  El código marco de LoopBack 4 se está desarrollando en un "mono-repositorio",
[loopback-next](https://github.com/strongloop/loopback-next), en lugar de múltiples repos, como en v3. Sin embargo, los ejemplos y los componentes desarrollados externamente estarán en repositorios separados.
'%}

LoopBack es un framework de Node.js altamente extensible y de código abierto basado en Express
que le permite crear rápidamente API y microservicios compuestos desde el backend sistemas como bases de datos y
servicios SOAP o REST.

El siguiente diagrama muestra cómo LoopBack sirve como un puente de composición.
entre peticiones entrantes e integraciones salientes. También muestra los diferentes
Personas que están interesadas en varias capacidades proporcionadas por LoopBack..

![LoopBack 4 Visión general](./imgs/lb4-high-level.png)

## Creado para desarrolladores de API

- Define tu API los endpoint y esquemas usando la
  [OpenAPI](https://www.openapis.org/) standard.
- Escribe tus endpoints en javascript moderno utilizando ES2017, `async` / `await`,
  módulos.
- Usa tus endpoints y esquemas definidos como el la fuente de la verdad sin generar código.

## Creado para equipos

- Revise los cambios en los endpoints de la API sin indagar a través de javascript.
- Mantenga la consistencia automatizando la validación de sus endpoints y esquemas.
- Soporte de primera clase [TypeScript](https://www.typescriptlang.org) (Javascript fuertemente tipado).

## Creado para tu plataforma

- Usa loopback como un iniciador de puntos para tu propio framework or plataforma.
- Construye librerías de componentes reutilizables y de una manera estandarizada.
- Intégralo con base de datos, servicios web y otras plataformas usando conectores.
