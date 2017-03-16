---
title: "Setting debug strings"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Setting-debug-strings.html
summary:
---

You can specify debug strings when you run an application, as explained below, to display specific log output to the console.
You can also redirect the output to a file, if desired. These techniques are often helpful in debugging applications.

## Using debug strings

The LoopBack framework has a number of built-in debug strings to help with debugging.
Specify a string on the command-line via an environment variable as follows:

**MacOS and Linux**

```shell
$ DEBUG=<pattern>[,<pattern>...] node .
```

**Windows**

```shell
C:\> set DEBUG=<pattern>[,<pattern>...]
C:\> node .
```

where &lt;_pattern_&gt; is a string-matching pattern specifying debug strings to match. You can specify as many matching patterns as you wish.

For example (MacOS and Linux):

```shell
$ DEBUG=loopback:datasource node .
```

Or, on Windows:

```shell
C:\> set DEBUG=loopback:datasource
C:\> node .
```

You'll see output such as (truncated for brevity):

```
loopback:datasource Settings: {"name":"db","debug":true} -0ms
loopback:datasource Settings: {"name":"geo","connector":"rest",...
```

You can use an asterisk  (`*`) in the pattern to match any string. For example the following would match any debug string containing "oracle":

```shell
$ DEBUG=*oracle node .
```

You can also exclude specific debuggers by prefixing them with a "-" character.
For example, `DEBUG=*,-strong-remoting:*` would include all debuggers except those starting with "strong-remoting:".

## Debug string format

These strings have the format

`module[:area]:fileName`

Where:

* _module_ is the name of the module, for example `loopback` or `loopback-connector-rest`.
* _area_ is an optional identifier such as `security` or `connector` to identify the purpose of the module
* _fileName_ is the name of the JavaScript source file, such as `oracle.js`.

For example:

`loopback:security:access-context`

identifies the source file `access-context.js` in the `loopback` module (used for security features).

## Debug strings reference

<table>
  <tbody>
    <tr>
      <th>Module / Source file</th>
      <th>String</th>
    </tr>
    <tr>
      <th colspan="2">loopback</th>
    </tr>
    <tr>
      <td>loopback/lib/connectors/base-connector.js</td>
      <td>connector</td>
    </tr>
    <tr>
      <td>loopback/lib/connectors/mail.js</td>
      <td>loopback:connector:mail</td>
    </tr>
    <tr>
      <td>loopback/lib/connectors/memory.js</td>
      <td>memory</td>
    </tr>
    <tr>
      <td>loopback/lib/models/access-context.js</td>
      <td>loopback:security:access-context</td>
    </tr>
    <tr>
      <td>loopback/lib/models/acl.js</td>
      <td>loopback:security:acl</td>
    </tr>
    <tr>
      <td>loopback/lib/models/change.js</td>
      <td>loopback:change</td>
    </tr>
    <tr>
      <td>loopback/lib/models/role.js</td>
      <td>loopback:security:role</td>
    </tr>
    <tr>
      <td>loopback/lib/models/user.js</td>
      <td>loopback:user</td>
    </tr>
    <tr>
      <th colspan="2"><span>loopback-datasource-juggler</span></th>
    </tr>
    <tr>
      <td>loopback-datasource-juggler/lib/datasource.js</td>
      <td>loopback:datasource</td>
    </tr>
    <tr>
      <th colspan="2">loopback-boot</th>
    </tr>
    <tr>
      <td>loopback-boot/lib/compiler.js</td>
      <td>loopback:boot:compiler</td>
    </tr>
    <tr>
      <td>loopback-boot/lib/executor.js</td>
      <td>loopback:boot:executor</td>
    </tr>
    <tr>
      <th colspan="2">Components</th>
    </tr>
    <tr>
      <td>loopback-component-push/lib/providers/apns.js</td>
      <td>loopback:component:push:provider:apns</td>
    </tr>
    <tr>
      <td>loopback-component-push/lib/providers/gcm.js</td>
      <td>loopback:component:push:provider:gcm</td>
    </tr>
    <tr>
      <td>loopback-component-push/lib/push-manager.js</td>
      <td>loopback:component:push:push-manager</td>
    </tr>
    <tr>
      <th colspan="2">Connectors</th>
    </tr>
    <tr>
      <td>loopback-connector-mongodb/lib/mongodb.js</td>
      <td>loopback:connector:mongodb</td>
    </tr>
    <tr>
      <td>loopback-connector-mssql/lib/mssql.js</td>
      <td>loopback:connector:mssql</td>
    </tr>
    <tr>
      <td>loopback-connector-mysql/lib/mysql.js</td>
      <td>loopback:connector:mysql</td>
    </tr>
    <tr>
      <td>loopback-connector-oracle/lib/oracle.js</td>
      <td>loopback:connector:oracle</td>
    </tr>
    <tr>
      <td>loopback-connector-postgresql/lib/postgresql.js</td>
      <td>loopback:connector:postgresql</td>
    </tr>
    <tr>
      <td>loopback-connector-rest/lib/rest-builder.js</td>
      <td>loopback:connector:rest</td>
    </tr>
    <tr>
      <td>loopback-connector-rest/lib/rest-connector.js</td>
      <td>loopback:connector:rest</td>
    </tr>
    <tr>
      <td>loopback-connector-rest/lib/rest-model.js</td>
      <td>loopback:connector:rest</td>
    </tr>
    <tr>
      <td>loopback-connector-rest/lib/swagger-client.js</td>
      <td>loopback:connector:rest:swagger</td>
    </tr>
    <tr>
      <td>loopback-connector-soap/lib/soap-connector.js</td>
      <td>loopback:connector:soap</td>
    </tr>
    <tr>
      <th colspan="2">strong-remoting</th>
    </tr>
    <tr>
      <td>strong-remoting/lib/dynamic.js</td>
      <td>strong-remoting:dynamic</td>
    </tr>
    <tr>
      <td>strong-remoting/lib/exports-helper.js</td>
      <td>strong-remoting:exports-helper</td>
    </tr>
    <tr>
      <td>strong-remoting/lib/http-context.js</td>
      <td>strong-remoting:http-context</td>
    </tr>
    <tr>
      <td>strong-remoting/lib/http-invocation.js</td>
      <td>strong-remoting:http-invocation</td>
    </tr>
    <tr>
      <td>strong-remoting/lib/jsonrpc-adapter.js</td>
      <td>strong-remoting:jsonrpc-adapter</td>
    </tr>
    <tr>
      <td>strong-remoting/lib/remote-objects.js</td>
      <td>strong-remoting:remotes</td>
    </tr>
    <tr>
      <td>strong-remoting/lib/rest-adapter.js</td>
      <td>strong-remoting:rest-adapter</td>
    </tr>
    <tr>
      <td>strong-remoting/lib/shared-class.js</td>
      <td>strong-remoting:shared-class</td>
    </tr>
    <tr>
      <td>strong-remoting/lib/shared-method.js</td>
      <td>strong-remoting:shared-method</td>
    </tr>
    <tr>
      <td>strong-remoting/lib/socket-io-adapter.js</td>
      <td>strong-remoting:socket-io-adapter</td>
    </tr>
    <tr>
      <td>strong-remoting/lib/socket-io-context.js</td>
      <td>strong-remoting:socket-io-context</td>
    </tr>
    <tr>
      <th colspan="2">loopback-explorer</th>
    </tr>
    <tr>
      <td>loopback-explorer/lib/route-helper.js</td>
      <td>loopback:explorer:routeHelpers</td>
    </tr>
    <tr>
      <th colspan="2">loopback-workspace</th>
    </tr>
    <tr>
      <td>loopback-workspace/connector.js</td>
      <td>workspace:connector</td>
    </tr>
    <tr>
      <td>loopback-workspace/connector.js</td>
      <td>workspace:connector:save-sync</td>
    </tr>
    <tr>
      <td>loopback-workspace/models/config-file.js</td>
      <td>workspace:config-file</td>
    </tr>
    <tr>
      <td>loopback-workspace/models/definition.js</td>
      <td>workspace:definition</td>
    </tr>
    <tr>
      <td>loopback-workspace/models/facet.js</td>
      <td>workspace:facet</td>
    </tr>
    <tr>
      <td>loopback-workspace/models/facet.js:</td>
      <td>var workspace:facet:load: - facetName</td>
    </tr>
    <tr>
      <td>loopback-workspace/models/facet.js:</td>
      <td>var workspace:facet:save: - facetName</td>
    </tr>
    <tr>
      <td>loopback-workspace/models/workspace.js</td>
      <td>workspace</td>
    </tr>
  </tbody>
</table>
