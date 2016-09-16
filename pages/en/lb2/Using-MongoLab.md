---
title: "Using MongoLab"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Using-MongoLab.html
summary:
---

If you are using [MongoLab](https://mongolab.com/) to host your MongoDB database, use the LoopBack `url` property to configure your data source,
since the connection string is dynamically generated.

For example, the entry in `datasources.json` might look like this: 

{% include code-caption.html content="/server/datasources.json" %}
```javascript
"mongodb": {
  "defaultForType": "mongodb",
  "connector": "loopback-connector-mongodb",
  "url": "mongodb://localhost:27017/mydb"
}
```

For information on how to get your connection URI, see the [MongoLab documentation](https://devcenter.heroku.com/articles/mongolab#getting-your-connection-uri).