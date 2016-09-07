---
title: "Relation REST API"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Relation-REST-API.html
summary:
---

{% include important.html content="
These endpoints are part of the [PersistedModel REST API](PersistedModel-REST-API.html), but are presented in a separate page for ease of reference." %}

## Get related model instances

Follow the relations from one model to another one to get instances of the associated model.

`GET /_model1-name_/_instanceID_/_model2-name_`

### Arguments

* _instanceID_ - ID of instance in model1.
* _model1-name_ - name of first model. 
* _model2-name_ - name of second related model.

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

List related model instances for specified _model-name_ identified by the _instance-ID_, for hasMany relationship.

`GET _/model-name/instanceID/hasManyRelationName`

## Create hasMany related model instance

Create a related model instance for specified _model-name_ identified by _instance-ID_, for hasMany relationship.

`POST /model1-name/instanceID/hasManyRelationName`

## Delete hasMany related model instances

Delete related model instances for specified _model-name_ identified by _instance-ID_, for hasMany relationship.

`DELETE /model1-name/instance-ID/hasMany-relation-name`

## List ****belongsTo**** related model instances 

List the related model instances for the given model identified by _instance-ID_, for hasMany relationship.

`GET /model-name/instance-ID/belongsToRelationName`

## Aggregate models following relations

It's often desirable to include related model instances in the response to a query so that the client doesn't have to make multiple calls.

`GET /model1-name?filter[include]=...`

**Arguments**

* _include_ - The object that describes a hierarchy of relations to be included

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
