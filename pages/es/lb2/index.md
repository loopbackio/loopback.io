---
title: "LoopBack - español"
layout: translation
sidebar: es_lb2_sidebar
lang: es
tags:
permalink: /doc/es/lb2/index.html
summary: LoopBack es una platforma para construir APIs y microservicios con Node.js.
---


## Descripcion General

LoopBack es un framework 
[premiado](https://strongloop.com/strongblog/loopback-2019-api-award-api-middleware/),
altamente extensible, de codigo abierto Node.js y Typescript, basado en Express. Permite construir rapidamente APIs y microservicios compuestos por bases de datos y servicios REST o SOAP.

El siguiente diagrama muestra como Loopback da soporte a integraciones en sistemas donde se atienden peticiones entrantes y salientes. Tambien muestra los diferentes roles  interesadas en las capacidades proporcionadas por LoopBack.

![LoopBack 4 Descripcion General](./imgs/lb4-high-level.png)

### Hecho para desarrolladores de servicios web (API)

- Defina los endpoint y esquemas de su API usando el estandar 
  [OpenAPI](https://www.openapis.org/) 
- Escriba sus endpoints en JavaScript moderno, usando los modulos `async` / `await`,
  de ES2017.
- Utilice sus actuales definiciones de endpoint y esquemas como fuente sin generar codigo.

### Hecho para equipos

- Revise los cambios en los endpoint de su API sin necesidad de revisar el codigo Javascript.
- Mantenga la consistencia de su codigo automatizando la validacion de sus endpoints y esquemas.
- Soporte de primera clase para [TypeScript](https://www.typescriptlang.org) (JavaScript fuertemente tipado).

### Hecho para su plataforma

- Utilice LoopBack como punto de partida para armar su propio framework o plataforma.
- Construya librerias de componentes reutilizables de manera estandar.
- Integre con bases de datos, serivios web y otras plataformas, utilizando conectores.

## Como esta organizada nuestra documentacion

Hacemos uso del framework de documentacion tecnica [Diataxis](https://diataxis.fr)
el cual se basa en organizar la documentacion en cuatro cuadrantes:

- Orientado al aprendizaje `Tutoriales` provee lecciones de modo practico (hands-on),
  donde los usuarios aprenden el framework haciendo.

- Orientado a problemas `Guias How-to (Como  hacer)` provee recetas para resolver 
  problemas especificos comunes de encontrar cuando construyes proyectos con Loopback.

- Orientado a entender `Conceptos` paginas que proveen explicaciones sobre conceptos 
  propios de la arquitectura, un vistazo mas amplio y en profundidad del framework.

- Orientado a la informacion `Guias de referencia` provee una descripcion tecnica
 del framework y como utilizarlo.
