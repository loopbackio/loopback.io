---
lang: es
title: 'Crea tu aplicación scaffolding'
layout: translation
keywords: LoopBack 4.0, LoopBack 4
sidebar: es_lb4_sidebar
permalink: /doc/es/lb4/todo-tutorial-scaffolding.html
summary: LoopBack 4 Tutorial Aplicación Todo - Crea tu aplicación scaffolding
---

### Crea tu aplicación scaffolding

El kit de herramientas de LoopBack 4 CLI viene con plantillas que generan todo tipo de
aplicaciones, así como artefactos (por ejemplo, controladores, modelos y
repositorios) para aplicaciones existentes.

Para generar su aplicación usando el kit de herramientas, ejecute el comando `lb4 app` y
complete las instrucciones en pantalla:

```sh
$ lb4 app
? Project name: todo-list
? Project description: A todo list API made with LoopBack 4.
? Project root directory: (todo-list)
? Application class name: (TodoListApplication)
? Select features to enable in the project:
 ◉ Enable eslint: add a linter with pre-configured lint rules
 ◉ Enable prettier: install prettier to format code conforming to rules
 ◉ Enable mocha: install mocha to run tests
 ◉ Enable loopbackBuild: use @loopback/build helpers (e.g. lb-eslint)
 ◉ Enable vscode: add VSCode config files
❯◯ Enable docker: include Dockerfile and .dockerignore
 ◉ Enable repositories: include repository imports and RepositoryMixin
 ◉ Enable services: include service-proxy imports and ServiceMixin
 # npm will install dependencies now
 Application todo-list was created in todo-list.
```

Para este tutorial, cuando se le solicitan las opciones para habilitar ciertos proyectos
características (compilación de LoopBack, eslint, mocha, etc.), déjelas todas habilitadas excepto
para `docker`.

### Estructura

Después de que se genere su aplicación, tendrá una estructura de carpetas similar a
a la siguiente:

```text
public/
  index.html
src/
  __tests__/
    README.md
    acceptance/
      home-page.acceptance.ts
      ping.controller.acceptance.ts
      test-helper.ts
  controllers/
    index.ts
    README.md
    ping.controller.ts
  datasources/
    README.md
  models/
    README.md
  repositories/
    README.md
  application.ts
  index.ts
  migrate.ts
  sequence.ts
node_modules/
  ***
LICENSE
README.md
index.js
index.ts
package.json
tsconfig.json
eslint.build.json
eslint.json
.mocharc.json
```

| Archivo                                                     | Propósito                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `index.ts`                                               | Permite importar contenidos de la carpeta `src` (para usar en tros lugares)                                                                                                                                                                                                                                                                                                        |
| `index.js`                                               | Archivo de nivel superior que conecta los componentes de la aplicación.                                                                                                                                                                                                                                                                                                                 |
| `package.json`                                           | El manifiesto del paquete de su aplicación. Ver [package.json](https://docs.npmjs.com/files/package.json) para más detalles.                                                                                                                                                                                                                                                          |
| `tsconfig.json`                                          | La configuración del proyecto TypeScript. Ver  [tsconfig.json](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html) para más detalles.                                                                                                                                                                                                                                   |
| `eslint.json`                                            | [ESLint configuración](https://palantir.github.io/eslint/usage/eslint-json/)                                                                                                                                                                                                                                                                                             |
| `eslint.build.json`                                      | [ESLint configuración (solo construir)](https://palantir.github.io/eslint/usage/eslint-json/)                                                                                                                                                                                                                                                                                |
| `README.md`                                              | El archivo README basado en Markdown generado para su aplicación.                                                                                                                                                                                                                                                                                                                |
| `LICENSE`                                                | Una copia de la licencia MIT. Si no desea utilizar esta licencia, elimine este archivo.                                                                                                                                                                                                                                                                              |
| `src/application.ts`                                     | La clase de aplicación, que se extiende [`RestApplication`](https://loopback.io/doc/en/lb4/apidocs.rest.restapplication.html) por defecto. Esta es la raíz de su aplicación y es donde se configurará su aplicación. También se extiende [`RepositoryMixin`](https://loopback.io/doc/en/lb4/apidocs.repository.repositorymixin.html) la cual define el datasource. |
| `src/index.ts`                                           | El punto de partida de su microservicio. Este archivo crea una instancia de su aplicación, ejecuta el programa de arranque y luego intenta iniciar [`RestServer`](https://loopback.io/doc/en/lb4/apidocs.rest.restserver.html) instancia vinculada a la aplicación.                                                                                                                   |
| `src/sequence.ts`                                        | Una extensión de la [Secuencia](Sequence.md) clase utilizada para definir el conjunto de acciones a realizar durante una solicitud / respuesta REST.                                                                                                                                                                                                                                              |
| `src/controllers/README.md`                              | Proporciona información sobre el directorio del controlador, cómo generar nuevos controladores y dónde encontrar más información.                                                                                                                                                                                                                                                |
| `src/controllers/ping.controller.ts`                     | Un controlador básico que responde a las solicitudes GET en `/ping`.                                                                                                                                                                                                                                                                                                             |
| `src/datasources/README.md`                              | Proporciona información sobre el directorio de fuentes de datos, cómo generar nuevas fuentes de datos y dónde encontrar más información.                                                                                                                                                                                                                                               |
| `src/models/README.md`                                   | Proporciona información sobre el directorio de modelos, cómo generar nuevos modelos y dónde encontrar más información.                                                                                                                                                                                                                                                         |
| `src/repositories/README.md`                             | Proporciona información sobre el directorio de repositorios, cómo generar nuevos repositorios y dónde encontrar más información.                                                                                                                                                                                                                                             |
| `src/__tests__/`                                         | Por favor, coloque sus pruebas en esta carpeta.                                                                                                                                                                                                                                                                                                                                  |
| `src/__tests__/acceptance/ping.controller.acceptance.ts` | Un ejemplo de prueba para ir con el controlador de ping en `src/controllers`.                                                                                                                                                                                                                                                                                                     |
| `.mocharc.json`                                          | [Mocha](https://mochajs.org/) Configuración para ejecutar las pruebas de su aplicación.                                                                                                                                                                                                                                                                                        |

### Navegación

Siguiente paso: [Agregar un modelo](todo-tutorial-model.md)
