---
lang: es
layout: translation
title: 'Iniciando'
keywords: LoopBack 4.0, LoopBack 4
sidebar: es_lb4_sidebar
permalink: /doc/es/lb4/Getting-started.html
summary: Escribe y ejecuta un proyecto "Hello World" en LoopBack 4 en TypeScript.
---

## Prerrequisitos

Instala [Node.js](https://nodejs.org/en/download/) (version 8.9 ó la última) si no esta no esta instalado
en tu máquina.

## Instalación del CLI de LoopBack 4

El CLI de loopback 4 es una interfaz de línea de comando que establece un proyecto o un
una extensión para generar el código básico. El CLI ofrece una forma mas rapida para iniciar
con un proyecto en Loopback 4 que adhiere las mejores prácticas.

Instala el CLI de forma global para ejecutarlo.

```sh
npm i -g @loopback/cli
```

## Crea un nuevo proyecto

La herramienta CLI basará el proyecto, configurará el compilador de TypeScript e instalará todas
las dependencias necesarias. Para crear un nuevo proyecto, ejecute el CLI de la siguiente manera y responda a las solicitudes.

```sh
lb4 app
```

Responda las indicaciones de la siguiente manera:

```sh
? Project name: iniciando
? Project description: iniciando tutorial
? Project root directory: (iniciando)
? Application class name: StarterApplication
? Select features to enable in the project:
❯◉ Enable eslint: add a linter with pre-configured lint rules
 ◉ Enable prettier: install prettier to format code conforming to rules
 ◉ Enable mocha: install mocha to run tests
 ◉ Enable loopbackBuild: use @loopback/build helpers (e.g. lb-eslint)
 ◉ Enable vscode: add VSCode config files
 ◉ Enable docker: include Dockerfile and .dockerignore
 ◉ Enable repositories: include repository imports and RepositoryMixin
 ◉ Enable services: include service-proxy imports and ServiceMixin
```

### Iniciando el proyecto

El proyecto viene con una ruta de "ping" para probarlo.
Vamos a ejecutarlo de la siguiente manera.

```sh
cd iniciando
npm start
```

En el navegador, visita <http://127.0.0.1:3000/ping>.

## Agregando tu propio controlador

Ahora que tenemos nuestro proyecto básico creado, es hora de agregar nuestro propio
[controller](Controllers.md). Vamos a añadir un sencillo controlador "Hello World" como
sigue:

```sh
lb4 controller
```

- _Nota: si tu aplicación todavía está ejecutándose, presiona **CTRL+C** para detenerla
  antes de llamar al command_

- Responda las indicaciones de la siguiente manera:

  ```sh
  ? Controller class name: hello
  ? What kind of controller would you like to generate? Empty Controller
    create src/controllers/hello.controller.ts
    update src/controllers/index.ts

  Controller hello was now created in src/controllers/
  ```

- Pega el siguiente contenido dentro del archivo
  `/src/controllers/hello.controller.ts`:

  ```ts
  import {get} from '@loopback/rest';

  export class HelloController {
    @get('/hello')
    hello(): string {
      return 'Hello world!';
    }
  }
  ```

- Inicia la aplicacion utilizando `npm start`.

- Visita <http://127.0.0.1:3000/hello> para visualizar `Hello world!`

## Código de ejemplo

Puedes ver el código generado para este ejemplo en:
[hello-world](https://github.com/strongloop/loopback-next/tree/master/examples/hello-world)
