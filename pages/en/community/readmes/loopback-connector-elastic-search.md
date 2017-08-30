# loopback-connector-elastic-search

[![Join the chat at https://gitter.im/strongloop-community/loopback-connector-elastic-search](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/strongloop-community/loopback-connector-elastic-search?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Basic Elasticsearch datasource connector for [Loopback](http://strongloop.com/node-js/loopback/).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Overview](#overview)
- [Install this connector in your loopback app](#install-this-connector-in-your-loopback-app)
- [Configuring connector](#configuring-connector)
  - [Required properties](#required)
  - [Recommended properties](#recommended)
  - [Optional properties](#optional)
  - [Sample for copy paste](#sample)
- [About the example app](#about-the-example-app)
  - [Run both example and ES in docker](#run-both-example-and-es-in-docker)
  - [Run example locally and ES in docker](#run-example-locally-and-es-in-docker)
  - [Run example locally](#run-example-locally)
- [How to achieve Instant search](#how-to-achieve-instant-search)
- [Troubleshooting](#troubleshooting)
- [Testing](#testing)
- [Contributing](#contributing)
- [Frequently Asked Questions](#faqs)
- [Release notes](#release-notes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Overview

1. `lib` directory has the entire source code for this connector
    1. this is what gets downloaded to your `node_modules` folder when you run `npm install loopback-connector-es --save --save-exact`
1. `examples` directory has a loopback app which uses this connector
    1. this is not published to NPM, it is only here for demo purposes
        1. it will not be downloaded to your `node_modules` folder!
        1. similarly the `examples/server/datasources.json` and `examples/server/datasources.<env>.js` files are there for this demo app to use
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

```
cd <yourApp>
npm install loopback-connector-es --save --save-exact
```

## Configuring connector

### Required:
- **host:** Elasticsearch engine host address.
- **port:** Elasticsearch engine port.
- **name:** Connector name.
- **connector:** Elasticsearch driver.
- **index:** Search engine specific index.
- **apiVersion:** specify the major version of the Elasticsearch nodes you will be connecting to.

### Recommended:
- **mappings:** an array of elasticsearch mappings for your various loopback models.
  - if your models are spread out across different indexes then you can provide an additional `index` field as an override for your model
  - if you don't want to use `type:ModelName` by default, then you can provide an additional `type` field as an override for your model

### Optional:
- **log:** sets elasticsearch client's logging, you can refer to the docs [here](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html#config-log)
- **defaultSize:** total number of results to return per page.
- **refreshOn** optional array with method names you want to set refresh option as true
- **requestTimeout:** this value is in milliseconds
- **ssl:** useful for setting up a secure channel
- **protocol:** can be `http` or `https` (`http` is the default if none specified) ... *must* be `https` if you're using `ssl`
- **auth**: useful if you have access control setup via services like `es-jetty` or `found` or `shield`
- **amazonES**: configuration for `http-aws-es` NOTE: The package needs to be installed in your project. Its not part of this Connector.

### Sample:
1. Edit **datasources.json** and set:

    ```
    "db": {
        "connector": "es",
        "name": "<name>",
        "index": "<index>",
        "hosts": [
          {
            "protocol": "http",
            "host": "127.0.0.1",
            "port": 9200,
            "auth": "username:password"
          }
        ],
        "apiVersion": "<apiVersion>",
        "refreshOn": ["save","create", "updateOrCreate"],
        "log": "trace",
        "defaultSize": <defaultSize>,
        "requestTimeout": 30000,
        "ssl": {
                "ca": "./../cacert.pem",
                "rejectUnauthorized": true
        },
        "amazonES": {
                "region": "us-east-1",
                "accessKey": "AKID",
                "secretKey": "secret"
        },
        "mappings": [
          {
            "name": "UserModel",
            "properties": {
                "realm": {"type": "string", "index" : "not_analyzed" },
                "username": {"type": "string", "index" : "not_analyzed" },
                "password": {"type": "string", "index" : "not_analyzed" },
                "email": {"type": "string", "analyzer" : "email" }
            }
          },
          {
            "name": "CoolModel",
            "index": <useSomeOtherIndex>,
            "type": <overrideTypeName>,
            "properties": {
                "realm": {"type": "string", "index" : "not_analyzed" },
                "username": {"type": "string", "index" : "not_analyzed" },
                "password": {"type": "string", "index" : "not_analyzed" },
                "email": {"type": "string", "analyzer" : "email" }
            }
          }
        ],
        "settings": {
            "analysis": {
                "filter": {
                    "email": {
                        "type": "pattern_capture",
                        "preserve_original": 1,
                        "patterns": [
                            "([^@]+)",
                            "(\\p{L}+)",
                            "(\\d+)",
                            "@(.+)"
                        ]
                    }
                },
                "analyzer": {
                    "email": {
                        "tokenizer": "uax_url_email",
                        "filter": ["email", "lowercase", "unique"]
                    }
                }
            }
        }
    }
    ```
2. You can peek at `/examples/server/datasources.json` for more hints.

## About the example app

1. The `examples` directory contains a loopback app which uses this connector.
1. You can point this example at your own elasticsearch instance or use the quick instances provided via docker.

### Run both example and ES in docker

As a developer, you may want a short lived ES instance that is easy to tear down when you're finished dev testing. We recommend docker to facilitate this.

**Pre-requisites**
You will need [docker-engine](https://docs.docker.com/engine/installation/) and [docker-compose](https://docs.docker.com/compose/install/) installed on your system.

**Step-1**
- Set desired versions for **node** and **Elasticsearch**
  - here are the [valid values](https://hub.docker.com/r/library/node/tags/) to use for  **Node**
  - here are the [valid values](https://hub.docker.com/r/library/elasticsearch/tags/) to use for  **Elasticsearch**
```
# combination of node v0.10.46 with elasticsearch v1
export NODE_VERSION=0.10.46
export ES_VERSION=1
echo 'NODE_VERSION' $NODE_VERSION && echo 'ES_VERSION' $ES_VERSION

# similarly feel free to try relevant combinations:
## of node v0.10.46 with elasticsearch v2
## of node v0.12 with elasticsearch v2
## of node v0.4 with elasticsearch v2
## of node v5 with elasticsearch v2
## elasticsearch v5 will probably not work as there isn't an `elasticsearch` client for it, as of this writing
## etc.
```
**Step-2**
- Run the setup with `docker-compose` commands.

```
git clone https://github.com/strongloop-community/loopback-connector-elastic-search.git myEsConnector
cd myEsConnector/examples
npm install
docker-compose up
```

**Step-3**
- Visit `localhost:3000/explorer` and you will find our example loopback app running there.

### Run example locally and ES in docker

1. Empty out `examples/server/datasources.json` so that it only has the following content remaining: `{}`
1. Set the `NODE_ENV` environment variable on your local/host machine
    1. Set the environment variable `NODE_ENV=sample-es-plain-1` if you want to use `examples/server/datasources.sample-es-plain-1.js`
    1. Set the environment variable `NODE_ENV=sample-es-plain-2` if you want to use `examples/server/datasources.sample-es-plain-2.js`
    1. Set the environment variable `NODE_ENV=sample-es-ssl-1` if you want to use `examples/server/datasources.sample-es-ssl-1.js`
        1. a sample docker instance for this hasn't been configured yet, so it doesn't work out-of-the-box, use it only as readable (not runnable) reference material for now
    1. You can configure your own `datasources.json` or `datasources.<env>.js` based on what you learn from these sample files.
        1. Technically, to run the example, you don't need to set `NODE_ENV` **if you won't be configuring via the `.<env>.js` files** ... configuring everything within `datasources.json` is perfectly fine too. Just remember that you will lose the ability to have inline comments and will have to use double-quotes if you stick with `.json`
1. Start elasticsearch version 1.x and 2.x using:

    ```
    git clone https://github.com/strongloop-community/loopback-connector-elastic-search.git myEsConnector
    cd myEsConnector
    docker-compose -f docker-compose-for-tests.yml up

    # in another terminal window or tab
    cd myEsConnector/examples
    npm install
    DEBUG=boot:test:* node server/server.js
    ```
1. Visit `localhost:3000/explorer` and you will find our example loopback app running there.

### Run example locally

1. Install dependencies and start the example server

    ```
    git clone https://github.com/strongloop-community/loopback-connector-elastic-search.git myEsConnector
    cd myEsConnector/examples
    npm install
    ```
2. [Configure the connector](#configuring-connector)
    * Don't forget to create an index in your ES instance: `curl -X POST https://username:password@my.es.cluster.com/shakespeare`
    * If you mess up and want to delete, you can use: `curl -X DELETE https://username:password@my.es.cluster.com/shakespeare`
    * Don't forget to set a [valid value](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html#config-api-version) for `apiVersion` field in `examples/server/datasources.json` that matches the version of ES you are running.
3. Set up a `cacert.pem` file for communicating securely (https) with your ES instance. Download the certificate chain for your ES server using this **sample** (will need to be edited to *use* your provider) command:

    ```
    cd myEsConnector
    openssl s_client -connect my.es.cluster.com:9243 -showcerts | tee cacert.pem
    ```
    1. The command may not self terminate so you may need to use `ctrl+c`
    2. It will be saved at the base of your cloned project
    3. Sometimes extra data is added to the file, you should delete everything after the following lines:

    ```
    ---
    No client certificate CA names sent
    ---
    ```
4. Run:

    ```
    cd myEsConnector/examples
    DEBUG=boot:test:* node server/server.js
    ```
    * The `examples/server/boot/boot.js` file will automatically populate data for UserModels on your behalf when the server starts.
5. Open this URL in your browser: [http://localhost:3000/explorer](http://localhost:3000/explorer)
    * Try fetching all the users via the rest api console
    * You can dump all the data from your ES index, via cmd-line too: `curl -X POST username:password@my.es.cluster.com/shakespeare/_search -d '{"query": {"match_all": {}}}'`
6. To test a specific filter via GET method, use for example: `{"q" : "friends, romans, countrymen"}`

## How to achieve Instant search

From version 1.3.4, `refresh` option is added which support's instant search after `create` and `update`. This option is configurable and one can activate or deactivate it according to their need. `By default refresh is true` which makes response to come only after documents are indexed(searchable).
To know more about `refresh` go through this [article](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-refresh.html)

* [Related Issue](https://github.com/strongloop-community/loopback-connector-elastic-search/issues/72)
* [Related PR](https://github.com/strongloop-community/loopback-connector-elastic-search/pull/81)

### Ways to configure refresh
**Datasource File:** Pass `refreshOn` array from datasource file including methods name in which you want this to be `true`
```
    "es": {
        "name": "es",
        "refreshOn": ["save","create", "updateOrCreate"],
        .....
```
**Model.json file:** Configurable on per model and operation level (`true`, `false`, `wait_for`)
```
    "elasticsearch": {
         "create": {
             "refresh": false
         },
         "destroy": {
             "refresh": false
         },
         "destroyAll": {
             "refresh": "wait_for"
         }
    }
```
###### NOTE:- *While a refresh is useful, it still has a performance cost. A manual refresh can be useful, but avoid manual refresh every time you index a document in production; it will hurt your performance. Instead, your application needs to be aware of the near real-time nature of Elasticsearch and make allowances for it.*

## Troubleshooting

1. Do you have both `elasticsearch-ssl` and `elasticsearch-plain` in your `datasources.json` file? You just need one of them (not both), based on how you've setup your ES instance.
1. Did you forget to set `model-config.json` to point at the datasource you configured? Maybe you are using a different or misspelled name than what you thought you had!
1. Did you forget to set a [valid value](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html#config-api-version) for `apiVersion` field in `datasources.json` that matches the version of ES you are running?
1. Maybe the version of ES you are using isn't supported by the client that this project uses. Try removing the `elasticsearch` sub-dependency from `<yourApp>/node_modules/loopback-connector-es/node_modules` folder and then install the latest client:
    1. `cd <yourApp>/node_modules/loopback-connector-es/node_modules`
    1. then remove the `elasticsearch` folder
        1. unix/mac quickie: `rm -rf elasticsearch`
    1. `npm install --save --save-exact https://github.com/elastic/elasticsearch-js.git`
    1. to "academically" prove to yourself that this will work with the new install:
        1. on unix/mac you can quickly dump the supported versions to your terminal with: `cat elasticsearch/package.json | grep -A 5 supported_es_branches`
        2. on other platforms, look into the `elasticsearch/package.json` and search for the `supported_es_branches` json block.
    1. go back to yourApp's root directory
        1. unix/mac quickie: `cd <yourApp>`
    1. And test that you can now use the connector without any issues!
    1. These changes can easily get washed away for several reasons. So for a more permanent fix that adds the version you want to work on into a release of this connector, please look into [Contributing](#contributing).

## Testing

1. You can edit `test/resource/datasource-test.json` to point at your ES instance and then run `npm test`
1. If you don't have an ES instance and want to leverage docker based ES instances then:
    1. If you want to run all tests across all versions in one go, then:
        1. Run `docker-compose -f docker-compose-for-testing-all.yml up`
        1. Then run `npm test`
        1. When you're finished and want to tear down the docker instances, run: `docker-compose -f docker-compose-for-testing-all.yml down`
    1. You can test a specific version of elasticsearch if you want
        1. elasticsearch version 1.x
            1. Run `docker-compose -f docker-compose-for-testing-v1.yml up`
            1. Then run `npm run testv1`
                1. To run tests with additional logging, use:
                    1. `DEBUG=test:es-v1:* npm run testv1`
                    1. `DEBUG=test:es-v1:*,loopback:connector:elasticsearch npm run testv1`
                1. [Troubleshoot test with node-inspector](http://blog.andrewray.me/how-to-debug-mocha-tests-with-chrome/) if the level of details is still not enough:
                    1. `npm run testv1 -- --debug-brk`
                    1. `DEBUG=test:es-v1:* npm run testv1 -- --debug-brk`
                    1. `DEBUG=test:es-v1:*,loopback:connector:elasticsearch npm run testv1 -- --debug-brk`
            1. When you're finished and want to tear down the docker instances, run: `docker-compose -f docker-compose-for-testing-v1.yml down`
        1. elasticsearch version 2.x
            1. Run `docker-compose -f docker-compose-for-testing-v2.yml up`
            1. Then run `npm run testv2`
                1. To run tests with additional logging, use:
                    1. `DEBUG=test:es-v2:* npm run testv2`
                    1. `DEBUG=test:es-v2:*,loopback:connector:elasticsearch npm run testv2`
                1. [Troubleshoot test with node-inspector](http://blog.andrewray.me/how-to-debug-mocha-tests-with-chrome/) if the level of details is still not enough:
                    1. `npm run testv2 -- --debug-brk`
                    1. `DEBUG=test:es-v2:* npm run testv2 -- --debug-brk`
                    1. `DEBUG=test:es-v2:*,loopback:connector:elasticsearch npm run testv2 -- --debug-brk`
            1. When you're finished and want to tear down the docker instances, run: `docker-compose -f docker-compose-for-testing-v2.yml down`
        1. elasticsearch version 5.x
            1. Run `docker-compose -f docker-compose-for-testing-v5.yml up`
            1. Then run `npm run testv5`
                1. To run tests with additional logging, use:
                    1. `DEBUG=test:es-v5:* npm run testv5`
                    1. `DEBUG=test:es-v5:*,loopback:connector:elasticsearch npm run testv5`
                1. [Troubleshoot test with node-inspector](http://blog.andrewray.me/how-to-debug-mocha-tests-with-chrome/) if the level of details is still not enough:
                    1. `npm run testv5 -- --debug-brk`
                    1. `DEBUG=test:es-v5:* npm run testv5 -- --debug-brk`
                    1. `DEBUG=test:es-v5:*,loopback:connector:elasticsearch npm run testv5 -- --debug-brk`
            1. When you're finished and want to tear down the docker instances, run: `docker-compose -f docker-compose-for-testing-v5.yml down`

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
    1. Use the `"log": "trace"` field in your datasources file or omit it. You can refer to the detailed docs [here](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html#config-log) and [here](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/logging.html)
1. How do we enable or disable the logs coming from this connector?
    1. By default if you do not set the following env variable, they are disabled: `DEBUG=loopback:connector:elasticsearch`
        1. For example, try running tests with and without it, to see the difference:
            1. with: `DEBUG=loopback:connector:elasticsearch npm test`
            1. without: `npm test`
1. What are the tests about? Can you provide a brief overview?
    1. Tests are prefixed with `01` or `02` etc. in order to run them in that order by leveraging default alphabetical sorting.
    1. The `02.basic-querying.test.js` file uses two models to test various CRUD operations that any connector must provide, like `find(), findById(), findByIds(), updateAttributes()` etc.
        1. the two models are `User` and `Customer`
        2. their ES *mappings* are laid out in `test/resource/datasource-test.json`
        3. their loopback *definitions* can be found in the first `before` block that performs setup in `02.basic-querying.test.js` file ... these are the equivalent of a `MyModel.json` in your real loopback app.
            1. naturally, this is also where we define which property serves as the `id` for the model and if its [generated](https://docs.strongloop.com/display/APIC/Model+definition+JSON+file#ModeldefinitionJSONfile-IDproperties) or not
1. How do we get elasticserch to take over ID generation?
    1. An automatically generated id-like field that is maintained by ES is `_uid`. Without some sort of es-field-level-scripting-on-index (if that is possible at all) ... I am not sure how we could ask elasticsearch to take over auto-generating an id-like value for any arbitrary field! So the connector is setup such that adding `id: {type: String, generated: true, id: true}` will tell it to use `_uid` as the actual field backing the `id` ... you can keep using the doing `model.id` abstraction and in the background `_uid` values are mapped to it.
    1. Will this work for any field marked as with `generated: true` and `id: true`?
        1. No! The connector isn't coded that way right now ... while it is an interesting idea to couple any such field with ES's `_uid` field inside this connector ... I am not sure if this is the right thing to do. If you had `objectId: {type: String, generated: true, id: true}` then you won't find a real `objectId` field in your ES documents. Would that be ok? Wouldn't that confuse developers who want to write custom queries and run 3rd party app against their ES instance? Don't use `obejctId`, use `_uid` would have to be common knowledge. Is that ok?

## Release notes

  * Release `1.0.6` of this connector updates the underlying elasticsearch client version to `11.0.1`
  * For this connector, you can configure an `index` name for your ES instance and the loopback model's name is conveniently/automatically mapped as the ES `type`.
  * Users must setup `string` fields as `not_analyzed` by default for predictable matches just like other loopback backends. And if more flexibility is required, multi-field mappings can be used too.

    ```
    "name" : {
        "type" : "multi_field",
        "fields" : {
            "name" : {"type" : "string", "index" : "not_analyzed"},
            "native" : {"type" : "string", "index" : "analyzed"}
        }
    }
    ...
    // this will treat 'George Harrison' as 'George Harrison' in a search
    User.find({order: 'name'}, function (err, users) {..}
    // this will treat 'George Harrison' as two tokens: 'george' and 'harrison' in a search
    User.find({order: 'name', where: {'name.native': 'Harrison'}}, function (err, users) {..}
    ```
  * Release `1.3.4` add's support for updateAll for elasticsearch `v-2.3` and above. To make updateAll work you will have to add below options in your `elasticsearch.yml` config file

    ```
     script.inline: true
     script.indexed: true
     script.engine.groovy.inline.search: on
     script.engine.groovy.inline.update: on
    ```
  * TBD
