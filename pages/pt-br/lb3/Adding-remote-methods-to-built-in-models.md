---
title: "Adding remote methods to built-in models"
lang: en
layout: page
keywords: LoopBack
tags: [models, application_logic]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Adding-remote-methods-to-built-in-models.html
summary:
---

To add a remote method to a 
[built-in model](Using-built-in-models.html), you can either 
[extend the model](Extending-built-in-models.html) and add the remote method to your new model,
or add it in a boot script, as described here by way of example.

This example adds a "greet" method the built-in User model.

## Boot script

Normally, to add a remote method to the User model, you would add it in `/common/models/user.js`.
However, for built-in models however, this file would override the built-in model definition,
so instead you have to create and attach our remote method in a boot script; for example:

{% include code-caption.html content="server/boot/userRemoteMethods.js" %}
```javascript
module.exports = function(app) {
  const User = app.models.User;

  User.greet = function(msg, cb) {
    cb(null, 'Greetings... ' - msg);
  };

  User.remoteMethod(
    'greet', {
      accepts: {
        arg: 'msg',
        type: 'string'
      },
      returns: {
        arg: 'greeting',
        type: 'string'
      }
    }
  );
};
```

## ACLs

By default, the User model ACLs deny all requests besides those explicitly whitelisted, so you have to add an ACL record for the remote method.
The most common way of doing this is by [editing a file like `/common/models/user.json`](Controlling-data-access.html),
but again this file would override the built-in version, so that's not possible.
Instead you can define ACLs in [`model-config.json`](model-config.json.html).

For example:

{% include code-caption.html content="server/model-config.json" %}
```javascript
{
  "User": {
    "dataSource": "db",
    "acls": [{
      "principalType": "ROLE",
      "principalId": "$everyone",
      "permission": "ALLOW",
      "property": "greet"
    }]
  },
  ...
}
```

Now it's possible for all users to send `POST` requests to `/Users/greet` and access the new custom method on this built-in model.

## Additional Considerations

* Adding remote methods in this way **does not add them to the Swagger JSON**.
  This means you will not see a "Users/greet" method listed in the API explorer.
* By design, you can override settings in `model-config.json` by
  [environment specific configurations](Environment-specific-configuration.html).
  Bear this in mind when defining ACLs as shown above.
