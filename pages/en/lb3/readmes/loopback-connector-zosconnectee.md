# loopback-connector-zosconnectee

The official connector for z/OS Connect Enterprise Edition. IBM® z/OS® Connect Enterprise Edition (EE) V2.0 extends the value of applications that run on z/OS by allowing efficient and scalable APIs for contemporary mobile and cloud applications to be easily created. The loopback-connector-zosconnectee module is the LoopBack connector for z/OS Connect Enterprise Edition.

Note: The loopback-connector-zosconnectee connector leverages the loopback-connector-rest connector for performing RESTful invocations to z/OS Connect EE server.

<div class="gh-only">Please also see <a href="http://loopback.io/doc/en/lb3/zOSconnectEE.html">LoopBack Connector for z/OS Connect Enterprise Edition</a> in LoopBack documentation.
</div>

## Installation

In your application root directory, enter this command to install the connector:

```sh
npm install loopback-connector-zosconnectee --save
```

This installs the module from npm and adds it as a dependency to the application's `package.json` file.

If you create a z/OS Connect Enterprise Edition data source using the data source generator as described below, you don't have to run `npm install` since the generator will run it for you.

## Creating a z/OS Connect Enterprise Edition data source

Run the command `lb datasource` and follow the prompts, selecting the z/OS Connect Enterprise Edition connector. Use the [Data source generator](http://loopback.io/doc/en/lb3/Data-source-generator.html) to add a z/OS Connect Enterprise Edition data source to your application.  Select the `zosconnectee` connector as follows:
```
$ lb datasource
? Enter the data-source name: myZOS
? Select the connector for myZOS:
  IBM Cloudant DB (supported by StrongLoop)
  IBM DB2 for z/OS (supported by StrongLoop)
  IBM WebSphere eXtreme Scale key-value connector (supported by StrongLoop)
  Cassandra (supported by StrongLoop)
  Redis key-value connector (supported by StrongLoop)
  MongoDB (supported by StrongLoop)
  MySQL (supported by StrongLoop)
❯ z/OS Connect Enterprise Edition (supported by StrongLoop)
(Move up and down to reveal more choices)
```

```

The entry in the application's `/server/datasources.json` will look like this:
```javascript
"myZCON": {
  "host": "localhost",
  "port": 9042,
  "database": "test",
  "password": "",
  "name": "myZCON",
  "user": "",
  "connectTimeout": 30000,
  "readTimeout": 30000,
  "connector": "zosconnectee"
}
```

## Configure the data source

Run the command `lb zosconnectee` which connects to the z/OS Connect EE server and then presents a list of APIs that are installed on the server. Select the API needed to configure the datasource.

## Configuration elements

The following example shows the configuration elements:

```
"myZCON": {
    "password": "fredpwd",
    "name": "zcon",
    "baseURL": "http://example:10112",
    "user": "fred",
    "connector": "zosconnectee"
  }
  ```
  where the elements are defined as:
| Property   | Type      | Description                        |
| -----------|:--------: | ---------------------------------: |
| baseURL	   | String	   | z/OS Connect EE server location
| username	 | String	   | Username                           |
| password	 | String	   | password associated with the username above |

## Customization

You may further edit the generated template file located in your LoopBack application under server/<datasource_name>template.json for customizing the function names, parameters, etc.

##Known issues

* The z/OS Connect datasource cannot be viewed or edited through `apic edit` graphical console in API Connect v5.
* The timeout functionality, which is an attribute in the connectors settings, is not yet implemented.
