---
title: "Accessing related models"
lang: en
layout: navgroup
navgroup: access-control
keywords: LoopBack
tags: [models]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Accessing-related-models.html
summary: For related models, LoopBack automatically <i>related model methods</i> corresponding to the API routes defined for the relationship.
---
<br clear="all"/>

{% include important.html content="When accessing a related model, the effective ACL (the one considered to resolve access permission) is the one for the model you are primarily calling.
So if a given model has no ACL, then all the endpoints accessible through the model relations will be open, even if a related model has DENY ALL permissions set.

This can be a security risk since, for example, `GET /OpenModel/{id}/ACLSecuredModel` will allow full access to `ACLSecuredModel` through the `OpenModel` relations.
" %}

## Restricting access to related models

When two models have a relationship between them (see [Creating model relations](Creating-model-relations.html)),
LoopBack automatically creates a set of _related model methods_ corresponding to the API routes defined for the relationship.

In the following list, _modelName_ is the name of the related model and _modelNamePlural_ is the plural form of the related model name. 

{% include note.html content="
In the method names below, the separators are _double_ underscores, \_\_.
" %}

**belongsTo**:

* \_\_get\_\__relatedModelName_

**hasOne**:

* \_\_create\_\__relatedModelName_
* \_\_get\_\__relatedModelName_
* \_\_update\_\__relatedModelName_
* \_\_destroy\_\__relatedModelName_

**hasMany**:

* \_\_count\_\__relatedModelNamePlural_
* \_\_create\_\__relatedModelNamePlural_
* \_\_delete\_\__relatedModelNamePlural_
* \_\_destroyById\_\__relatedModelNamePlural_
* \_\_findById\_\__relatedModelNamePlural_
* \_\_get\_\__relatedModelNamePlural_
* \_\_updateById\_\__relatedModelNamePlural_

**hasManyThrough**:

* \_\_count\_\__relatedModelNamePlural_
* \_\_create\_\__relatedModelNamePlural_
* \_\_delete\_\__relatedModelNamePlural_
* \_\_destroyById\_\__relatedModelNamePlural_
* \_\_exists\_\__relatedModelNamePlural_ (through only)
* \_\_findById\_\__relatedModelNamePlural_
* \_\_get\_\__relatedModelNamePlural_
* \_\_link\_\__relatedModelNamePlural_ (through only)
* \_\_updateById\_\__relatedModelNamePlural_
* \_\_unlink\_\__relatedModelNamePlural_ (through only)

**hasAndBelongsToMany**:

* \_\_link\_\__relatedModelNamePlural_
* \_\_unlink\_\__relatedModelNamePlural_

You can use these related model methods to control access to the related routes.

For example, if a **User hasMany projects**, LoopBack creates these routes (among others) and the corresponding related model methods:

* `/api/users/count` - standard method is `count`
* ``/api/users/:id/projects`` - related model method is `__get__projects`
* `/api/users/:id/projects/count` - related model method is `__count__projects`

{% include important.html content="
If a model has a `DENY ALL` permission (for example a built-in model such as the User model), but related models have no ACLs,the related models will still not be accessible through the User model.
So, for example, even if the books model's default ACL is `ALLOW $authenticated` for `GET /books`,
the route `GET /user/{id}/books` default will still be DENY ALL.
" %}

To configure access control to such routes, set the permission on the related model methods in the model definition JSON file.
For example, the ACL for the User model definition JSON file (`user.json`) for these routes might look like this, for example:

{% include code-caption.html content="/common/models/user.json" %}
```javascript
"acls": [{
  "principalType": "ROLE",
  "principalId": "$authenticated",
  "permission": "ALLOW",
  "property": "count"
}, {
  "principalType": "ROLE",
  "principalId": "$owner",
  "permission": "ALLOW",
  "property": "__get__projects"
}, {
  "principalType": "ROLE",
  "principalId": "$authenticated",
  "permission": "ALLOW",
  "property": "__count__projects"
}]
```

## Querying related models

{% include important.html content="
This feature requires LoopBack 2.16.0 or later.
" %}

When querying a model, you may also want to return data from its related models.

For example, suppose you have three models: `User`, `Report`, and `LineItem`, where:

* A user can have many reports; that is, there is a [HasMany relation](HasMany-relations.html) 
  between `User` and `Report` (User hasMany Report).
* A report can have many line items; that is, there is a [HasMany relation](HasMany-relations.html) 
  between `Report` and `Lineitem` (Report hasMany LineItem).

Additionally, the ReportModel is configured with the following ACLs so that authenticated users can create new records and users can update their own records:

```javascript
[{
    "principalType": "ROLE",
    "principalId": "$everyone",
    "permission": "DENY"
  }, {
    "principalType": "ROLE",
    "principalId": "$owner",
    "permission": "ALLOW",
    "property": "findById"
  },
  ...
]
```

Assume the LineItem model has the same ACL defined.

Now, suppose you want to fetch a model owned by your user and also get at its related models.
Here is how you do it with [`findById()`](http://apidocs.loopback.io/loopback/#persistedmodel-findbyid) using the Node API:

```javascript
Report.findById(1, {include: 'lineitems'});
```

Using the REST API:

`GET /api/Reports/110?filter={"include":["lineItems"]}`

Example results:

```javascript
{
  "name": "january report - bob",
  "id": 110,
  "userId": 100,
  "lineItemModels": [{
    "name": "lunch",
    "id": 111,
    "reportModelId": 110
  }, {
    "name": "dinner",
    "id": 112,
    "reportModelId": 110
  }]
}
```
