---
title: "Swagger generator"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Swagger-generator.html
summary:
---

{% include important.html content="
Before running this generator, you must create an application using the [Application generator](Application-generator.html).

Then you must run the command from the root directory of the application."
%}

### SYNOPSIS

Creates a fully-functional application with an API defined using the [Swagger](http://swagger.io/) 2.0 specification.  For more information on Swagger, see [Swagger RESTful API Documentation Specification (version 2.0)](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md).

```shell
[slc | apic] loopback:swagger [options] [<_name_>]
```

### OPTIONS

`-h, --help`  
Print the generator's options and usage.

`--skip-cache`  
Do not remember prompt answers. Default is false.

`--skip-install`  
Do not automatically install dependencies. Default is false.

### ARGUMENTS

You can optionally provide the URL of the Swagger specification file to use.  If you do, then the tool will use that as the default in the interactive prompts.

### INTERACTIVE PROMPTS

The tool will prompt you for:

*   Location of the Swagger JSON specification file.  Enter a URL or relative file path.
*   Models to generate, based on the REST API defined in the Swagger file.  Move the cursor with the arrow keys, and press the space bar to de-select the model next to the cursor.  Then press Return to generate all the selected models.
*   Data source to use.

### EXAMPLE

For example, if you enter the Swagger simple pet store example URL:

`https://raw.githubusercontent.com/wordnik/swagger-spec/master/examples/v2.0/json/petstore-simple.json`

The tool will display:

```
[?] Select models to be generated:
❯⬢ swagger_api
 ⬢ pet
 ⬢ petInput
 ⬢ errorModel
```

Move the cursor with the arrow keys, and press the space bar to de-select the model next to the cursor.  Then press Return to generate all the selected models.

The tool will prompt you for the isplay information on what it's doing; for example:

```
[?] Select the data-source to attach models to: db (memory)
Creating model definition for swagger_api...
Creating model definition for pet...
Creating model definition for petInput...
Creating model definition for errorModel...
...
```

### OUTPUT

The tool generates all the files for the application based on the specified Swagger file, including all the [Model definition JSON files](Model-definition-JSON-file.html) and associated JavaScript files.
