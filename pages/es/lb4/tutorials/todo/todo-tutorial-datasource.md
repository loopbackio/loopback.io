---
lang: es
title: 'Agregar un Datasource'
layout: translation
keywords: LoopBack 4.0, LoopBack 4
sidebar: es_lb4_sidebar
permalink: /doc/es/lb4/todo-tutorial-datasource.html
summary: Tutorial de aplicación de LoopBack 4 Todo - Agregar un Datasource
---

### Datasources

Los datasources son la forma en que LoopBack se conecta a varias fuentes de datos, como bases de datos,
API, colas de mensajes y más. Un `DataSource` en LoopBack 4 es una configuración con nombre para
una instancia de Connector que representa datos en un sistema externo. El conector se utiliza
por `legacy-juggler-bridge` para alimentar los repositorios LoopBack 4 para operaciones de datos.

En LoopBack 4, los datasource se pueden representar como objetos fuertemente tipados
y disponibles gratuitamente para [inyección](Dependency-injection.md) en toda la aplicación.
Normalmente, en LoopBack 4, las fuentes de datos se utilizan junto con [Repositorios](Repositories.md)
para proporcionar acceso a los datos.

Para mas información sobre datasources en Loopback, ver
[DataSources](https://loopback.io/doc/en/lb4/DataSources.html).

Dado que nuestra API Todo necesitará persistir instancias de artículos Todo, necesitaremos
crear una definición de fuente de datos para hacer esto posible.

### Construyendo un Datasource

Desde el interior de la carpeta del proyecto, ejecutaremos el comando `lb4 datasource` para crear
una fuente de datos. Para los propósitos de este tutorial, usaremos la memoria
conector proporcionado con el malabarista.

```sh
lb4 datasource
? Datasource name: db
? Select the connector for db: In-memory db (supported by StrongLoop)
? window.localStorage key to use for persistence (browser only):
? Full path to file for persistence (server only): ./data/db.json

  create src/datasources/db.datasource.json
  create src/datasources/db.datasource.ts
  update src/datasources/index.ts

Datasource Db was created in src/datasources/
```

Crea una carpeta `data` en la raiz de la aplicacion y agrega un nuevo archivo llamado
`db.json` que contenga un ejemplo de base de datos.

{% include code-caption.html content="data/db.json" %}

```json
{
  "ids": {
    "Todo": 5
  },
  "models": {
    "Todo": {
      "1": "{\"title\":\"Take over the galaxy\",\"desc\":\"MWAHAHAHAHAHAHAHAHAHAHAHAHAMWAHAHAHAHAHAHAHAHAHAHAHAHA\",\"id\":1}",
      "2": "{\"title\":\"destroy alderaan\",\"desc\":\"Make sure there are no survivors left!\",\"id\":2}",
      "3": "{\"title\":\"play space invaders\",\"desc\":\"Become the very best!\",\"id\":3}",
      "4": "{\"title\":\"crush rebel scum\",\"desc\":\"Every.Last.One.\",\"id\":4}"
    }
  }
}
```

{% include note.html content="Si está utilizando una base de datos relacional como
datasource, no olvides crear las correspondientes tablas o sigue el
[Instrucción de migración de base de datos](https://loopback.io/doc/en/lb4/Database-migrations.html) para crearlo mediante programación.
" %}

Una vez que esté listo, pasaremos a agregar un
[repositorio](todo-tutorial-repository.md) para el datasource.

### Navegación

Paso anterior: [Agregar un Modelo](todo-tutorial-model.md)

Siguiente paso: [Agregar un repositorio](todo-tutorial-repository.md)
