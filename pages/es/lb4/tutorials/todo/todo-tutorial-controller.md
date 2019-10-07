---
lang: es
title: 'Agregar un Controlador'
keywords: LoopBack 4.0, LoopBack 4
layout: translation
sidebar: es_lb4_sidebar
permalink: /doc/es/lb4/todo-tutorial-controller.html
summary: Tutorial de aplicación de LoopBack 4 Todo - Agregar un Controlador
---

### Controladores

En LoopBack 4, los controladores manejan el ciclo de vida de solicitud-respuesta
para su API. Cada función en un controlador se puede direccionar individualmente
para manejar una solicitud entrante (como una solicitud POST a `/ todos`), realizar
una lógica de negocios y devolver una respuesta.

`Controller` es una clase que implementa operaciones definidas por la API de la aplicación.
Implementa la lógica de negocios de una aplicación y actúa como un puente entre la API HTTP / REST y
los modelos de dominio / base de datos.

A este respecto, los controladores son las regiones en las que vivirá la mayor parte
de su lógica de negocios.

Para más información sobre Controladores, ver
[Controladores](https://loopback.io/doc/en/lb4/Controllers.html).

### Crear tu controlador

Tu puedes crear un controlador REST utilizando el CLI de la siguiente manera:

```sh
lb4 controller
? Controller class name: todo
Controller Todo will be created in src/controllers/todo.controller.ts

? What kind of controller would you like to generate? REST Controller with CRUD functions
? What is the name of the model to use with this CRUD repository? Todo
? What is the name of your CRUD repository? TodoRepository
? What is the name of ID property? id
? What is the type of your ID? number
? What is the base HTTP path name of the CRUD operations? /todos
   create src/controllers/todo.controller.ts
   update src/controllers/index.ts

Controller Todo was created in src/controllers/
```

Repasemos el `TodoController` localizado en
`src/controllers/todo.controller.ts`. El decorador `@repository` recuperará
e inyectara una instancia del `TodoRepository` cada vez que se maneja una solicitud entrante.
El ciclo de vida de los objetos del controlador es por solicitud, lo que significa que se crea
una nueva instancia de controlador para cada solicitud. Como resultado, queremos inyectar
nuestro `TodoRepository` ya que la creación de estas instancias es más compleja y costosa
que crear nuevas instancias de controlador.

{% include note.html content="Puedes personalizar el ciclo de vida de _todos_ los enlaces en LoopBack 4! Se puede hacer que los controladores usen ciclos de vida únicos para minimizar los costos de inicio. Para obtener más información, consulte la sección [Inyección de Dependencias](Dependency-injection.md) de nuestros documentos.
" %}

En este ejemplo, hay dos nuevos decoradores para proporcionar a LoopBack metadatos
sobre la ruta, el verbo y el formato del cuerpo de la solicitud entrante:

- `@post('/todos')` crea metadata para `@loopback/rest` para que pueda redirigir las solicitudes
  a esta función cuando la ruta y el verbo coinciden.
- `@requestBody()` asocia el esquema OpenAPI para un Todo con el cuerpo del
  solicitud para que LoopBack pueda validar el formato de una solicitud entrante.

Algunas cosas adicionales a tener en cuenta sobre este ejemplo:

- Las rutas como `@get('/todos/{id}')` se pueden emparejar con los decoradores `@param.path`
para inyectar esos valores en el momento de la solicitud en la función del controlador.
- El decorador `@param` de LoopBack también contiene un espacio de nombres lleno de otros "subdecoradores"
como `@param.path`, `@param.query` y` @param.header` que permiten la especificación de metadatos para
esas partes de una solicitud REST.
- `@param.path` y `@param.query` de LoopBack también proporcionan subdecoradores para especificar el tipo
de ciertos valores primitivos, como `@param.path.number('id')`.

Ahora que hemos conectado el controlador, nuestro último paso es vincularlo todo a la
[Aplicación](todo-tutorial-putting-it-together.md)!

### Navegación

Paso anterior: [Agregar un repositorio](todo-tutorial-repository.md)

Paso final: [Colocando todo junto](todo-tutorial-putting-it-together.md)
