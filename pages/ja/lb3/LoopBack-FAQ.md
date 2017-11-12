---
title: "LoopBack FAQ"
lang: ja
layout: page
keywords: LoopBack
tags:
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/LoopBack-FAQ.html
summary:
---

## 一般的な質問

StrongLoop は以下のオペレーティングシステムをサポートしています。

* Red Hat Enterprise Linux (RHEL)/CentOS 6.3 (RPM)
* IBM z systems 上の RHEL 6 と RHEL 7
* Debian/Ubuntu 12.10 (DEB)
* IBM z systems 上の SUSE Linux Enterprise Server 11・12 (Node 0.12.7 と 4.2.2 を使用)
* Mac OS X Mountain Lion 10.8 (PKG)
* Microsoft Windows 8, 2008 (MSI)
  **注意**: Cygwinの使用はNodeがサポートしません。代わりに、コマンドラインツールはWindowsのコマンドプロンプトを使用してください。

### LoopBackは無料ですか？いくらかかりますか？

LoopBack は無料で利用できる（サポート除く）オープンソースプロジェクトです。また、完全なサポートが付いた商用バージョンは、
**[IBM API Connect](https://developer.ibm.com/apiconnect/)** の一部として利用可能です。

### 開発者フォーラムやメーリングリストはありますか？

はい！[LoopBack Google Group](https://groups.google.com/forum/#!forum/loopbackjs) は、開発者が質問したり、
LoopBackをどのように使うかを議論するための場所です。ぜひ参加してください。

[LoopBack Gitter channel](https://gitter.im/strongloop/loopback) はLoopBackの主要な開発者とリアルタイムに議論できます。

StrongLoop はまたLoopBackに関する話題のブログを公開しています。
最新の投稿リストは [Blog posts](https://strongloop.com/strongblog/tag_LoopBack.html) を参照してください。

### LoopBack向けのクライアントSDK はありますか？

LoopBackは、フレームワークによって生成されたREST APIサービスにアクセスするためのクライアントSDKを３つ持っています。

* iPhoneとiPadアプリ用のiOS SDK (Objective-C)。詳細は [iOS SDK](iOS-SDK.html) を参照。
* Androidアプリ用の Android SDK (Java)。詳細は [Android SDK](Android-SDK.html) を参照。
* HTML5 フロントエンド用の AngularJS (JavaScript)。詳細は [AngularJS JavaScript SDK](AngularJS-JavaScript-SDK.html) を参照。

### LoopBack にはどんなデータコネクタがありますか？

LoopBack は、企業やその他のバックエンドデータシステムにアクセスするためのコネクタをいくつも提供しています。

データベースコネクタ：

* [Cloudant コネクタ](Cloudant-connector.html)
* [DashDB](DashDB.html)
* [DB2 コネクタ](DB2-connector.html)
* [DB2 for z/OS](DB2-for-z-OS.html)
* [Informix](Informix.html)
* [Memory コネクタ](Memory-connector.html)
* [MongoDB コネクタ](MongoDB-connector.html)
* [MySQL コネクタ](MySQL-connector.html)
* [Oracle コネクタ](Oracle-connector.html)
* [PostgreSQL コネクタ](PostgreSQL-connector.html)
* [Redis コネクタ](Redis-connector.html)
* [SQL Server コネクタ](SQL-Server-connector.html)
* [SQLite3](SQLite3.html)

その他のコネクタ：

* [Email コネクタ](Email-connector.html)
* [プッシュコネクタ](Push-connector.html)
* [リモートコネクタ](Remote-connector.html)
* [REST コネクタ](REST-connector.html)
* [SOAP コネクタ](SOAP-connector.html)
* [ストレージコネクタ](Storage-connector.html)
* [Swagger コネクタ](Swagger-connector.html)

加えて、LoopBackのオープンソースコミュニティの開発者によって作られた [コミュニティコネクタ](Community-connectors.html) があります。

### curl が私のLoopBackアプリへのリクエストに失敗するのはなぜですか？

If the URL loads fine in a browser, but when you make a `curl` request to your app you get the error:

`curl: (7) Failed to connect to localhost port 3000: Connection refused`

The cause is likely to be because of incompatible IP versions between your app and `curl`.

{% include note.html content="On Mac OS 10.10 (Yosemite), `curl` uses IP v6 by default.
" %}

LoopBack, by default uses IP v4, and `curl` might be using IP v6.
If you see IP v6 entries in your hosts file (::1 localhost, fe80::1%lo0 localhost), it is likely that `curl` is making requests using IP v6.
To make request using IP v4, specify the `--ipv4` option in your curl request as shown below.

```shell
$ curl http://localhost:3000 --ipv4
```

You can make your LoopBack app use IP v6 by specifying an IP v6 address as shown below:

```javascript
app.start = function() {
  // start the web server
  return app.listen(3000, '::1',function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};
```

{% include tip.html content="
If you are trying [query filters](Querying-data.html) with curl, use the `-g` or `--globoff`
option to use brackets `[` and `]` in request URLs.
" %}

## 突っ込んだ質問

LoopBackを使って作業し始めると、より突っ込んだ質問が出てくるでしょう。
いくつかの最も一般的なものがここに集められ、さらに簡単な回答とドキュメントへのリンクがあります。

### リモートサーバーへのGETリクエストはどうやって実行するのですか？

第一に、[REST コネクタ](REST-connector.html) を使用するデータソースを設定しなければなりません。
データソースの設定を書く[datasources.json](datasources.json.html) ファイルの中で、
REST APIに対する操作を `operations` プロパティで定義できます。

短いサンプルは [loopback-example-rest-connector](https://github.com/strongloop/loopback-example-rest-connector) を参照してください。

### アプリケーションに、JSONの代わりにXMLで応答させることができますか？

はい。`server/config.json` において、`remoting.rest.xml` プロパティを `true` にセットします。
詳細は [config.json](config.json.html) を参照してください。

### アプリケーションからメールを送信するには？

簡単に書くとこうなります。

1.  [email コネクタ](Email-connector.html)を使用するデータソースを設定する。
2.  組み込みの `Email` モデルを emailデータソースに紐付けます。
3.  設定したモデルの [`Email.send()`](http://apidocs.loopback.io/loopback/#email-send) を使ってメールを送信します。

短い例は [loopback-example-app-logic](https://github.com/strongloop/loopback-example-app-logic#add-an-email-connector) を参照してください。

### static ミドルウェアの使い方は？

static ミドルウェアで、アプリケーションが、HTML・CSS・画像・クライアント用JavaScriptファイルなどの静的なコンテンツを提供できるようになります。
追加するには、以下のようにします。

1.  [`middleware.json`](middleware.json.html) ファイルの中の既定の `routes` プロパティの内容を削除します。
2.  [`middleware.json`](middleware.json.html) ファイルに、プロジェクトの `/client` ディレクトリの静的コンテンツを提供するために、
    以下の `"files"` プロパティを追加します。

    ```javascript
    "loopback#static": {      
      "params": "$!../client"
    }
    ```

    もちろん、異なるディレクトリの静的コンテンツを使うために、値を変更することもできます。

詳細は、[ミドルウェアの定義](Defining-middleware.html) を参照してください。
短い例は [loopback-example-middleware](https://github.com/strongloop/loopback-example-middleware) を参照してください。

### モデルがサポートしているフックの種類は何ですか？

LoopBackのモデルがサポートしているのは、

* [操作フック](Operation-hooks.html) はモデルがCRUD（作成・読取・更新・削除）操作を行う時に実行されます。
* [リモートフック](Remote-hooks.html) は、リモートメソッドが呼び出される前後に実行されます。

### LoopBack は JavaScript 設定ファイルをサポートしますか（JSONだけでなく）？

はい。LoopBack は既定の `.json` ファイルを `.js` ファイルで _上書き_ することができます。
詳細は、[環境固有の設定](Environment-specific-configuration.html)のページを参照してください。

### ユーザ管理の質問

詳細は、[ユーザ管理](Managing-users.html)および
[loopback-example-user-management](https://github.com/strongloop/loopback-example-user-management) の関連するコードの例を参照してください。

注：

* You must [configure LoopBack to send email](https://github.com/strongloop/loopback-faq-email) for email-related features.
* [メールを送信するようにLoopBackを設定](https://github.com/strongloop/loopback-faq-email) しなければなりません。
* Gmailを使用する場合、単にあなたの資格情報で[ユーザ名とパスワードを置き換え](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/datasources.json#L19-L20)てください。

#### 新ユーザを登録するには？

1.  サインアップ情報を集めるための[フォーム](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/views/login.ejs#L21-L36)を作成します。
2.  [確認のメールを送る](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js#L9-L34)ための[リモートフック](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js#L5-L35)を作成します。

注：

* 実行時、[`user.verify`](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js#L19) は、与えられた
  [オプション](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js#L9-L17) を使ってメールを送信します。
* この例では、確認のメールは、
  [ユーザを `/verified ルート` にリダイレクトする](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js#L15)
  ように設定されています。自分のアプリケーションでは、必要に応じて設定を変更してください。
* The [options](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js#L9-L17) are self-explanatory except `type`, `template` and `user.`
* [オプション](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js#L9-L17) の名前は、
  `type`・`template`・`user` を除けば、名前で意味がわかると思います。
  * `type` - `email` という値でなければいけません。
  * `template` - 確認のメールに使用するテンプレートのパスです。
  * `user` - 指定された場合、このオブジェクトの中の情報がメール内の確認用リンクに使われます。

#### 新ユーザ登録のために確認のメールを送るには？

前の質問の [step 2](https://github.com/strongloop/loopback-faq-user-management#how-do-you-register-a-new-user) を見てください。

#### ユーザがログインできるようにするには？

1.  [ログイン資格情報を受け付けるフォーム](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/views/login.ejs#L2-L17) を作成する。
2.  [ログイン要求を処理するルート](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/boot/routes.js#L20-L41) を作成する。

#### ユーザがログアウトできるようにするには？

1.  Create a [logout link with the access token embedded into the URL](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/views/home.ejs#L4).
1.  [URL中にアクセストークンを埋め込んだログアウトリンク](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/views/home.ejs#L4) を作成する。
2.  アクセストークンとともに[`User.logout`](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/boot/routes.js#L45) を呼び出す。

注：

* アクセストークンの処理には、token ミドルウェアを使用します。
  URLのクエリ文字列に`access_token` を提供する限り、ルートハンドラの `req.accessToken` プロパティでアクセストークンオブジェクトが提供されます。

#### 登録済みユーザがパスワードをリセットできるようにするには？

1.  [パスワードリセット情報を集めるフォーム](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/views/login.ejs#L40-L51)を作成する。
2.  [パスワードリセット要求を処理するエンドポイント](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/boot/routes.js#L52-L66)を作成する。
    最終的には、`User.resetPassword` を呼出して、`resetPasswordRequest` イベントを発生させ、一時的なアクセストークンを作成する。
3.  `resetPasswordRequest` のイベントハンドラを登録し、登録済みユーザにメールを送るようにする。
    例では、ユーザを [一時的なアクセストークンで認証されたパスワードリセットページ](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/boot/routes.js#L68-L74) に誘導する
    [URL](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js#L40-L41) を提供している。
4.  ユーザが新しいパスワードを入力し確認する
    [パスワードリセットフォーム](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/views/password-reset.ejs#L2-L17) を作成する。
5.  [パスワードのリセットを処理するエンドポイント](https://github.com/strongloop/loopback-faq-user-management/blob/master/server/boot/routes.js#L76-L99) を作成する。

注：`resetPasswordRequest` ハンドラのコールバックでは、
[`info`](https://github.com/strongloop/loopback-faq-user-management/blob/master/common/models/user.js#L38) オブジェクトが提供されます。
これには、パスワードリセットを要求しているユーザに関する情報が含まれています。

注：`bodyParser` と `loopback.token()` を使用するように設定するのを忘れないでください。
[server.js](https://github.com/strongloop/loopback-example-user-management/blob/master/server/server.js) に例があります。
