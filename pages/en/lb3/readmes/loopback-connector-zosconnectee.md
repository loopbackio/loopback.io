[![Module LTS Adopted'](https://img.shields.io/badge/Module%20LTS-Adopted-brightgreen.svg?style=flat)](http://github.com/CloudNativeJS/ModuleLTS)

# LoopBack connector for z/OS Connect Enterprise Edition

IBM® z/OS® Connect Enterprise Edition (EE) extends the value of applications that run on z/OS by allowing efficient and scalable APIs for contemporary mobile and cloud applications to be easily created. The `loopback-connector-zosconnectee` module is the LoopBack connector for z/OS Connect Enterprise Edition.

**Note**: `loopback-connector-zosconnectee` leverages `loopback-connector-rest` LoopBack connector for performing RESTful invocations to z/OS Connect EE server.

## Create a datasource

Run the command `lb datasource` and follow the prompts, selecting the z/OS Connect Enterprise Edition connector.

## Configure the datasource

Run the command `lb zosconnectee` which will connect to the z/OS Connect EE server and present a list of APIs that are installed in the server allowing you to select the one to configure this datasource for.

## Configuration elements

```json
"zcon": {
    "password": "fredpwd",
    "name": "zcon",
    "baseURL": "http://example:10112",
    "user": "fred",
    "connector": "zosconnectee"
  }
```

The following table describes the connector properties.

Property       | Type    | Description
---------------| --------| --------
baseURL        | String  | z/OS Connect EE server location
username       | String  | Username
password       | String  | password associated with the username above

## Customization

You may further edit the generated template file located in your LoopBack application under server/<datasource_name>_template.json for customizing the function names, parameters, etc,.

## Known Caveats

* Cannot view/edit the z/OS Connect datasource through apic edit graphical console
* timeout functionality (attribute in the connectors settings) is not yet implemented

### Module Long Term Support Policy
This module adopts the [Module Long Term Support (LTS)](http://github.com/CloudNativeJS/ModuleLTS) policy, with the following End Of Life (EOL) dates:

 | Module Version   | Release Date | Minimum EOL | EOL With     | Status  |
 |------------------|--------------|-------------|--------------|---------|
 | V1.0.0	        | Nov 2017     | Dec 2019    | Node 8       | Current |

