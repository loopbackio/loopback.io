---
title: "Relation REST API"
lang: ja
layout: page
toc: false
keywords: LoopBack
tags: models
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Relation-REST-API.html
summary: The built-in Relation model represents a relationship between two models.
---
{% include content/API-Explorer.md %}

These endpoints are part of the [PersistedModel REST API](PersistedModel-REST-API.html), but are presented here for ease of reference.

## Get related model instances

Follow the relations from one model to another one to get instances of the associated model.

`GET /<model1-name>/<instanceID>/<model2-name>`

### Arguments

* `<instanceID>` - ID of instance in model1.
* `<model1-name>` - name of first model. 
* `<model2-name>` - name of second related model.

### Example

Request:

`GET http://localhost:3000/locations/88/inventory`

Response:

```javascript
[
  {
    "productId": "2",
    "locationId": "88",
    "available": 10,
    "total": 10
  },
  {
    "productId": "3",
    "locationId": "88",
    "available": 1,
    "total": 1
  }
]
```

## Get hasMany related model instances

List related model instances for specified `<model-name>` identified by the `instance-ID`, for hasMany relationship.

`GET /<model-name>/<instance-ID>/<hasManyRelationName>`

## Create hasMany related model instance

Create a related model instance for specified `<model-name>` identified by `<instance-ID>`, for hasMany relationship.

`POST /<model1-name>/<instance-ID>/<hasMany-Relation-Name>`

## Delete hasMany related model instances

Delete related model instances for specified <model-name> identified by `<instance-ID>`, for hasMany relationship.

`DELETE /<model1-name>/<instance-ID>/<hasMany-relation-name>`

## List belongsTo related model instances 

List the related model instances for the given model identified by `<instance-ID>`, for hasMany relationship.

`GET /model-name/<instance-ID>/<belongsTo-relation-name>`

## Aggregate models following relations

It's often desirable to include related model instances in the response to a query so that the client doesn't have to make multiple calls.

`GET /<model1-name>?filter[include]=...`

**Arguments**

* `include` - The object that describes a hierarchy of relations to be included

### Example

Retrieve all members including the posts with the following request:

`GET /api/members?filter[include]=posts`

The API returns the following JSON:

```javascript
[
  {
    "name": "Member A",
    "age": 21,
    "id": 1,
    "posts": [
      {
        "title": "Post A",
        "id": 1,
        "memberId": 1
      },
      {
        "title": "Post B",
        "id": 2,
        "memberId": 1
      },
      {
        "title": "Post C",
        "id": 3,
        "memberId": 1
      }
    ]
  },
  {
    "name": "Member B",
    "age": 22,
    "id": 2,
    "posts": [
      {
        "title": "Post D",
        "id": 4,
        "memberId": 2
      }
    ]
  },
...
]
```

The following request retrieves all members, including the posts, which further includes the author:

`GET /api/members?filter[include][posts]=author`

The API returns the following JSON:

```javascript
[
  {
    "name": "Member A",
    "age": 21,
    "id": 1,
    "posts": [
      {
        "title": "Post A",
        "id": 1,
        "memberId": 1,
        "author": {
          "name": "Member A",
          "age": 21,
          "id": 1
        }
      },
      {
        "title": "Post B",
        "id": 2,
        "memberId": 1,
        "author": {
          "name": "Member A",
          "age": 21,
          "id": 1
        }
      },
      {
        "title": "Post C",
        "id": 3,
        "memberId": 1,
        "author": {
          "name": "Member A",
          "age": 21,
          "id": 1
        }
      }
    ]
  },
  {
    "name": "Member B",
    "age": 22,
    "id": 2,
    "posts": [
      {
        "title": "Post D",
        "id": 4,
        "memberId": 2,
        "author": {
          "name": "Member B",
          "age": 22,
          "id": 2
        }
      }
    ]
  },
  ...
]
```

The following request retrieves all members who are 21 years old, including the posts, which further includes the author:

`GET /api/members?filter[include][posts]=author&filter[where][age]=21`

The API returns the following JSON:

```javascript
[
  {
    "name": "Member A",
    "age": 21,
    "id": 1,
    "posts": [
      {
        "title": "Post A",
        "id": 1,
        "memberId": 1,
        "author": {
          "name": "Member A",
          "age": 21,
          "id": 1
        }
      },
      {
        "title": "Post B",
        "id": 2,
        "memberId": 1,
        "author": {
          "name": "Member A",
          "age": 21,
          "id": 1
        }
      },
      {
        "title": "Post C",
        "id": 3,
        "memberId": 1,
        "author": {
          "name": "Member A",
          "age": 21,
          "id": 1
        }
      }
    ]
  }
]
```

The following request retrieves two members, including the posts, which further includes the author: 

`GET /api/members?filter[include][posts]=author&filter[limit]=2`

The API returns the following JSON:

```javascript
[
  {
    "name": "Member A",
    "age": 21,
    "id": 1,
    "posts": [
      {
        "title": "Post A",
        "id": 1,
        "memberId": 1,
        "author": {
          "name": "Member A",
          "age": 21,
          "id": 1
        }
      },
      {
        "title": "Post B",
        "id": 2,
        "memberId": 1,
        "author": {
          "name": "Member A",
          "age": 21,
          "id": 1
        }
      },
      {
        "title": "Post C",
        "id": 3,
        "memberId": 1,
        "author": {
          "name": "Member A",
          "age": 21,
          "id": 1
        }
      }
    ]
  },
  {
    "name": "Member B",
    "age": 22,
    "id": 2,
    "posts": [
      {
        "title": "Post D",
        "id": 4,
        "memberId": 2,
        "author": {
          "name": "Member B",
          "age": 22,
          "id": 2
        }
      }
    ]
  }
]
```

The following request retrieves all members, including the posts and passports.

`GET /api/members?filter[include]=posts&filter[include]=passports`

The API returns the following JSON:

```javascript
[
  {
    "name": "Member A",
    "age": 21,
    "id": 1,
    "posts": [
      {
        "title": "Post A",
        "id": 1,
        "memberId": 1
      },
      {
        "title": "Post B",
        "id": 2,
        "memberId": 1
      },
      {
        "title": "Post C",
        "id": 3,
        "memberId": 1
      }
    ],
    "passports": [
      {
        "number": "1",
        "id": 1,
        "ownerId": 1
      }
    ]
  },
  {
    "name": "Member B",
    "age": 22,
    "id": 2,
    "posts": [
      {
        "title": "Post D",
        "id": 4,
        "memberId": 2
      }
    ],
    "passports": [
      {
        "number": "2",
        "id": 2,
        "ownerId": 2
      }
    ]
  }, ... ]
```
