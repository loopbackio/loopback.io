---
title: "Nested queries"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Nested-queries.html
summary:
---

In addition to querying data directly through models using LoopBack APIs, nested models can be API endpoints.
To do this, you must use nestRemoting functions.

{% include important.html content="
In general, it is best to perform nested queries in a boot script to ensure that all models have been loaded.
Although you can perform nested queries in [model definition JSON file](Model-definition-JSON-file.html), 
you must use events to make sure the models in question have been loaded.
" %}

The easiest way to understand nested queries is through an example.

Suppose an app has book, chapter, page, and image models.  And:

* Each book can have many pages and chapters.
* Each chapter and page can have many notes.
* Each book has an image.

The following blocks of JSON show the model for Book and relations for Page and Chapter models.

For more information on the model relations used, see [BelongsTo relations](/doc/{{page.lang}}/lb2/BelongsTo-relations.html) and [HasMany relations](/doc/{{page.lang}}/lb2/HasMany-relations.html).

**common/models/book.json**

```javascript
{
  "name": "Book",
  "base": "PersistedModel",
  "idInjection": true,
  "options": {
    "validateUpsert": true
  },
  "properties": {
    "name": {
      "type": "string"
    }
  },
  "validations": [],
  "relations": {
    "pages": {
      "type": "hasMany",
      "model": "Page",
      "foreignKey": "",
      "through": ""
    },
    "chapters": {
      "type": "hasMany",
      "model": "Chapter",
      "foreignKey": "",
      "through": ""
    }
  },
  "acls": [],
  "methods": {}
}
```

**common/models/chapter.json**

```javascript
{
  "name": "Chapter",
  ...
  "relations": {
    "notes": {
      "type": "hasMany",
      "model": "Note",
      "foreignKey": "",
      "through": ""
    }
  },
  ...
}
```

**common/models/page.json**

```javascript
{
  "name": "Page",
  ...
  "relations": {
    "notes": {
      "type": "hasMany",
      "model": "Note",
      "foreignKey": "",
      "through": ""
    }
  },
  ...
}
```

**common/models/image.json**

```javascript
{
  "name": "Image",
  ...
  "relations": {
    "book": {
      "type": "belongsTo",
      "model": "Book",
      "foreignKey": "",
      "required": true
    }
  },
  ...
}
```

You can query pages of a specific book via regular relationships,as illustrated with the following API endpoints:

<table>
  <tbody>
    <tr>
      <th>Endpoint</th>
      <th>Output</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><span>/api/books/123/pages</span></td>
      <td><span>An array of pages data</span></td>
      <td><span>Queries pages of a specific book</span></td>
    </tr>
    <tr>
      <td><span>/api/books/123/pages/456</span></td>
      <td><span>An object of a page data</span></td>
      <td><span><span>Queries</span> a page data of a specific page under a specific book</span></td>
    </tr>
  </tbody>
</table>

However, to query nested models more in depth and have them as API endpoints you need to use the model `nestRemoting()` function:

```javascript
Book.nestRemoting('pages');
Book.nestRemoting('chapters');
Image.nestRemoting('book');
```

The above code enables the following nested queries:

<table>
  <tbody>
    <tr>
      <th>Endpoint</th>
      <th>Output</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><span>/api/books/123/pages/456/notes</span></td>
      <td><span>An array of notes objects</span></td>
      <td><span>Queries all of the notes associated with a specific page under a specific book</span></td>
    </tr>
    <tr>
      <td><span>/api/books/123/pages/456/notes/567</span></td>
      <td><span>An object of a note data</span></td>
      <td><span>Queries a specific note associated with a specific page under a specific book</span></td>
    </tr>
  </tbody>
</table>

Alternatively, since an image belongs to book instance; you can query their pages through their images:

<table>
  <tbody>
    <tr>
      <th><span style="color: rgb(26,85,51);">Endpoint</span></th>
      <th><span style="color: rgb(26,85,51);">Output</span></th>
      <th><span style="color: rgb(26,85,51);">Description</span></th>
    </tr>
    <tr>
      <td><span>/api/images/345/book/pages</span></td>
      <td><span>An array of pages of a book</span></td>
      <td><span>Queries all of the pages of the book, whose associated image id is 345</span></td>
    </tr>
    <tr>
      <td><span>/api/images/345/book/pages/456</span></td>
      <td><span>An object of a page data</span></td>
      <td><span>Queries page with the id of 456 under the book, whose associated image id is 345</span></td>
    </tr>
  </tbody>
</table>
