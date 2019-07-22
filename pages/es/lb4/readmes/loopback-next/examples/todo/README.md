# @loopback/example-todo

Este es un tutorial básico para comenzar con Loopback 4!

## Visión general

Este tutorial muestra cómo crear una API básica para una lista de tareas usando LoopBack 4.
Experimentará cómo puede crear API REST con solo [5 pasos](#steps).

![todo-tutorial-overview](https://loopback.io/pages/en/lb4/imgs/todo-overview.png)

## Antes de comenzar

Primero, deberás instalar una versión compatible de Node:

- [Node.js](https://nodejs.org/en/) en la versión v8.9 o mayor

Además, este tutorial asume que usted tiene conocimientos y se siente cómodo 
con ciertas tecnologías, lenguajes y conceptos.

- JavaScript (ES6)
- [REST](http://www.restapitutorial.com/lessons/whatisrest.html)

Por último, deberá instalar el kit de herramientas CLI de LoopBack 4:

```sh
npm i -g @loopback/cli
```

## Tutorial

Para seguir este tutorial, comienza con el
[Crea tu app scaffolding](http://loopback.io/doc/en/lb4/todo-tutorial-scaffolding.html)
sección.

### Pasos

1.  [Crea tu app scaffolding](http://loopback.io/doc/en/lb4/todo-tutorial-scaffolding.html)
2.  [Agrega tu modelo Todo](http://loopback.io/doc/en/lb4/todo-tutorial-model.html)
3.  [Agrega un datasource](http://loopback.io/doc/en/lb4/todo-tutorial-datasource.html)
4.  [Agrega un repository](http://loopback.io/doc/en/lb4/todo-tutorial-repository.html)
5.  [Agrega un controller](http://loopback.io/doc/en/lb4/todo-tutorial-controller.html)
6.  [Poniendolo todo junto](http://loopback.io/doc/en/lb4/todo-tutorial-putting-it-together.html)
7.  Bonus:
    [Integra con un servicio de geo-coding](http://loopback.io/doc/en/lb4/todo-tutorial-geocoding-service.html)

## Pruébalo

Si desea ver los resultados finales de este tutorial como ejemplo
aplicación, siga estos pasos:

1.  Ejecuta el comando `lb4 example` para seleccionar y clonar el repositorio todo:

    ```sh
    lb4 example todo
    ```

2.  Cambie al directorio.

    ```sh
    cd loopback4-example-todo
    ```

3.  Finalmente, inicia la aplicación!

    ```sh
    $ npm start

    Server is running at http://127.0.0.1:3000
    ```

Siéntase libre de mirar alrededor en el código de la aplicación para tener
una idea de cómo funciona. Si está interesado en aprender cómo construirlo
paso a paso, ¡continúe con este tutorial!

### Si necesitas ayuda

Echa un vistazo a nuestro [Canal gitter](https://gitter.im/strongloop/loopback) y pide ayuda con
este tutorial.

### Bugs/Feedback

Abre un issue en [loopback-next](https://github.com/strongloop/loopback-next)
y vamos a echar un vistazo.

## Aportaciones

- [Pautas](https://github.com/strongloop/loopback-next/blob/master/docs/CONTRIBUTING.md)
- [Únete al equipo](https://github.com/strongloop/loopback-next/issues/110)

## Tests

Ejectura `npm test` desde la carpeta root.

## Contribuyentes

Ver
[Todos los contribuyentes](https://github.com/strongloop/loopback-next/graphs/contributors).

## License

MIT
