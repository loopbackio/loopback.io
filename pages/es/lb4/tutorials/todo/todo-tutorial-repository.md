---
lang: es
title: 'Agregar un Repositorio'
layaout: translation
keywords: LoopBack 4.0, LoopBack 4
sidebar: es_lb4_sidebar
permalink: /doc/es/lb4/todo-tutorial-repository.html
summary: LoopBack 4 Tutorial Aplicación Todo - Agregar un Repositorio
---

### Repositorios

El patrón de repositorio es una de las diferencias más fundamentales
entre LoopBack 3 y 4. En LoopBack 3, usaría las definiciones de clase
de modelo para realizar operaciones CRUD. En LoopBack 4, la capa responsable
de esto se ha separado de la definición del modelo en sí, en la capa de repositorio.

Un `Repositorio` representa una interfaz de `Servicio` especializada que proporciona
operaciones de acceso de datos de tipo fuerte (por ejemplo, CRUD) de un modelo de
dominio contra la base de datos o servicio subyacente.

Para mas información sobre Repositorios, ver
[Repositorios](https://loopback.io/doc/en/lb4/Repositories.html).

### Crear tu repositorio

Desde el interior de la carpeta del proyecto, ejecute el comando `lb4 repository`
para crear un repositorio para su modelo de tareas pendientes utilizando la fuente
de datos` db` del paso anterior. La fuente de datos `db` aparece por su nombre de
clase` DbDataSource` de la lista de fuentes de datos disponibles.

```sh
lb4 repository
? Please select the datasource DbDatasource
? Select the model(s) you want to generate a repository Todo
   create src/repositories/todo.repository.ts
   update src/repositories/index.ts
? Please select the repository base class DefaultCrudRepository (Legacy juggler
bridge)

Repository TodoRepository was created in src/repositories/
```

El archivo `src/repositories/index.ts` hace que la exportación de artefactos sea
central y también más fácil de importar.

La clase `todo.repository.ts` recién creada tiene las conexiones necesarias que son
necesarias para realizar operaciones CRUD para nuestro modelo de tareas pendientes.
Aprovecha la definición del modelo Todo y la configuración de la fuente de datos 'db'
y recupera la fuente de datos utilizando
[Inyección de Dependencia](https://loopback.io/doc/en/lb4/Dependency-injection.html).

Ahora podemos exponer la API `Todo` a través de
[controlador](todo-tutorial-controller.md).

### Navegación

Paso anterior: [Agregar un datasource](todo-tutorial-datasource.md)

Siguiente paso: [Agregar un controlador](todo-tutorial-controller.md)
