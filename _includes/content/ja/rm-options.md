{% include important.html content="All of the options properties are optional. However, if the remote method requires arguments, you must specify `accepts`; if the remote method returns a value, you must specify `returns`.
" %}
<table width="800">
  <thead>
    <tr>
      <th width="120">オプション</th>
      <th>説明</th>
      <th width="280">例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>accepts</td>
      <td>
        リモートメソッドが受け付けて、静的メソッドに渡す引数を定義する。上の例では、関数のシグネチャは<pre>Person.greet(name, age, callback)...</pre>であるため、<code>name</code>が最初の引数、<code>age</code>が２つ目の引数、そしてコールバックが自動的にLoopBackによって提供される（<code>accepts</code>配列には指定しないこと）。詳細は、<a href="Remote-methods.html#argument-descriptions">引数の説明</a>を参照ください。<br/><br/>
        既定値は空の配列 <code>[ ]</code> です。
      </td>
      <td>
        <pre style="font-size: 80%;">{  ...
accepts: [
 {arg: 'name', type: 'string'},
 {arg: 'age',  type: 'number'},
 ...],
... }</pre>
      </td>
    </tr>
    <tr>
      <td>accessScopes</td>
      <td>
        ユーザーは、自身のアクセストークンが `accessScopes` リストで定義されたスコープの内、どれか１つ以上で許可されているときのみ、
        このリモートメソッドを呼び出すことができる。
        <a href="/doc/en/lb3/Controlling-data-access.html#authorization-scopes">認証スコープ</a>を参照ください。
        <br/><br/>
        既定値は <code>DEFAULT</code> という単一の値を持つリストです。
      </td>
      <td>
        <pre>accessScopes: [
  'read',
  'read:user'
]</pre>
      </td>
    </tr>
    <tr>
      <td>description</td>
      <td>
        メソッドを説明する文章。OpenAPI（旧 Swagger）のような APIドキュメント生成ツールによって使われる。
        必要に応じて、長い文字列を配列に入れることもできる（以下参照）。
      </td>
      <td> </td>
    </tr>
    <tr>
      <td>http</td>
      <td>
        メソッドが公開されるルートを指定する。
        下にある<a href="#http-property">http プロパティ</a> を参照ください。
      </td>
      <td> </td>
    </tr>
    <tr>
      <td>notes</td>
      <td>
        OpenAPI（旧Swagger）によって使われる追加の注記。
        必要に応じて、長い文字列を配列に入れることもできる（以下参照）。
      </td>
      <td> </td>
    </tr>
    <tr>
      <td>documented</td>
      <td>
        <code>false</code>にした場合、このメソッドはOpenAPI（旧Swagger）が生成した文書には登場しなくなる。
      </td>
      <td> </td>
    </tr>
    <tr>
      <td>returns</td>
      <td>
        リモートメソッドのコールバック引数を指定する。<a href="Remote-methods.html#argument-descriptions">引数の説明</a>を参照ください。
        <code>err</code>引数は暗黙のうちに指定されるので、記述しないこと。
        既定では、空の配列 <code>[]</code> です。
      </td>
      <td>
        <pre>returns: {arg: 'greeting',
          type: 'string'}</pre>
      </td>
    </tr>
  </tbody>
</table>

{% include tip.html content="`description` と `notes` オプションでは、長い文字列を文字列の配列に分割して、行の長さを制御できます。例えば以下のようにします。

```javascript
[
 \"Lorem ipsum dolor sit amet, consectetur adipiscing elit,\",
 \"sed do eiusmod tempor incididunt ut labore et dolore\",
 \"magna aliqua.\"
]
```
" %}

### http プロパティ

`http` プロパティは、リモートメソッドが公開されるHTTPルートについての情報を提供します。

<table width="800">
  <thead>
    <tr>
      <th width="120">オプション</th>
      <th>説明</th>
      <th width="280">例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>path</td>
      <td>
        HTTP path (relative to the model) at which the method is exposed.
        モデルが公開される HTTP パス (モデルに対する相対パス)
      </td>
      <td>
        <pre>http: {path: '/sayhi'}</pre>
      </td>
    </tr>
    <tr>
      <td><a name="http.verb"></a>verb</td>
      <td>
        メソッドを呼び出せる HTTP メソッド（動詞）。以下のいずれか一つ。
        <ul>
          <li>get</li>
          <li>post (既定)</li>
          <li>patch</li>
          <li>put</li>
          <li>del</li>
          <li>all</li>
        </ul>
      </td>
      <td>
     <pre>http: {path: '/sayhi',
       verb: 'get'}</pre>
      </td>
    </tr>
    <tr>
      <td>status</td>
      <td>エラーなしにコールバックが呼び出された時の、既定の HTTP ステータス。</td>
      <td>
      <pre>http: {status: 201}</pre>
      </td>
    </tr>
    <tr>
      <td>errorStatus</td>
      <td>エラー時にコールバックが呼び出された時の、既定の HTTP ステータス。</td>
      <td>
        <pre>http: {errorStatus: 400}</pre>
      </td>
    </tr>
  </tbody>
</table>

### 引数の説明

`accepts`と` returns`オプションのプロパティは、単一の引数をオブジェクトとして、または順序付けされた引数のセットを配列として定義します。
次の表は、個々の引数のプロパティを示しています。

<table>
  <thead>
    <tr>
      <th width="100">プロパティ (キー)</th>
      <th width="100">型</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>arg</td>
      <td>String</td>
      <td>引数の名前</td>
    </tr>
    <tr>
      <td>description</td>
      <td>String または Array</td>
      <td>
        引数を説明する文章。OpenAPI（旧Swagger）のようなAPI文書生成ツールによって使われる。
        必要に応じて、長い文字列を配列に入れることもできる（上の注記参照）。
      </td>
    </tr>
    <tr>
      <td>http</td>
      <td>オブジェクトまたは関数</td>
      <td>引数について： HTTPリクエストと引数の値を紐付けを記述する関数またはオブジェクト。下にある<a href="#http-mapping-of-input-arguments">入力引数とHTTPのマッピング</a>を参照ください。</td>
    </tr>
    <tr>
      <td>http.target</td>
      <td>String</td>
      <td>
        コールバック引数の値と、HTTPレスポンスオブジェクトを紐付ける。以下の値がサポートされている。
        <ul>
          <li><code>status</code> は <code>res.statusCode</code> にセットする値を指定する</li>
          <li><code>header</code> は <code>http.header</code> または <code>arg</code> という名前のヘッダにセットする値を指定する</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>required</td>
      <td>Boolean</td>
      <td>引数が必須の場合は、true にする。さもなくば false にする。</td>
    </tr>
    <tr>
      <td>root</td>
      <td>Boolean</td>
      <td>コールバックの引数として： 関数が、単一のコールバック引数を取り、リモートの呼び出し側に返却する大本のオブジェクトとして使いたい場合、
         このプロパティを <code>true</code>にする。
        さもなくば、大本のオブジェクトはマップ（引数の名前と値）になる。
      </td>
    </tr>
    <tr>
      <td>type</td>
      <td>String</td>
      <td>引数のデータ型。 <a href="LoopBack-types.html">Loopbackの型</a>のいずれかでなければならない。 加えて、コールバック引数は、特別な型として「file」を指定できる。以下を参照。</td>
    </tr>
    <tr>
      <td>default</td>
      <td>String</td>
      <td>loopback-explorer の入力フィールドやswaggerの文書を作るために使われる既定値。
        <strong>注</strong>： この値は、引数が存在しない場合は、リモートメソッドに渡されることはない。
      </td>
    </tr>
    <tr>
      <td>documented</td>
      <td>Boolean</td>
      <td><code>false</code>にすると、このパラメータは OpenAPI（旧Swagger）が生成する文書には登場しなくなる。</td>
    </tr>
  </tbody>
</table>

例えば、単一の引数はオブジェクトで以下のように指定できる。

```javascript
{arg: 'myArg', type: 'number'}
```

複数の引数は、配列で指定する。

```javascript
[
  {arg: 'arg1', type: 'number', required: true},
  {arg: 'arg2', type: 'array'}
]
```

#### ファイル(ストリーム)レスポンスを返す。

コールバック引数として、`{ type: 'file', root: true }`を指定すると、レスポンスボディを直接送信できる。
ファイル引数は以下のいずれかの値に設定できる。

* String
* [Buffer](https://nodejs.org/api/buffer.html)
* [ReadableStream](https://nodejs.org/api/stream.html#stream_class_stream_readable) (`.pipe()` メソッドがあるものなら何でも可)

例：

```javascript
module.exports = function(MyModel) {
  MyModel.download = function(cb) {
    // getTheStreamBody() can be implemented by calling http.request() or fs.readFile() for example
    getTheStreamBody(function(err, stream) {
      if (err) return cb(err);
      // stream can be any of: string, buffer, ReadableStream (e.g. http.IncomingMessage)
      cb(null, stream, 'application/octet-stream');
    });
  };

  MyModel.remoteMethod('download', {
    returns: [
      {arg: 'body', type: 'file', root: true},
      {arg: 'Content-Type', type: 'string', http: { target: 'header' }}
    ]
  });
};
```

### 入力引数と HTTP の紐付け

There are two ways to specify HTTP mapping for input parameters (what the method accepts):
HTTPと（メソッドが受け付ける）入力パラメータの紐付けを指定する方法が２つあります。

* `source` プロパティを持つオブジェクトを提供する。
* 独自のマッピング関数を指定する。

**sourceプロパティを持つオブジェクトを指定する**

入力パラメータとHTTPの紐付けに最初の方法を使うには、以下の表に示す値の一つを持つ`source`プロパティのあるオブジェクトを提供します。

<table>
  <thead>
    <tr>
      <th>source プロパティの値</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>body</td>
      <td>リクエストボディ全体が値として使われます。</td>
    </tr>
    <tr>
      <td>form<br>query<br>path </td>
      <td>
        値は、ルート引数・リクエストボディ・クエリ文字列を検索する<code> req.param </code>を使用して参照されます。
        <code>query</code>や<code>path</code>は<code>form</code>の別名ですので注意してください。
      </td>
    </tr>
    <tr>
      <td>req</td>
      <td><a href="http://expressjs.com/4x/api.html#req" class="external-link" rel="nofollow">ExpressのHTTPリクエストオブジェクト</a>。</td>
    </tr>
    <tr>
      <td>res</td>
      <td><a href="http://expressjs.com/4x/api.html#res" class="external-link" rel="nofollow">ExpressのHTTPレスポンスオブジェクト</a>。</td>
    </tr>
    <tr>
      <td>context</td>
      <td>リクエストとレスポンスオブジェクトを保持する、context オブジェクト全体。</td>
    </tr>
  </tbody>
</table>

例えば、リクエストボディ全体を受け取る引数は以下のように指定します。

```javascript
{ arg: 'data', type: 'object', http: { source: 'body' } }
```

ExpressのHTTPリクエストとレスポンスオブジェクトを使用する例は以下のとおりです。

```javascript
[
 {arg: 'req', type: 'object', 'http': {source: 'req'}},
 {arg: 'res', type: 'object', 'http': {source: 'res'}}
]
```

**独自のマッピング関数を使う**

入力パラメータとHTTPの紐付けを指定する２つ目の方法は、独自のマッピング関数を指定するものです。例えば、以下のようにします。
```javascript
{
  arg: 'custom',
  type: 'number',
  http: function(ctx) {
    // ctx is LoopBack Context object

    // 1\. Get the HTTP request object as provided by Express
    var req = ctx.req;

    // 2\. Get 'a' and 'b' from query string or form data and return their sum.
    return -req.param('a') - req.param('b');
  }
}
```

マッピングを指定しない場合、LoopBackは値を以下のようにさばきます。（`name`は、解決すべき入力パラメータに名前とします）

1.  HTTPリクエストパラメータ `args` がJSONの中にある場合、それは、`args['name']` として扱います。
2.  さもなくば、`req.param('name')`として使います。

### JSONフィールドにないデータを返す。
_arg_ プロパティのある return 引数を指定すると、自動的に 同じ名前のフィールドにデータが格納されたJSONオブジェクトを返します。

メインのレスポンスとして、例えば配列のようなデータを返したい場合、 _root_ プロパティを持つオブジェクトを設定し、_arg_ を消去することで可能です。

```javascript
returns: {type: 'array', root: true}
```
