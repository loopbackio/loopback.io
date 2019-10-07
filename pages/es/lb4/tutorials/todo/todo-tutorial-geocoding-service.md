---
lang: es
title: 'Integrar con un servicio de codificación geográfica.'
keywords: LoopBack 4.0, LoopBack 4
layout: translation
sidebar: es_lb4_sidebar
permalink: /doc/es/lb4/todo-tutorial-geocoding-service.html
summary: Tutorial de aplicación de LoopBack 4 Todo - Integrar con un servicio de codificación geográfica.
---

### Servicios

Para llamar a otras API y servicios web desde aplicaciones LoopBack, recomendamos utilizar Service
Proxies como patrón de diseño para encapsular detalles de implementación de bajo nivel de
comunicación con servicios de terceros y proporcionar un API en JavaScript/TypeScript que es fácil de
consumir, p. de los controladores. Consulte [Llamar a otras API y servicios web](./Calling-other-APIs-and-Web-Services.md)
para más detalles.

En LoopBack, cada proxy de servicio está respaldado por un
[DataSource](./todo-tutorial-datasource.md), esta fuente de
datos aprovecha uno de los conectores de servicio para realizar
solicitudes salientes y analizar respuestas devueltas por el servicio.

En nuestro tutorial, aprovecharemos
[API del geocodificador del censo de EE. UU.](https://geocoding.geo.census.gov/geocoder/)
para convertir direcciones textuales de EE. UU. en coordenadas GPS, lo que
permite que las aplicaciones cliente de nuestra API Todo muestren recordatorios
basados en la ubicación,

{% include tip.html content="
En un proyecto real, es posible que desee utilizar un servicio de geocodificación que
cubra más países más allá de EE. UU. Y proporcione respuestas más rápidas que la API
del geocodificador del censo de EE. UU., Por ejemplo, los de IBM 
[Datos de la empresa meteorológica](https://console.bluemix.net/catalog/services/weather-company-data)
o [La plataforma de google maps](https://developers.google.com/maps/documentation/geocoding).
" %}

### Configurar el respaldo del datasource

Ejecute `lb4 datasource` para definir un nuevo datasource
que se conecte al servicio REST Geocoder. Cuando se le solicite que use un conector,
seleccione "Servicios REST".

```
$ lb4 datasource
? Datasource name: geocoder
? Select the connector for geocoder: REST services (supported by StrongLoop)
? Base URL for the REST service:
? Default options for the request:
? An array of operation templates:
? Use default CRUD mapping: No
   create src/datasources/geocoder.datasource.json
   create src/datasources/geocoder.datasource.ts
 # npm will install dependencies now
    update src/datasources/index.ts

Datasource Geocoder was created in src/datasources/
```

Edite la configuración del origen de datos recién creada para
configurar los puntos finales de la API de Geocoder. Las opciones de
configuración proporcionadas por REST Connector se describen en nuestros
documentos aquí: [conector REST](/doc/en/lb3/REST-connector.html).

{% include code-caption.html content="/src/datasources/geocoder.datasource.json" %}

```json
{
  "connector": "rest",
  "options": {
    "headers": {
      "accept": "application/json",
      "content-type": "application/json"
    }
  },
  "operations": [
    {
      "template": {
        "method": "GET",
        "url": "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress",
        "query": {
          "format": "{format=json}",
          "benchmark": "Public_AR_Current",
          "address": "{address}"
        },
        "responsePath": "$.result.addressMatches[*].coordinates"
      },
      "functions": {
        "geocode": ["address"]
      }
    }
  ]
}
```

### Implementando un proveedor de servicio

Cree un nuevo directorio `src/services` y agregue los siguientes dos archivos nuevos:

- `src/services/geocoder.service.ts` que define las interfaces TypeScript para el
servicio Geocoder e implementa un proveedor de proxy de servicio.
- `src/services/index.ts` proporciona un acceso conveniente a todos los servicios
a través de una sola declaración `import`.

{% include code-caption.html content="src/services/geocoder.service.ts" %}

```ts
import {getService, juggler} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {GeocoderDataSource} from '../datasources/geocoder.datasource';

export interface GeoPoint {
  /**
   * latitude
   */
  y: number;

  /**
   * longitude
   */
  x: number;
}

export interface GeocoderService {
  geocode(address: string): Promise<GeoPoint[]>;
}

export class GeocoderServiceProvider implements Provider<GeocoderService> {
  constructor(
    @inject('datasources.geocoder')
    protected dataSource: juggler.DataSource = new GeocoderDataSource(),
  ) {}

  value(): Promise<GeocoderService> {
    return getService(this.dataSource);
  }
}
```

{% include code-caption.html content="src/services/index.ts" %}

```ts
export * from './geocoder.service';
```

### Mejora el modelo Todo con datos de ubicación

Agrega dos nuevas propiedades para nuestro model Todo: `remindAtAddress` y `remindAtGeo`.

{% include code-caption.html content="src/models/todo.model.ts" %}

```ts
@model()
export class Todo extends Entity {
  // original code remains unchanged, add the following two properties:

  @property({
    type: 'string',
  })
  remindAtAddress?: string; // address,city,zipcode

  @property({
    type: 'string',
  })
  remindAtGeo?: string; // latitude,longitude
}
```

### Busque la ubicación de la dirección en el controlador

Finalmente, modifique `TodoController` para buscar la dirección y convertirla
a coordenadas GPS cuando se cree un nuevo elemento de Todo.

Importe la interfaz `GeocodeService` al` TodoController` y luego modifique el
constructor del Controlador para recibir `GeocodeService` como una nueva dependencia.

{% include code-caption.html content="src/controllers/todo.controller.ts" %}

```ts
import {inject} from '@loopback/core';
import {GeocoderService} from '../services';

export class TodoController {
  constructor(
    @repository(TodoRepository) protected todoRepo: TodoRepository,
    @inject('services.GeocoderService') protected geoService: GeocoderService,
  ) {}

  // etc.
}
```

Modifique el método `createTodo` para buscar la dirección proporcionada
en la propiedad` remindAtAddress` y conviértala en coordenadas GPS almacenadas en `remindAtGeo`.

{% include code-caption.html content="src/controllers/todo.controller.ts" %}

```ts
export class TodoController {
  // constructor, etc.

  @post('/todos')
  async createTodo(@requestBody() todo: Todo) {
    if (!todo.title) {
      throw new HttpErrors.BadRequest('title is required');
    }

    if (todo.remindAtAddress) {
      // TODO handle "address not found"
      const geo = await this.geoService.geocode(todo.remindAtAddress);
      // Encode the coordinates as "lat,lng"
      todo.remindAtGeo = `${geo[0].y},${geo[0].x}`;
    }

    return this.todoRepo.create(todo);
  }

  // other endpoints remain unchanged
}
```

¡Felicidades! Ahora su API Todo facilita ingresar una dirección para un
recordatorio y hacer que la aplicación cliente muestre el recordatorio
cuando el dispositivo se acerca a esa dirección en función de la ubicación
del GPS.

### Navegación

Paso anterior: [Colocando todo junto](todo-tutorial-putting-it-together.md)
