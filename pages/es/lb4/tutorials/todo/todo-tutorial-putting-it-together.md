---
lang: es
title: 'Colocando todo junto'
keywords: LoopBack 4.0, LoopBack 4
layout: translation
sidebar: es_lb4_sidebar
permalink: /doc/es/lb4/todo-tutorial-putting-it-together.html
summary: Tutorial de aplicación de LoopBack 4 Todo - Colocar todo junto
---

### Colocando todo junto

Tenemos todos nuestros artefactos ahora, y todos están vinculados automáticamente a nuestra
[Aplicación](Application.md) para que LoopBack's
[Inyección de Depencia](Dependency-injection.md) ¡el sistema puede unirlo todo para nosotros!

LoopBack's
[módulo de arranque](https://github.com/strongloop/loopback-next/tree/master/packages/boot)
descubrirá automáticamente nuestros controladores, repositorios, fuentes de datos y otros
artefactos y los inyectará en nuestra aplicación para su uso.

> **NOTA**: El módulo de arranque descubrirá e inyectará artefactos que siguen nuestras
> convenciones establecidas para directorios de artefactos. Aquí hay unos ejemplos:
>
> - Controladores: `./src/controllers`
> - Datasources: `./src/datasources`
> - Modelos: `./src/models`
> - Repositorios: `./src/repositories`
>
> Para saber cómo personalizar este comportamiento, consulte el
> [Arrancadores](Booting-an-Application.md#booters) sección de
> [Arranque de una aplicación](Booting-an-Application.md).

¡Probemos nuestra aplicación! Primero, querrás iniciar la aplicación.

```sh
$ npm start

Server is running at http://127.0.0.1:3000
```

A continuación, puede usar el [API Explorer](http://localhost:3000/explorer) para navegar por su API y hacer
solicitudes!

Aquí hay algunas solicitudes que puede probar:

- `POST /todos` con un body de `{ "title": "get the milk" }`
- `GET /todos/{id}` utilizando la identificación que recibió de su `POST`, y vea si recupera su objeto
Todo.
- `PATCH /todos/{id}`, utilizando el mismo ID, con un body de
  `{ "desc": "need milk for cereal" }`

¡Eso es! ¡Acaba de crear su primera aplicación LoopBack 4!

### A dónde ir desde aquí

Todavía hay un montón de características que puedes usar para construir sobre el
`TodoListApplication`. Aquí hay algunos tutoriales que continúan desde donde lo
dejamos aquí para guiarlo a través de la adición de una función adicional:

- **Integrar con un servicio de geocodificación basado en REST**: un servidor API REST típico
  necesita acceder a datos de una variedad de fuentes, incluidos los servicios SOAP o REST.
  Continúe con la sección de bonificación para aprender cómo los conectores LoopBack hacen que
  sea muy fácil obtener datos de otros servicios y
  [mejore su aplicación Todo con recordatorios basados en la ubicación](todo-tutorial-geocoding-service.md).
- **Agregue un modelo relacionado con la aplicación TodoList**: si desea probar el uso de algunas
  de las funciones más avanzadas de LoopBack 4, como las relaciones, pruebe el
  [tutorial TodoList](https://loopback.io/doc/es/lb4/todo-list-tutorial.html) que continúa desde donde dejamos aquí.

### Más ejemplos y tutoriales

¿Estás ansioso por seguir aprendiendo sobre LoopBack 4? Mira nuestro
¡[Ejemplos](Examples.md) y [Tutoriales](Tutorials.md) secciones para encontrar
ejemplos para crear sus propios componentes personalizados, secuencias y más!

### Navegación

Paso anterior: [Agregar un controlador](todo-tutorial-controller.md)
