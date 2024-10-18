
# loopback-connector-elastic-search

[![Join the chat at https://gitter.im/strongloop-community/loopback-connector-elastic-search](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/strongloop-community/loopback-connector-elastic-search?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Elasticsearch(versions 6.x and 7.x) datasource connector for [Loopback 3.x](https://loopback.io/).

# Table of Contents

- [Overview](#overview)
- [Install this connector in your loopback app](#install-this-connector-in-your-loopback-app)
- [Configuring connector](#configuring-connector)
  - [Required properties](#required)
  - [Recommended properties](#recommended)
  - [Optional properties](#optional)
  - [Sample for copy paste](#sample)

- [Elasticsearch SearchAfter Support](#elasticsearch-searchafter-support)
- [TotalCount Support for search](#totalcount-support-for-search)
- [Example](#about-the-example-app)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Frequently Asked Questions](#faqs)

## Overview

1. `lib` directory has the entire source code for this connector
    1. this is what gets downloaded to your `node_modules` folder when you run `npm install loopback-connector-esv6 --save --save-exact`
1. `examples` directory has a loopback app which uses this connector
    1. this is not published to NPM, it is only here for demo purposes
        1. it will not be downloaded to your `node_modules` folder!
        1. similarly the `examples/server/datasources.json` file is there for this demo app to use
        1. you can copy their content over to `<yourApp>/server/datasources.json` or `<yourApp>/server/datasources.<env>.js` if you want and edit it there but don't start editing the files inside `examples/server` itself and expect changes to take place in your app!
1. `test` directory has unit tests
    1. it does not reuse the loopback app from the `examples` folder
    1. instead, loopback and ES/datasource are built and injected programatically
    1. this directory is not published to NPM.
        1. Refer to `.npmignore` if you're still confused about what's part of the *published* connector and what's not.
1. You will find the `datasources.json` files in this repo mention various configurations:
    1. `elasticsearch-ssl`
    2. `elasticsearch-plain`
    3. `db`
    4. You don't need them all! They are just examples to help you see the various ways in which you can configure a datasource. Delete the ones you don't need and keep the one you want. For example, most people will start off with `elasticsearch-plain` and then move on to configuring the additional properties that are exemplified in `elasticsearch-ssl`. You can mix & match if you'd like to have mongo and es and memory, all three! These are basics of the "connector" framework in loooback and not something we added.
1. Don't forget to edit your `model-config.json` file and point the models at the `dataSource` you want to use.

## Install this connector in your loopback app

```bash
cd <yourApp>
npm install loopback-connector-esv6 --save --save-exact
```

## Configuring connector

### Important Note

- **This connector will only connect to one index per datasource.**
- This package is created to support ElasticSearch v6.x and 7.x only.
- `docType` property is automatically added in mapping properties which is required to differentiate documents stored in index with loopback model data. It stores loopback modelName value. `docType: { type: "keyword", index: true }`

### Required

- **name:** name of the connector.
- **connector:** Elasticsearch driver **'esv6'**.
- **configuration:** Elasticsearch client configuraiton object which includes nodes, authetication and ssl coonfiguration. Please refer this [official link](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-configuration.html) for more information on configuraiton.
- **index:** Name of the ElasticSearch index `eg: shakespeare`.
- **version:** specify the major version of the Elasticsearch nodes you will be connecting to. Supported versions: [6, 7] `eg: version: 7`
- **mappingType:** mapping type for provided index. defaults to `basedata`. Required only for version: 6
- **mappingProperties:** An object with properties for above mentioned `mappingType`

### Optional

- **indexSettings:** optional settings object for creating index.
- **defaultSize:** Search size limit. Default is 50.

### Sample

1.Edit **datasources.json** and set:

```javascript

  "elastic-search-ssl": {
  "name": "elasticsearch-example-index-datasource",
  "connector": "esv6",
  "version": 7,
  "index": "example-index",
  "configuration": { // Elastic client configuration
    "node": "http://localhost:9200",
    "requestTimeout": 30000,
    "pingTimeout": 3000,
    "auth": {
      "username": "test",
      "password": "test"
    },
    "ssl": {
      "rejectUnauthorized": true
    }
  },
  "defaultSize": 50,
  "indexSettings": { // Elastic index settings
    "number_of_shards": 2,
    "number_of_replicas": 1
  },
  "mappingType": "basedata", // not required for version: 7, will be ignored
  "mappingProperties": {
    "docType": {
      "type": "keyword",
      "index": true
    },
    "id": {
      "type": "keyword",
      "index": true
    },
    "seq": {
      "type": "integer",
      "index": true
    },
    "name": {
      "type": "keyword",
      "index": true
    },
    "email": {
      "type": "keyword",
      "index": true
    },
    "birthday": {
      "type": "date",
      "index": true
    },
    "role": {
      "type": "keyword",
      "index": true
    },
    "order": {
      "type": "integer",
      "index": true
    },
    "vip": {
      "type": "boolean",
      "index": true
    },
    "objectId": {
      "type": "keyword",
      "index": true
    },
    "ttl": {
      "type": "integer",
      "index": true
    },
    "created": {
      "type": "date",
      "index": true
    }
  }
}
```

2.You can peek at `/examples/server/datasources.json` for more hints.

## Elasticsearch SearchAfter Support

- ```search_after``` feature of elasticsearch is supported in loopback filter.
- For this, you need to create a property in model called ```_search_after``` with loopback type ```["any"]```. This field cannot be updated using in connector.
- Elasticsearch ```sort``` value will return in this field.
- You need pass ```_search_after``` value in ```searchafter``` key of loopback filter.
- Example filter query for ```find```.

```json
{
  "where": {
    "username": "hello"
  },
  "order": "created DESC",
  "searchafter": [
    1580902552905
  ],
  "limit": 4
}
```

- Example result.

```json
[
  {
    "id": "1bb2dd63-c7b9-588e-a942-15ca4f891a80",
    "username": "test",
    "_search_after": [
      1580902552905
    ],
    "created": "2020-02-05T11:35:52.905Z"
  },
  {
    "id": "fd5ea4df-f159-5816-9104-22147f2a740f",
    "username": "test3",
    "_search_after": [
      1580902552901
    ],
    "created": "2020-02-05T11:35:52.901Z"
  },
  {
    "id": "047c0adb-13ea-5f80-a772-3d2a4691d47a",
    "username": "test4",
    "_search_after": [
      1580902552897
    ],
    "created": "2020-02-05T11:35:52.897Z"
  }
]
```

- This is useful for pagination. To go to previous page, change sorting order.

## TotalCount Support for search

- ```total``` value from elasticsearch for search queries is now supported in loopback response.
- For this, you need to create a property in model called ```_total_count``` with loopback type ```"number"```. This field cannot be updated using in connector.
- Example response ```find```.

```json
[
  {
    "id": "1bb2dd63-c7b9-588e-a942-15ca4f891a80",
    "username": "test",
    "_search_after": [
      1580902552905
    ],
    "_total_count": 3,
    "created": "2020-02-05T11:35:52.905Z"
  },
  {
    "id": "fd5ea4df-f159-5816-9104-22147f2a740f",
    "username": "test3",
    "_search_after": [
      1580902552901
    ],
    "_total_count": 3,
    "created": "2020-02-05T11:35:52.901Z"
  },
  {
    "id": "047c0adb-13ea-5f80-a772-3d2a4691d47a",
    "username": "test4",
    "_search_after": [
      1580902552897
    ],
    "_total_count": 3,
    "created": "2020-02-05T11:35:52.897Z"
  }
]
```

## About the example app

1. The `examples` directory contains a loopback app which uses this connector.
1. You can point this example at your own elasticsearch instance or use the quick instances provided via docker.

## Troubleshooting

1. Do you have both `elasticsearch-ssl` and `elasticsearch-plain` in your `datasources.json` file? You just need one of them (not both), based on how you've setup your ES instance.
1. Did you forget to set `model-config.json` to point at the datasource you configured? Maybe you are using a different or misspelled name than what you thought you had!
1. Make sure to configure major version of Elastic in `version`
1. Maybe the version of ES you are using isn't supported by the client that this project uses. Try removing the `elasticsearch` sub-dependency from `<yourApp>/node_modules/loopback-connector-esv6/node_modules` folder and then install the latest client:
    1. `cd <yourApp>/node_modules/loopback-connector-esv6/node_modules`
    1. then remove `es6` && `es7` folder
        1. unix/mac quickie: `rm -rf es6 es7`
    1. `npm install`
    1. go back to yourApp's root directory
        1. unix/mac quickie: `cd <yourApp>`
    1. And test that you can now use the connector without any issues!
    1. These changes can easily get washed away for several reasons. So for a more permanent fix that adds the version you want to work on into a release of this connector, please look into [Contributing](#contributing).

## Contributing

1. Feel free to [contribute via PR](https://github.com/strongloop-community/loopback-connector-elastic-search/pulls) or [open an issue](https://github.com/strongloop-community/loopback-connector-elastic-search/issues) for discussion or jump into the [gitter chat room](https://gitter.im/strongloop-community/loopback-connector-elastic-search) if you have ideas.
1. I recommend that project contributors who are part of the team:
    1. should merge `master` into `develop` ... if they are behind, before starting the `feature` branch
    1. should create `feature` branches from the `develop` branch
    1. should merge `feature` into `develop` then create a `release` branch to:
        1. update the changelog
        1. close related issues and mention release version
        1. update the readme
        1. fix any bugs from final testing
        1. commit locally and run `npm-release x.x.x -m "<some comment>"`
        1. merge `release` into both `master` and `develop`
        1. push `master` and `develop` to GitHub
1. For those who use forks:
    1. please submit your PR against the `develop` branch, if possible
    1. if you must submit your PR against the `master` branch ... I understand and I can't stop you. I only hope that there is a good reason like `develop` not being up-to-date with `master` for the work you want to build upon.
1. `npm-release <versionNumber> -m <commit message>` may be used to publish. Pubilshing to NPM should happen from the `master` branch. It should ideally only happen when there is something release worthy. There's no point in publishing just because of changes to `test` or `examples` folder or any other such entities that aren't part of the "published module" (refer to `.npmignore`) to begin with.

## FAQs

1. How do we enable or disable the logs coming from the underlying elasticsearch client? There may be a need to debug/troubleshoot at times.
    1. Use the env variable `DEBUG=elasticsearch` for elastic client logs.
1. How do we enable or disable the logs coming from this connector?
    1. By default if you do not set the following env variable, they are disabled: `DEBUG=loopback:connector:elasticsearch`
1. What are the tests about? Can you provide a brief overview?
    1. Tests are prefixed with `01` or `02` etc. in order to run them in that order by leveraging default alphabetical sorting.
    1. The `02.basic-querying.test.js` file uses two models to test various CRUD operations that any connector must provide, like `find(), findById(), findByIds(), updateAttributes()` etc.
        1. the two models are `User` and `Customer`
        2. their ES *mappings* are laid out in `test/resource/datasource-test.json`
        3. their loopback *definitions* can be found in the first `before` block that performs setup in `02.basic-querying.test.js` file ... these are the equivalent of a `MyModel.json` in your real loopback app.
            1. naturally, this is also where we define which property serves as the `id` for the model and if its [generated](https://docs.strongloop.com/display/APIC/Model+definition+JSON+file#ModeldefinitionJSONfile-IDproperties) or not
1. How do we get elasticserch to take over ID generation?
    1. An automatically generated id-like field that is maintained by ES is `_id`. Without some sort of es-field-level-scripting-on-index (if that is possible at all) ... I am not sure how we could ask elasticsearch to take over auto-generating an id-like value for any arbitrary field! So the connector is setup such that adding `id: {type: String, generated: true, id: true}` will tell it to use `_id` as the actual field backing the `id` ... you can keep using the doing `model.id` abstraction and in the background `_id` values are mapped to it.
    1. Will this work for any field marked as with `generated: true` and `id: true`?
        1. No! The connector isn't coded that way right now ... while it is an interesting idea to couple any such field with ES's `_id` field inside this connector ... I am not sure if this is the right thing to do. If you had `objectId: {type: String, generated: true, id: true}` then you won't find a real `objectId` field in your ES documents. Would that be ok? Wouldn't that confuse developers who want to write custom queries and run 3rd party app against their ES instance? Don't use `objectId`, use `_id` would have to be common knowledge. Is that ok?
