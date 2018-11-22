---
title: "Command-line-tools"
lang: es
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/es/lb2/Command-line-tools.html
summary: Éste artículo resume la herramienta CLI de LoopBack.
---

- Herramienta de linea de comandos (CLI) StrongLoop: `slc loopback`.
- Herramienta de linea de comandos (CLI) StrongLoop: `slc loopback`.
- Paquete CLI de conxion para desarrolladores para IBM API: `apic loopback`.

Usa ésta herramienta para crear y _andamiar_ aplicaciones. Scaffolding es una forma simple de generar el
código y estructura base para tu aplicación.
Puedes extender y modificar el código como quieras de acuerdo a las especificaciones de tu proyecto.

El CLI provee un [Generador de Aplicaciones](Aplication-generator.html) para crear una nueva aplicación LoopBack y una serie de sub-generadores para la estructura de la aplicación. 

## Comandos

{% include content/commands.html %}

## Usando Yeoman

Bajo la cubierta, la herramienta CLI usa [Yeoman](http://yeoman.io/). Si estás listo para usar Yeoman y te sientes cómodo con él, puedes instalar el generador de LoopBack directamente con el comando:

```shell
$ npm install -g generator-loopback.
```

Entonces, en lugar de usar `slc loopback:<command>` puedes usar `yo loopback:<command>` en su lugar. Por ejemplo, para crear un nuevo modelo, usa `yo loopback:model`.