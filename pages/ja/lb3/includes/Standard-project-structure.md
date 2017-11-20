LoopBack プロジェクトのファイルとディレクトリは、_アプリケーションルートディレクトリ_に配置されます。
このディレクトリ内で、LoopBackプロジェクト構造は３つのサブディレクトリを持ちます。

* `server` - Node アプリケーションスクリプトと設定ファイル
* `client` - クライアント用 JavaScript・HTML・CSSファイル (**LoopBack ツールのみ**).
* `common` - クライアントとサーバに共通のファイル。 `/models` サブディレクトリはモデルのJSONとJavaScriptファイルを含みます。
* `definitions` - API and product definition YAML files (**IBM API Connect only**).

{% include note.html content="クライアントとサーバで共有するモデルのJSONとJavaScriptファイルは `/common/models` ディレクトリに置いてください。サーバのみのファイルは `/server/models` に、クライアントのみのファイルは `/client/models` に置いてください。
" %}

<table style="font-size: 90%;">
  <thead>
    <tr>
      <th width="200">ファイルまたはディレクトリ</th>
      <th>説明</th>
      <th width="180">コードからアクセスする方法</th>
    </tr>
  </thead>
  <tbody>    
    <tr>
      <th colspan="3" style="text-align: center; background-color: #bfbfbf;">最上位のアプリケーションディレクトリ</th>
    </tr>
    <tr>
      <td><code>/node-modules</code> ディレクトリ</td>
      <td><code>package.json</code> で指定されている依存関係の Node パッケージを含む。<code>npm install</code>で更新する。</td>
      <td>なし</td>
    </tr>
    <tr>
      <td>
          <code><a href="package.json.html">package.json</a></code>
      </td>
      <td>
        標準のnpmパッケージ仕様。 <a href="package.json.html">package.json</a> を参照。
      </td>
      <td>なし</td>
    </tr>
    <tr>
      <td><code>README.md</code></td>
      <td>内部文書のスタブファイル</td>
      <td>なし</td>
    </tr>
    <tr>
      <th colspan="3" style="text-align: center; background-color: #bfbfbf;">/server ディレクトリ - Node アプリケーションファイル</th>
    </tr>
    <tr>
      <td><code>/boot</code> ディレクトリ</td>
      <td>初期化やセットアップを行うスクリプトを追加する。<a href="Events.html">起動スクリプト</a>を参照。</td>
      <td>スクリプトは、アルファベット順に自動実行される。</td>
    </tr>
    <tr>
      <td><code>/models</code> ディレクトリ</td>
      <td>サーバ限定のモデル定義</td>
      <td>Node:<br><code>myModel = <br/>app.models.myModelName</code></td>
    </tr>    
    <tr>
      <td><code><a href="component-config.json">component-config.json</a></code></td>
      <td>読み込む<a href="LoopBack-components.html">LoopBack コンポーネント</a>を指定する。</td>
      <td>Strongloop ツールによってのみ作られる。API Connect では使用しない。</td>
    </tr>
    <tr>
      <td><code><a href="config.json.html">config.json</a></code></td>
      <td>アプリケーション設定。 <a href="config.json.html">config.json</a>を参照。</td>
      <td><code>app.get('setting-name')</code></td>
    </tr>
    <tr>
      <td><code><a href="datasources.json.html">datasources.json</a></code></td>
      <td>データソース設定ファイル。<a href="datasources.json.html">datasources.json</a>参照。例は、<a href="Create-new-data-source.html">新しいデータソースの作成</a>を参照。</td>
      <td><code>app.datasources['datasource-name']</code></td>
    </tr>
    <tr>
      <td><code><a href="middleware.json.html">middleware.json</a></code></td>
      <td>ミドルウェア定義ファイル。詳細は <a href="Defining-middleware.html">ミドルウェア定義</a> を参照。</td>
      <td>なし</td>
    </tr>
    <tr>
      <td><code><a href="middleware.development.json">middleware.development.json</a></code></td>
      <td>開発時設定のミドルウェア定義ファイル。詳細は <a href="Defining-middleware.html">ミドルウェア定義</a> を参照。
      <a href="Preparing-for-deployment.html">デプロイの準備</a>を参照。</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td><code><a href="model-config.json.html">model-config.json</a></code></td>
      <td>モデル設定ファイル。<a href="model-config.json.html">model-config.json</a>を参照。詳細は、
          <a href="Connecting-models-to-data-sources.html">モデルとデータソースの接続</a>を参照。</td>
      <td>なし</td>
    </tr>
    <tr>
      <td><code><a href="server.js.html">server.js</a></code></td>
      <td>メインアプリケーションプログラムファイル</td>
      <td>なし</td>
    </tr>
    <tr>
      <th colspan="3" style="text-align: center; background-color: #bfbfbf;">/client ディレクトリ - クライアントアプリケーションファイル</th>
    </tr>
    <tr>
      <td>README.md</td>
      <td>LoopBack 生成ツールが空の <code>README.md</code> ファイルを作成する。</td>
      <td>なし</td>
    </tr>
    <tr>
      <td>その他</td>
      <td>HTML・CSS・クライアントJavaScriptファイルを追加する。</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <th colspan="3" style="text-align: center; background-color: #bfbfbf;">/common ディレクトリ - 共有アプリケーションファイル</th>
    </tr>
    <tr>
      <td><code>/models</code> ディレクトリ</td>
      <td>
        独自のモデルファイル：
        <ul>
          <li><a href="Model-definition-JSON-file.html">モデル定義JSONファイル</a> 取り決められた名前は<code><em>モデル名</em>.json</code>。例えば <code>customer.json</code> など。</li>
          <li>独自のモデルスクリプト 取り決められた名前は<code><em>モデル名</em>.js</code>。例えば、<code>customer.js</code>.</li>
        </ul>
      詳細は、<a href="Model-definition-JSON-file.html">モデル定義JSONファイル</a> と <a href="Customizing-models.html">モデルのカスタマイズ</a>を参照。 以下の注も参照。
      </td>
      <td>
        注：<br><code>myModel = <br/>app.models.myModelName</code>
      </td>
    </tr>
  </tbody>
</table>

{% include important.html content="
LoopBack [モデル生成ツール](Model-generator.html)は、自動的にキャメルケースのモデル名（例えば MyModel）を小文字ダッシュ付きの名前（my-model）に変換します。
例えば、\"FooBar\"という名前のモデルを作った場合、`common/models` には、 `foo-bar.json` と `foo-bar.js` というファイルが作られます。
しかし、モデル名(\"FooBar\")は、モデル名プロパティにそのまま残ります。
" %}
