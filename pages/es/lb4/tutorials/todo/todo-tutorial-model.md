---
lang: es
title: 'Agregar un Modelo'
layout: translation
keywords: LoopBack 4.0, LoopBack 4
sidebar: es_lb4_sidebar
permalink: /doc/es/lb4/todo-tutorial-model.html
summary: Tutorial de aplicación de LoopBack 4 Todo - Agregar un Modelo
---

### Modelos

Ahora podemos comenzar a trabajar en la representación de nuestros datos para su uso con
LoopBack 4. Para este fin, vamos a crear un modelo de Todo que pueda representar
instancias de una tarea para nuestra lista de Todo. El modelo Todo servirá tanto como
[Objeto de Transferencia de datos](https://es.wikipedia.org/wiki/Objeto_de_transferencia_de_datos)
(también conocido como DTO) para representar instancias entrantes de Todo en solicitudes, así como
nuestra estructura de datos para usar con loopback-datasource-juggler.

Un modelo describe objetos de dominio empresarial y define una lista de propiedades con
nombre, tipo y otras restricciones.

Los modelos se utilizan para el intercambio de datos en el cable o entre diferentes sistemas.

Para mas informacion acerca de Modelos y como estos son utilizados en Loopback, ver
[Modelos](https://loopback.io/doc/en/lb4/Model.html).

{% include note.html content="LoopBack 3 trató a los modelos como el 'centro' de operaciones; en LoopBack 4, ese ya no es el caso. Si bien LoopBack 4 proporciona muchos de los métodos y decoradores auxiliares que le permiten utilizar modelos de manera similar, ya no está _required_ para hacerlo!
" %}

### Construyendo tu modelo de todo

Una lista de tareas pendientes tiene que ver con el seguimiento de las tareas.
Para que esto sea útil, deberá permitirle etiquetar las tareas para que pueda distinguir
entre ellas, agregar información adicional para describir esas tareas y, por último, proporcionar
una forma de rastrear si están completas o no.

El modelo to-do tiene las siguientes propiedades:

- `id`: un unico id
- `title`: un titulo
- `desc`: una descripción que detalla la tarea específica a realizar
- `isComplete`: una bandera de tipo boolean para verificar que la tarea fue completada

Podemos usar el comando `lb4 model` y esponder asi las indicaciones para generar el modelo
para nosotros. Presione `regresar` con un nombre de propiedad vacío para generar el modelo.
Seguir estos pasos:

```sh
lb4 model
? Model class name: todo
? Please select the model base class: Entity
? Allow additional (free-form) properties? No
Model Todo will be created in src/models/todo.model.ts

Let's add a property to Todo
Enter an empty property name when done

? Enter the property name: id
? Property type: number
? Is id the ID property? Yes
? Is it required?: No
? Default value [leave blank for none]:

Let's add another property to Todo
Enter an empty property name when done

? Enter the property name: title
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Todo
Enter an empty property name when done

? Enter the property name: desc
? Property type: string
? Is it required?: No
? Default value [leave blank for none]:

Let's add another property to Todo
Enter an empty property name when done

? Enter the property name: isComplete
? Property type: boolean
? Is it required?: No
? Default value [leave blank for none]:

Let's add another property to Todo
Enter an empty property name when done

? Enter the property name:

   create src/models/todo.model.ts
   update src/models/index.ts

Model Todo was created in src/models/
```

Ahora que tenemos nuestro modelo, Es momento de agregar un
[datasource](todo-tutorial-datasource.md) para que podamos realizar CRUD real
operaciones!

### Navegación

Paso anterior: [Crear tu aplicación scaffolding](todo-tutorial-scaffolding.md)

Siguiente paso: [Agregar un datasource](todo-tutorial-datasource.md)
