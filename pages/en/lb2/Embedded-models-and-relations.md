---
title: "Embedded models and relations"
lang: en
layout: page
toc_level: 1
keywords: LoopBack
tags: [models]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Embedded-models-and-relations.html
summary: LoopBack supports several kinds of embedded relations&#58; embedsOne, embedsMany, embedsMany with belongsTo, and referencesMany.
---

## Overview

LoopBack relations enable you to create connections between models and provide navigation/aggregation APIs to deal with a graph of model instances.
In addition to the traditional ones, LoopBack also supports the following embedded relations:

* [EmbedsOne](#embedsone) - a model that embeds another model; for example, a Customer embeds one billingAddress.
* [EmbedsMany](#embedsmany) - a model that embeds many instances of another model.
  For example, a Customer can have multiple email addresses and each email address is a complex object that contains label and address..
* [EmbedsMany with belongsTo](#embedsmany-with-belongsto) - a model that embeds many links to related people, such as an author or a reader. 
* [ReferencesMany](#referencesmany)

{% include important.html content="You can use embedded relations with relational databases, but data will always be stored in stringified-JSON format.
" %}

## Transient versus persistent for the embedded model

### Define a transient data source

{% include code-caption.html content="server/datasources.json" %}
```javascript
{
  ...
  "transient": {
    "name": "transient",
    "connector": "transient"
  }
}
```

### Use the transient data source for embedded models

{% include code-caption.html content="server/model-config.json" %}
```javascript
{
  ...
  "Customer": {
    "dataSource": "db",
    "public": true
  },
  "Address": {
    "dataSource": "transient",
    "public": false
  },
  "EmailAddress": {
    "dataSource": "transient",
    "public": false
  },
  "Account": {
    "dataSource": "db",
    "public": false
  }
}
```

The embedded instances are stored inside their parent instance, which means you can see them in parentModel's database record. The default idType for a embedded model is "String", not the same type of its parent model id. 

## EmbedsOne

EmbedsOne is used to represent a model that embeds another model, for example, a Customer embeds one billingAddress.

{% include code-caption.html content="Sample embedded model" %}
```javascript
{
  id: 1,
  name: 'John Smith',
  billingAddress: {
    street: '123 Main St',
    city: 'San Jose',
    state: 'CA',
    zipCode: '95124'
  }
}
```

### Define the relation in code

{% include code-caption.html content="common/models/customer.js" %}
```javascript
Customer.embedsOne(Address, {
  as: 'address', // default to the relation name - address
  property: 'billingAddress' // default to addressItem
});
```

### Parameters for the definition

* methods - Scoped methods for the given relation
* properties - Properties taken from the parent object
* scope - Default scope
* options - Options
* default - Default value
* property - Name of the property for the embedded item
* as - Name of the relation

### Options

* forceId - force generation of ida for embedded items, default to false
* validate - denote if the embedded items should be validated, default to true
* persistent - denote if the embedded items should be persisted, default to false

### Define the relation in JSON

{% include code-caption.html content="common/models/customer.json" %}
```javascript
{
  "name": "Customer",
  "base": "PersistedModel",
  "idInjection": true,
  "properties": {
    "name": {
      "type": "string"
    }
  },
  "relations": {
    "address": {
      "type": "embedsOne",
      "model": "Address",
      "property": "billingAddress",
      "options": {
        "validate": true,
        "forceId": false
      }
    }
    ...
  }
```

### Helper methods

* customer.address()
* customer.address.build()
* customer.address.create()
* customer.address.update()
* customer.address.destroy()
* customer.address.value()

For examples of these in use, see [boot scripts in loopback-example-relations](https://github.com/strongloop/loopback-example-relations/blob/master/server/boot/z-customer-address.js).

### Operation hooks

You can define `before save` and `after save` [operation hooks](Operation-hooks.html) for an embedded model in an embedsOne relation.
Then, updating or creating an instance of the container model will trigger the operation hook on the embedded model.
When this occurs, `ctx.isNewInstance` is false, because only a new instance of the container model is created.

For example, if `Customer embedsOne Address`, and you define a `before save` hook on the Address model, creating a new Customer instance will trigger the operation hook.

## EmbedsMany

Use an embedsMany relation to indicate that a model can embed many instances of another model.
For example, a Customer can have multiple email addresses and each email address is a complex object that contains label and address.

{% include code-caption.html content="Sample model instance with many embedded models" %}
```javascript
{
  id: 1,
  name: 'John Smith',
  emails: [{
    label: 'work',
    address: 'john@xyz.com'
  }, {
    label: 'home',
    address: 'john@gmail.com'
  }]
}
```

{% include note.html content="You cannot POST the full object with embedded/nested data to create everything all at once.
So the example above in which a Customer has multiple email addresses, adding an instance would require two POST operations,
one for the Customer record and one for the multiple email address data.
" %}

### Define the relation in code

{% include code-caption.html content="common/models/customer.js" %}
```javascript
Customer.embedsOne(EmailAddress, {
  as: 'emails', // default to the relation name - emailAddresses
  property: 'emailList' // default to emailAddressItems
});
```

### Parameters for the definition

* methods
* properties
* scope
* options
* default
* property
* as

### Options

* forceId
* validate
* persistent

### Define the relation in JSON

{% include code-caption.html content="common/models/customer.json" %}
```javascript
{
  "name": "Customer",
  "base": "PersistedModel",
  "idInjection": true,
  "properties": {
    "name": {
      "type": "string"
    }
  },
  "relations": {
    "emails": {
      "type": "embedsMany",
      "model": "EmailAddress",
      "property": "emailList",
      "options": {
        "validate": true,
        "forceId": false
      }
    }
    ...
  }
```

### Helper methods

* customer.emails()
* customer.emails.create()
* customer.emails.build()
* customer.emails.findById()
* customer.emails.destroyById()
* customer.emails.updateById()
* customer.emails.exists()
* customer.emails.add()
* customer.emails.remove()
* customer.emails.get() - alias to findById
* customer.emails.set() - alias to updateById
* customer.emails.unset() - alias to destroyById
* customer.emails.at()
* customer.emails.value()

### Operation hooks

You can define `before save` and `after save` [operation hooks](Operation-hooks.html) for an embedded model in an embedsMany relation.
Then, updating or creating an instance of the container model will trigger the operation hook on the embedded model.
When this occurs, `ctx.isNewInstance` is false, because only a new instance of the container model is created.

For example, if `Customer embedsOne Address`, and you define a `before save` hook on the Address model,
creating a new Customer instance will trigger the operation hook.

## EmbedsMany with belongsTo

Use an embedsMany with belongsTo relation to indicate a model that can embed many links to other models; for example a book model that
embeds many links to related people, such as an author or a reader. Each link belongs to a person and it's polymorphic,
since a person can be an Author or a Reader.

{% include code-caption.html content="Sample embedsMany with belongsTo model instance" %}
```javascript
{ 
  id: 1
  name: 'Book 1',
  links: [{
    notes: 'Note 1',
    id: 1,
    linkedId: 1,
    linkedType: 'Author',
    name: 'Author 1'
  }, {
  notes: 'Note 2',
    id: 2,
    linkedId: 1,
    linkedType: 'Reader',
    name: 'Reader 1'
  }]
}
```

### Define the embedsMany relation for Book

{% include code-caption.html content="common/models/book.json" %}
```javascript
{
  "name": "Book",
  "base": "PersistedModel",
  "idInjection": true,
  "properties": {
    "name": {
      "type": "string"
    }
  },
  "validations": [],
  "relations": {
    "people": {
      "type": "embedsMany",
      "model": "Link",
      "scope": {
        "include": "linked"
      }
    }
  },
  "acls": [],
  "methods": []
}
```

### Define the polymorphic belongsTo relation for Link

{% include code-caption.html content="common/models/link.json" %}
```javascript
{
  "name": "Link",
  "base": "Model",
  "idInjection": true,
  "properties": {
    "id": {
      "type": "number",
      "id": true
    },
    "name": {
      "type": "string"
    },
    "notes": {
      "type": "string"
    }
  },
  "validations": [],
  "relations": {
    "linked": {
      "type": "belongsTo",
      "polymorphic": {
        "idType": "number"
      },
      "properties": {
        "name": "name"
      },
      "options": {
        "invertProperties": true
      }
    }
  },
  "acls": [],
  "methods": []
}
```

## ReferencesMany

{% include code-caption.html content="Sample referencesMany model instance" %}
```javascript
{
  id: 1,
  name: 'John Smith',
  accounts: [
    "saving-01", "checking-01",
  ]
}
```

### Parameters for the definition

* methods
* properties
* foreignKey
* scope
* options
* default
* as

### Options

* forceId
* validate
* persistent

### Define the relation in code

{% include code-caption.html content="common/models/customer.json" %}
```javascript
{
  "name": "Customer",
  "base": "PersistedModel",
  "idInjection": true,
  "properties": {
    "name": {
      "type": "string"
    }
  },
  "relations": {
    "accounts": {
      "type": "referencesMany",
      "model": "Account",
      "foreignKey": "accountIds",
      "options": {
        "validate": true,
        "forceId": false
      }
    }
...
}
```

### Helper methods

* customer.accounts()
* customer.accounts.create()
* customer.accounts.build()
* customer.accounts.findById()
* customer.accounts.destroy()
* customer.accounts.updateById()
* customer.accounts.exists()
* customer.accounts.add()
* customer.accounts.remove()
* customer.accounts.at()
