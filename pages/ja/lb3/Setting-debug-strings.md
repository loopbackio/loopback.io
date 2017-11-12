---
title: "デバッグ文字列の設定"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Setting-debug-strings.html
summary:
---

以下に説明するように、アプリケーションの実行時にデバッグ文字列を指定して、特定のログ出力をコンソールに表示することができます。
必要に応じて、出力をファイルにリダイレクトすることもできます。これらの手法は、アプリケーションのデバッグに役立ちます。

## デバッグ文字列の使用

LoopBackフレームワークには、デバッグに役立つ多数のビルトインデバッグ文字列があります。
次のように、環境変数を使用してコマンドラインで文字列を指定します。

**MacOS と Linux**

```shell
$ DEBUG=<pattern>[,<pattern>...] node .
```

**Windows**

```shell
C:\> set DEBUG=<pattern>[,<pattern>...]
C:\> node .
```

ここで、&lt;_pattern_&gt; は一致させるデバッグ文字列を指定する文字列です。一致するパターンは、必要な数だけ指定できます。

例えば (MacOS と Linux):

```shell
$ DEBUG=loopback:datasource node .
```

または、Windowsの場合

```shell
C:\> set DEBUG=loopback:datasource
C:\> node .
```

次のような出力が表示されます（簡略化のために切り捨てられています）：

```
loopback:datasource Settings: {"name":"db","debug":true} -0ms
loopback:datasource Settings: {"name":"geo","connector":"rest",...
```

パターン内のアスタリスク（`*`）を使用して、任意の文字列に一致させることができます。たとえば、次のコードは "oracle"を含むデバッグ文字列と一致します。

```shell
$ DEBUG=*oracle node .
```

また、特定のデバッガの前に "-"文字を付けることで除外することもできます。
たとえば、`DEBUG=*,-strong-remoting:*` 「strong-remoting：」で始まるデバッガ以外のすべてのデバッガが含まれます。

## デバッグ文字列形式

デバッグ文字列は、以下の形式になります。

`module[:area]:fileName`

ここで、

* _module_ はモジュールの名前です。例えば、`loopback` ・ `loopback-connector-rest`など。
* _area_ は`security`や`connector`のように、モジュールの目的を識別するための、オプションの識別子です。
* _fileName_ は `oracle.js` のような、JavaScriptソースファイルの名前です。

例えば、以下のようになります。

`loopback:security:access-context`

これは、`loopback` モジュール内の `access-context.js ` ファイル（セキュリティ機能のために使われている）とわかります。

## デバッグ文字列のリファレンス

<table>
  <tbody>
    <tr>
      <th>モジュール／ソースファイル</th>
      <th>文字列</th>
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
