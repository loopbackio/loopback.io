---
title: "Restricting access to related models"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Restricting-access-to-related-models.html
summary:
---

When two models have a relationship between them, LoopBack automatically creates a set of _related model methods_ corresponding to the API routes defined for the relationship.  

In the following list, _modelName_ is the name of the related model and _modelNamePlural_ is the plural form of the related model name. 

**belongsTo**:

*   __get___relatedModelName_

**hasOne**:

*   __get___relatedModelName_

**hasMany**:

*   __count___relatedModelNamePlural_
*   __create___relatedModelNamePlural_
*   __delete___relatedModelNamePlural_
*   __destroyById___relatedModelNamePlural_
*   __findById___relatedModelNamePlural_
*   __get___relatedModelNamePlural_
*   __updateById___relatedModelNamePlural_

**hasManyThrough**:

*   __count___relatedModelNamePlural_
*   __create___relatedModelNamePlural_
*   __delete___relatedModelNamePlural_
*   __destroyById___relatedModelNamePlural_
*   __exists___relatedModelNamePlural_ (through only)
*   __findById___relatedModelNamePlural_
*   __get___relatedModelNamePlural_
*   __link___relatedModelNamePlural_ (through only)
*   __updateById___relatedModelNamePlural_
*   __unlink___relatedModelNamePlural_ (through only)

You can use these related model methods to control access to the related routes.  For example, if a **User hasMany projects**, LoopBack creates these routes (among others) and the corresponding related model methods:

*   `/api/users/count` - standard method is `count`
*   ``/api/users/:id/projects`` - related model method is `__get__projects`
*   `/api/users/:id/projects/count` - related model method is `__count__projects`

To configure access control to such routes, set the permission on the related model methods in the model definition JSON file.  For example, the ACL for the User model definition JSON file (`user.json`) for these routes might look like this, for example:

**/common/models/user.json**

```js
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
