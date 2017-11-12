# loopback-connector-oracle

[Oracle](https://www.oracle.com/database/index.html)は、Oracle社によって開発されたリレーショナル・データベースです。`loopback-connector-oracle` モジュールは、[node-oracledb](https://github.com/oracle/node-oracledb) に基づくLoopBackフレームワークのための Oracle コネクタです。

<div class="gh-only">
For more information, see the <a href="http://loopback.io/doc/ja/lb3/Oracle-connector.html)">LoopBack documentation</a>.
</div>

## 前提条件

**Node.js**: Oracle コネクタは、Node.js バージョン 4.x または 6.x が必要です。

**Windows**: 32bit版のWindowsでは、32bit版のNode.jsを使用しなければなりません。64bit版のWindowsでは、64bit版のNode.jsを使用しなければなりません。詳細は、
 [Node-oracledb Installation on Windows](https://github.com/oracle/node-oracledb/blob/master/INSTALL.md#-7-node-oracledb-installation-on-windows) を参照してください。

**Oracle**: Oracleコネクタは、Oracleクライアントライブラリ 11.2以上が必要です。また、Oracle データベースサーバ 9.2以上に接続できます。

## インストール

アプリケーションの最上位ディレクトリで、以下のコマンドを実行してコネクタをインストールします。

```shell
$ npm install loopback-connector-oracle --save
```

以下で説明するようにデータソース生成ツールを使用してOracleデータソースを作成する場合、生成ツールは npm install を実行するので、これを行う必要はありません。

インストールに関する詳細な手引きは [Installing the Oracle connector](http://loopback.io/doc/ja/lb3/Installing-the-Oracle-connector.html) を参照してください。

[node-oracledb](https://github.com/oracle/node-oracledb) モジュールと Oracleインスタントクライアントのインストールを単純にするためには、npm install を実行する時に、依存関係として [loopback-oracle-installer](https://github.com/strongloop/loopback-oracle-installer) を使用して `node-oracledb` (oracledb) をインストール・構成します。

`config.oracleUrl`プロパティを使って、ローカル環境に対応するnode-oracle（oracledb）バンドルをダウンロードするためのベースURLを定義します。

バンドルファイル名は、`loopback-oracle-<platform>-<arch>-<version>.tar.gz` です。`version` は package.json における `version` と同じです。

```javascript
  "dependencies": {
      "loopback-oracle-installer": "git+ssh://git@github.com:strongloop/loopback-oracle-installer.git",
           ...
  },
  "config": {
      "oracleUrl": "http://7e9918db41dd01dbf98e-ec15952f71452bc0809d79c86f5751b6.r22.cf1.rackcdn.com"
  },
  ...
```

`oracleUrl`は、LOOPBACK_ORACLE_URL 環境変数をセットすることで上書き可能です。

例えば、MacOSX用の v1.5.0 の完全なURLは以下のとおりです。

http://7e9918db41dd01dbf98e-ec15952f71452bc0809d79c86f5751b6.r22.cf1.rackcdn.com/loopback-oracle-MacOSX-x64-1.5.0.tar.gz

Linux では、`libaio` ライブラリが必要です。

Ubuntu/Debian では、以下のコマンドでインストールできます。

```
sudo apt-get install libaio1
```

Fedora/CentOS/RHEL では、以下のコマンドでインストールできます。

```
sudo yum install libaio
```

## Oracle データソースを作成する

Oracle データソースをアプリケーションに追加するには、[データソース生成ツール](http://loopback.io/doc/ja/lb3/Data-source-generator.html)を使用します。

生成ツールは、Oracleデータベースに接続する上で必要なデータベースサーバのホスト名・ポート番号・その他の設定を尋ねます。
その際、上記の`npm install`コマンドも実行します。

アプリケーションの `/server/datasources.json` への入力は以下のようになります。

{% include code-caption.html content="/server/datasources.json" %}
```javascript
"mydb": {
  "name": "mydb",
  "connector": "oracle",
  "tns": "demo",  
  "host": "myserver",
  "port": 3306,
  "database": "mydb",
  "password": "mypassword",
  "user": "admin"
 }
```

追加のプロパティが必要な場合は、`datasources.json` を編集して追加します。

## コネクタのプロパティ

コネクタプロパティは、Oracle データベースを参照するための[ネーミングメソッド](http://docs.oracle.com/cd/E11882_01/network.112/e10836/naming.htm#NETAG008) に依ります。
LoopBack は3種類のネーミングメソッドが使用できます。

* 簡易接続： ホスト名／ポート番号／データベース名
* ローカルネーミング（TNS）： Oracleがサポートする全ての属性を指定できる、完全な接続文字列の別名
* ディレクトリネーミング（LDAP）：Oracleがサポートする全ての属性を指定できる、完全な接続文字列を探すためのディレクトリ

### 簡易接続

簡易接続は、TCP/IPでデータベースにすぐ接続できる最もシンプルな形式です。
この場合、データソースには以下の設定があります。

<table>
  <thead>
    <tr>
      <th>プロパティ</th>
      <th>型</th>
      <th>既定値</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>host または hostname</td>
      <td>String</td>
      <td>localhost</td>
      <td>Oracleデータベースサーバのホスト名またはIPアドレス</td>
    </tr>
    <tr>
      <td>port</td>
      <td>Number</td>
      <td>1521</td>
      <td>Oracleデータベースサーバのポート番号</td>
    </tr>
    <tr>
      <td>username または user</td>
      <td>String</td>
      <td>&nbsp;</td>
      <td>Oracleデータベースサーバに接続するユーザ名</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>&nbsp;</td>
      <td>Oracleデータベースサーバに接続するパスワード</td>
    </tr>
    <tr>
      <td>database</td>
      <td>String</td>
      <td>XE</td>
      <td>Oracleデータベースのリスナー名</td>
    </tr>
  </tbody>
</table>

例えば、以下のようになります。

{% include code-caption.html content="/server/datasources.json" %}
```javascript
{
  "demoDB": {
    "connector": "oracle",
    "host": "oracle-demo.strongloop.com",
    "port": 1521,
    "database": "XE",
    "username": "demo",
    "password": "L00pBack"
  }
}
```

### ローカルまたはディレクトリネーミング

ローカルとディレクトリネーミングは、両方共以下の設定ファイルを `/oracle/admin` のようなTNS adminディレクトリに配置する必要があります。

**sqlnet.ora**

このファイルでは使用できるネーミングメソッドを指定します。例えば以下ようなものです。

```
NAMES.DIRECTORY_PATH=(LDAP,TNSNAMES,EZCONNECT)
```

**tnsnames.ora**

このファイルでは、接続文字列の別名を設定します。例えば以下のようなものです。

```
demo1=(DESCRIPTION=(CONNECT_DATA=(SERVICE_NAME=))(ADDRESS=(PROTOCOL=TCP)(HOST=demo.strongloop.com)(PORT=1521)))
```

**ldap.ora**

このファイルでは、LDAPサーバを設定します。

```
DIRECTORY_SERVERS=(localhost:1389)
DEFAULT_ADMIN_CONTEXT="dc=strongloop,dc=com"
DIRECTORY_SERVER_TYPE=OID
```

#### TNS_ADMIN 環境変数の設定

Oracleコネクタが設定を見つけるためには、'TNS_ADMIN'環境変数が`.ora`ファイルを含むディレクトリを指すようにセットしなければなりません。

```
export TNS_ADMIN=< .ora ファイルを含むディレクトリ>
```

これで、データソースを設定するためにTNSエイリアスとLDAPサービス名の両方を使用できます。

```javascript
var ds = loopback.createDataSource({
  "tns": "demo", // tns プロパティは tns名またはLDAPサービス名のどちらでもよい
  "username": "demo",
  "password": "L00pBack"
});
```

### コネクションプーリングオプション

<table>
  <thead>
    <tr>
      <th>プロパティ名</th>
      <th>説明</th>
      <th>既定値</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <td>minConn</td>
      <td>接続プールにある最小の接続数</td>
      <td>1</td>
    </tr>
    <tr>
      <td>maxConn</td>
      <td>接続プールにある最大の接続数</td>
      <td>10</td>
    </tr>
    <tr>
      <td>incrConn</td>
      <td>
        <p>接続プールの接続を増やす際の増分値</p>
      </td>
      <td>1</td>
    </tr>
    <tr>
      <td>timeout</td>
      <td>
        接続プールの接続がタイムアウトするまでの秒数
          Oracle コネクタはアイドル時間がタイムアウト時間を過ぎると接続を終了します。
      </td>
      <td>10</td>
    </tr>
  </tbody>
</table>

例えば、以下のようになります。

{% include code-caption.html content="/server/datasources.json" %}
```javascript
{
  "demoDB": {
    "connector": "oracle",
    "minConn":1,
    "maxConn":5,
    "incrConn":1,
    "timeout": 10,
    ...
  }
}
```

### 接続のトラブルシューティング

以下のようなエラーが表示された場合、

```
Error: ORA-24408: could not generate unique server group name
```

Oracle 11g クライアントは、自身のホスト名が `127.0.0.1` を指すエントリが必要です。

解決策：

ホスト名を確認します。以下のコマンドを実行してください。（例えば、マシン名が「earth」だとします）

```
$ hostname
earth
```

`/etc/hosts` を更新して、`127.0.0.1` がホスト名「earth」を指すようにします。

```
...
127.0.0.1 localhost earth
...
```

修正を確認するために、`example/app.js` にある例を実行します。

```
$ node examples/app.js
```

詳しくは、[StackOverflow の質問](http://stackoverflow.com/questions/10484231/ora-24408-could-not-generate-unique-server-group-name) を参照してください。

## モデルプロパティ

Oracle モデル定義は、以下のプロパティから構成されます。

* `name`: モデルの名前。既定ではテーブルのキャメルケース。
* `options`: モデルレベルのオプションや、Oracleのスキーマ・テーブルとの紐付け。
* `properties`: Oracleの列との紐付けなどのプロパティ定義。

{% include code-caption.html content="/common/models/model.json" %}
```javascript
{
    "name":"Inventory",
    "options":{
      "idInjection":false,
      "oracle":{
        "schema":"STRONGLOOP",
        "table":"INVENTORY"
      }
    },
    "properties":{
      "productId":{
        "type":"String",
        "required":true,
        "length":20,
        "id":1,
        "oracle":{
          "columnName":"PRODUCT_ID",
          "dataType":"VARCHAR2",
          "dataLength":20,
          "nullable":"N"
        }
      },
      "locationId":{
        "type":"String",
        "required":true,
        "length":20,
        "id":2,
        "oracle":{
          "columnName":"LOCATION_ID",
          "dataType":"VARCHAR2",
          "dataLength":20,
          "nullable":"N"
        }
      },
      "available":{
        "type":"Number",
        "required":false,
        "length":22,
        "oracle":{
          "columnName":"AVAILABLE",
          "dataType":"NUMBER",
          "dataLength":22,
          "nullable":"Y"
        }
      },
      "total":{
        "type":"Number",
        "required":false,
        "length":22,
        "oracle":{
          "columnName":"TOTAL",
          "dataType":"NUMBER",
          "dataLength":22,
          "nullable":"Y"
        }
      }
    }
  }
```

## 型の対応関係

LoopBackのデータ型に関する詳細は [LoopBack の型](http://loopback.io/doc/ja/lb3/LoopBack-types.html)を参照してください。

### JSON から Oracle の型

<table>
  <thead>
    <tr>
      <th>LoopBack の型</th>
      <th>Oracle の型</th>
    </tr>
  </thead>    
  <tbody>    
    <tr>
      <td>String<br>JSON<br>Text<br>default</td>
      <td>VARCHAR2
      <br/>既定の長さは 1024
      </td>
    </tr>
    <tr>
      <td>Number</td>
      <td>NUMBER</td>
    </tr>
    <tr>
      <td>Date</td>
      <td>DATE</td>
    </tr>
    <tr>
      <td>Timestamp</td>
      <td>TIMESTAMP(3)</td>
    </tr>
    <tr>
      <td>Boolean</td>
      <td>CHAR(1)</td>
    </tr>
  </tbody>
</table>

### Oracle の型から JSON

<table>
  <thead>
    <tr>
      <th>Oracle Type</th>
      <th>LoopBack Type</th>
    </tr>
  </thead>    
  <tbody>    
    <tr>
      <td>CHAR(1)</td>
      <td>Boolean</td>
    </tr>
    <tr>
      <td>CHAR(n)<br>VARCHAR<br>VARCHAR2,<br>LONG VARCHAR<br>NCHAR<br>NVARCHAR2</td>
      <td>String</td>
    </tr>
    <tr>
      <td>LONG, BLOB, CLOB, NCLOB</td>
      <td>Node.js の<a class="external-link" href="http://nodejs.org/api/buffer.html">Buffer オブジェクト</a></td>
    </tr>
    <tr>
      <td>NUMBER<br>INTEGER<br>DECIMAL<br>DOUBLE<br>FLOAT<br>BIGINT<br>SMALLINT<br>REAL<br>NUMERIC<br>BINARY_FLOAT<br>BINARY_DOUBLE<br>UROWID<br>ROWID</td>
      <td>Number</td>
    </tr>
    <tr>
      <td>DATE<br>TIMESTAMP</td>
      <td>Date</td>
    </tr>
  </tbody>
</table>

## Discovery and auto-migration

### Model discovery

The Oracle connector supports _model discovery_ that enables you to create LoopBack models
based on an existing database schema using the unified [database discovery API](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-discoverandbuildmodels).  For more information on discovery, see [Discovering models from relational databases](https://loopback.io/doc/ja/lb3/Discovering-models-from-relational-databases.html).

For an example of model discover, see [`example/app.js`](https://github.com/strongloop/loopback-connector-oracle/blob/master/example/app.js).

### Auto-migratiion

The Oracle connector also supports _auto-migration_ that enables you to create a database schema
from LoopBack models using the [LoopBack automigrate method](http://apidocs.strongloop.com/loopback-datasource-juggler/#datasource-prototype-automigrate).

For more information on auto-migration, see [Creating a database schema from models](https://loopback.io/doc/ja/lb3/Creating-a-database-schema-from-models.html) for more information.

LoopBack Oracle connector creates the following schema objects for a given model:

* A table, for example, PRODUCT
* A sequence for the primary key, for example, PRODUCT_ID_SEQUENCE
* A trigger to generate the primary key from the sequnce, for example, PRODUCT_ID_TRIGGER

Destroying models may result in errors due to foreign key integrity. First delete any related models by calling delete on models with relationships.

## Running tests

### Own instance
If you have a local or remote Oracle instance and would like to use that to run the test suite, use the following command:
- Linux
```bash
ORACLE_HOST=<HOST> ORACLE_PORT=<PORT> ORACLE_USER=<USER> ORACLE_PASSWORD=<PASSWORD> ORACLE_DATABASE=<DATABASE> npm test
```
- Windows
```bash
SET ORACLE_HOST=<HOST>
SET ORACLE_PORT=<PORT>
SET ORACLE_USER=<USER>
SET ORACLE_PASSWORD=<PASSWORD>
SET ORACLE_DATABASE=<DATABASE>
npm test
```

### Docker
If you do not have a local Oracle instance, you can also run the test suite with very minimal requirements.
- Assuming you have [Docker](https://docs.docker.com/engine/installation/) installed, run the following script which would spawn an Oracle instance on your local machine:
```bash
source setup.sh <HOST> <PORT>
```
where `<HOST>`, `<PORT>`, `<USER>`, and `PASSWORD` are optional parameters. The default values are `localhost`, `1521`, `admin`, and `0raclep4ss` respectively. The `DATABASE` setting is always `XE`.
- Run the test:
```bash
npm test
```
