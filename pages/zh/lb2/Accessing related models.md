---
title: "Accessing related models"
lang: zh
keywords: LoopBack
tags: [models]
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Accessing-related-models.html
summary: For related models, LoopBack automatically <i>related model methods</i> corresponding to the API routes defined for the relationship.
---
<br clear="all"/>

{% include important.html content="当你访问相关的 model, 当你调用model时,激活的 ACL 仍然是有效的.
因此,即使你的模型已否认所有权限集,如果模型与它没有ACL,那么所有端点的关系将开放。这可能是一个安全风险,因为,例如,“把/ OpenModel / { id } / ACLSecuredModel”将允许完全访问“ACLSecuredModel”通过“OpenModel”关系。
" %}

## 限制访问相关模型

当两个模型之间的关系(见[创建模型关系](Creating-model-relations.html)),LoopBack会自动创建一组methods_ _related模型定义的API路由相对应的关系。在以下列表,_modelName_的名称相关模型和_modelNamePlural_模型名称的复数形式相关。
{% include note.html content="
下面的方法名_double_下划线分隔符,\ _ \ _。
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

您可以使用这些相关的模型方法来控制对相关路由的访问。

例如，如果**用户有多个项目**，LoopBack创建这些路线（以及其他）和相应的相关模型方法：

* `/api/users/count` - standard method is `count`
* ``/api/users/:id/projects`` - related model method is `__get__projects`
* `/api/users/:id/projects/count` - related model method is `__count__projects`

{% include important.html content="
如果一个模型有一个否认所有的许可(例如一个内置的模型如用户模型),但相关的模型没有acl,相关模型仍不通过用户模型来访问。例如,即使书模型的默认ACL的允许经过身份验证的美元“GET /书”,路线的GET /用户/ { id } /书籍的违约仍然会否认。
" %}


设置权限相关模型方法在模型中定义JSON文件来配置访问控制这样的路由。例如,用户的ACL模型定义JSON文件(“user.json”)这些路由可能是这样的,例如:
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

## 查询相关的模型

{% include important.html content="
该功能需要LoopBack 2.16.0或更高版本。
" %}


查询一个模型时,您可能还想返回数据的相关模型。例如,假设您有三种model:`User`, `Report`, and `LineItem`, where:

* 一个 user 可以有很多 reports; 那就是说 [HasMany relation](HasMany-relations.html) 
  在 `User` 和 `Report`是 (User hasMany Report).
* 一个 report 可以有很多 line items; 那就是说 [HasMany relation](HasMany-relations.html) 
  在 `Report` 和 `Lineitem` 是 (Report hasMany LineItem).

而且,  ReportModel 已经配置了如下 ACLs, 所以 鉴权后的 用户可以创建新的记录和更新他们自己的记录:

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

假设LineItem模型具有相同的ACL定义.

现在,假设你想取回属于您的用户模型也得到相关模型。
以下是你如何操作: [`findById()`](http://apidocs.strongloop.com/loopback/#persistedmodel-findbyid) using the Node API:

```javascript
Report.findById({
  id: 1,
  filter: {
    include: 'lineitems'
  }
});
```

使用REST API:

`GET /api/Reports/110?filter={"include":["lineItems"]}`

例子的结果:

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
