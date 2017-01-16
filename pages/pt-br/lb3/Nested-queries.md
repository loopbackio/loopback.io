---
title: "Nested queries"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Nested-queries.html
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

For more information on the model relations used, see [BelongsTo relations](BelongsTo-relations.html) and [HasMany relations](HasMany-relations.html).

{% include code-caption.html content="common/models/book.json" %}
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

{% include code-caption.html content="common/models/chapter.json" %}
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

{% include code-caption.html content="common/models/page.json" %}
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

{% include code-caption.html content="common/models/image.json" %}
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
      <td>/api/books/123/pages</td>
      <td>An array of pages data</td>
      <td>Queries pages of a specific book</td>
    </tr>
    <tr>
      <td>/api/books/123/pages/456</td>
      <td>An object of a page data</td>
      <td>Queries a page data of a specific page under a specific book</td>
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
      <td>/api/books/123/pages/456/notes</td>
      <td>An array of notes objects</td>
      <td>Queries all of the notes associated with a specific page under a specific book</td>
    </tr>
    <tr>
      <td>/api/books/123/pages/456/notes/567</td>
      <td>An object of a note data</td>
      <td>Queries a specific note associated with a specific page under a specific book</td>
    </tr>
  </tbody>
</table>

Alternatively, since an image belongs to book instance; you can query their pages through their images:

<table>
  <tbody>
    <tr>
      <th>Endpoint</th>
      <th>Output</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>/api/images/345/book/pages</td>
      <td>An array of pages of a book</td>
      <td>Queries all of the pages of the book, whose associated image id is 345</td>
    </tr>
    <tr>
      <td>/api/images/345/book/pages/456</td>
      <td>An object of a page data</td>
      <td>Queries page with the id of 456 under the book, whose associated image id is 345</td>
    </tr>
  </tbody>
</table>
