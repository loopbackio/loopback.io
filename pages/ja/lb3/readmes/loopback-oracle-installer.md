# loopback-oracle-installer

Oracleコネクタバージョン3.0.0以上は、Node.js用のOracleデータベースドライバとして、[oracledb](https://github.com/oracle/node-oracledb) モジュールに依存しています。`oracledb` は、[C++ add-on](http://nodejs.org/api/addons.html) であるため、インストールにはソースをコンパイルしてモジュールをビルドする C++ 開発ツールが必要です。詳しくは、[Installing compiler tools](http://loopback.io/doc/ja/lb3/Installing-compiler-tools.html) を参照してください。

実行時には、strong-oracle が [Oracle Database Instant Client](http://www.oracle.com/technetwork/database/features/instant-client/index.html) の動的ライブラリを必要とします。

`loopback-oracle-installer` モジュールはバイナリの依存関係を考慮し、Orackeコネクタインストールの手順を単純にします。

インストーラは自動的に、事前ビルド済みの`oracledb`をダウンロードし、`/loopback-connector-oracle/node_modules`ディレクトリに展開します。同様に、Oracle データベースインスタントクライアントを `<UserHomeDirectory>/oracle-instant-client` に展開します。、インストーラは Oracle の前提条件をインストールするか尋ねます。
詳細は、[Installing node-oracledb](https://github.com/oracle/node-oracledb/blob/master/INSTALL.md) を参照してください。

Oracle の前提条件をインストールしたら、以下のコマンドでOracleコネクタを再インストールします。

```shell
$ npm install loopback-connector-oracle --save
```

これは、内部で `npm install oracledb` コマンドを実行します。

## トラブルシューティング

`loopback-connector-oracle` のインストールで問題が起きたら、以下のシンボリックリンクが存在することを確認してください。

```
libclntsh.dylib -> libclntsh.dylib.11.1
```

また、以下の環境変数がセットされていることを確認してください。

```
$ export OCI_LIB_DIR=$HOME/oracle-instant-client
$ export OCI_INC_DIR=$HOME/oracle-instant-client/sdk/include
```

もし、プラットフォームやNodeのバージョンに合った事前ビルド済みのバンドルが存在せず、
[Installing node-oracledb](https://github.com/oracle/node-oracledb/blob/master/INSTALL.md) に記載されたOracleの前提条件をインストールした場合、
以下のように環境変数をセットしてください。

```
$ export OCI_LIB_DIR=/opt/oracle/instantclient
$ export OCI_INC_DIR=/opt/oracle/instantclient/sdk/include
```

## インストール後のセットアップ

{% include warning.html content="Oracleインスタントクライアントが Node プロセスから利用可能にするために、アプリケーションを実行する前に、
対象とするプラットフォームによる環境変数を **設定しなければなりません** 。
" %}

### MacOS X または Linux

以下のコマンドを実行して、`LD_LIBRARY_PATH` 環境変数をセットします。

```
$ export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:$HOME/oracle-instant-client"
```

もし、プラットフォームやNodeのバージョンに合った事前ビルド済みのバンドルが存在せず、
[Installing node-oracledb](https://github.com/oracle/node-oracledb/blob/master/INSTALL.md) に記載されたOracleの前提条件をインストールした場合、
以下のように環境変数をセットしてください。

```
$ export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:$OCI_LIB_DIR"
```

### Linux

Linuxでは、`libaio` ライブラリが必要です。もし存在しない場合、以下のようにインストールしなければなりません。

Ubuntu/Debian:

```
$ sudo apt-get install libaio1
```

Fedora/CentOS/RHEL:

```
$ sudo yum install libaio
```

### Windows

ログインユーザのPATH環境変数を設定します。PATHの設定は直ちに効果が出ないことに注意してください。
以下の方法で、設定を有効にしなければなりません。

1.  現在のセッションからログオフし、再度ログインする。
2.  以下の手順に従って、環境変数をリセットする。
    - コントロールパネルを開く --> システム --> システムの詳細設定 --> 環境変数
    - **ユーザ環境変数** の中にある **Path** を編集し、**OK** をクリックして有効化する。
    - 新しいコマンドプロンプトを開き、'path'と入力して確認する。

## Installation behind a proxy server

{% include important.html content="
This feature is supported by loopback-oracle-installer vesion 1.1.3 or later.
" %}

If your system is behind a corporate HTTP/HTTPS proxy to access the internet, you must set the proxy for npm before running `npm install`.

For example,

```shell
$ npm config set proxy http://proxy.mycompany.com:8080
$ npm config set https-proxy http://https-proxy.mycompany.com:8080
```

If the proxy URL requires username/password, use the following syntax:

```shell
$ npm config set proxy http://youruser:yourpass@proxy.mycompany.com:8080
$ npm config set https-proxy http://youruser:yourpass@https-proxy.mycompany.com:8080
```

You can also set the proxy as part of the npm command as follows:

```shell
$ npm --proxy=http://proxy.mycompany.com:8080 install
$ npm --https-proxy=http://https-proxy.mycompany.com:8080 install
```

NOTE: npm's default value for [proxy](https://www.npmjs.org/doc/misc/npm-config.html#proxy) is from the `HTTP_PROXY` or `http_proxy` environment variable.
And the default value for [https-proxy](https://www.npmjs.org/doc/misc/npm-config.html#https-proxy) 
is from the `HTTPS_PROXY`, `https_proxy`, `HTTP_PROXY`, or `http_proxy` environment variable.
So you can configure the proxy using environment variables too.

Linux or Mac:

```shell
HTTP_PROXY=http://proxy.mycompany.com:8080 npm install
```

Windows:

```shell
set HTTP_PROXY=http://proxy.mycompany.com:8080
npm install
```
