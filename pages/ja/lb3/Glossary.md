---
title:  用語集
toc: false
lang:  ja
keywords:  LoopBack
tags:  [reference]
sidebar:  ja_lb3_sidebar
permalink:  /doc/ja/lb3/Glossary.html
summary: 一般的な LoopBack 用語の定義。
---
<div style="float:right; width: 80px;">
{% include toc.html %}
</div>

{% include note.html content="見出し語は、原文の位置を保持するためにあえて翻訳せずにそのまま残してある。
" %}

## A
ACL
: Access control list（アクセス制御リスト）。 アクセスできる対象のオブジェクトや、対象のアクセス権を識別するオブジェクトを関連付けるリスト。[認証・認可・パーミッション](Authentication-authorization-and-permissions.html) を参照。

API
: Application Programming Interface（アプリケーションプログラミングインターフェース）。高級言語で書かれたアプリケーションプログラムが、オペレーティングシステムや別のプログラムの固有のデータや機能を利用できるようにするためのインターフェース。

apic
: The IBM API Connect コマンドラインツール。LoopBackアプリケーションの土台を作るコマンドを提供している。詳細は [コマンドラインツール](Command-line-tools.html) を参照。

adapter（アダプタ）
: Provides the transport-specific mechanisms to make remote objects (and collections thereof) available over their transport.  See [Strong remoting](Strong-Remoting.html).

Android
: Google が作成したモバイルオペレーティングシステム。その多くが、Apache 2.0 と GPLv2 オープンソースライセンスのもとで公開されている。

AngularJS
: オープンソースのJavaScriptクライアントサイドフレームワーク

API Connect
: StrongLoopやLoopBackの技術を吸収合併した IBM の製品で、APIの作成・実行・管理・保護が行える。[DeveloperWorks &gt; API Connect](https://developer.ibm.com/apiconnect/) を参照。

Arc
: StrongLoop graphical tool suite for the API lifecycle, including tools for building, profiling and monitoring Node apps. StrongLoop Arc is no longer under active development, and will soon be deprecated.

## B

boot script（起動スクリプト）
: アプリケーション開始時に自動的に実行される JavaScript の関数。既定では、<code>/server/boot</code> ディレクトリにある。[起動スクリプトの定義](Defining-boot-scripts.html)を参照。

built-in model（組み込みモデル）
: 全てのLoopBackアプリケーションが持っている事前に定義されたモデル。[組み込みモデルの利用](Using-built-in-models.html) を参照。

## C

cluster（クラスタ）
: 同じポートでリクエストを受け付ける、同一の Node ワーカープロセスの集合。 _worker_ を参照。

component（コンポーネント）
: 基本となるLoopBackアプリケーションを拡張する、事前定義されたパッケージ。根本的に、コンポーネントはLoopBackアプリケーションが再利用しやすいように、関連するコードを一つにまとめたものである。[LoopBack コンポーネント](LoopBack-components.html)を参照。

connector（コネクタ）
: _LoopBack connector_ を参照。

## D

data source（データソース）
: データソースは、コネクタを使用して個別のデータベースやその他のバックエンドシステムに接続する。[モデルをデータソースに接続する](Connecting-models-to-data-sources.html) を参照。

## E

endpoint（エンドポイント）
: _route_ を参照。

enterprise connector（エンタープライズコネクタ）
: Oracle, MySQL, MongoDB のようなバックエンドデータソースに接続するモジュール。

environment variable（環境変数）
: プロセスを運用する環境の側面を定義する変数。例えば、環境変数はホームディレクトリ・コマンドサーチパス・利用中のターミナル・現在のタイムゾーンなどを定義することができる。

event loop（イベントループ）
: Node.js アプリケーションを実行するシングルスレッドのプロセス。通常は、一連の非同期関数呼出しを行う。

## G

generator（生成ツール）
: LoopBackアプリケーションの全部または一部の土台を作成する対話型のコマンドラインツール。[コマンドラインツール](Command-line-tools.html)を参照。

## I

iOS
: Appleのデバイスのための、ソース非公開で独占的に所有しているモバイルオペレーティングシステム。

## J

JSON
: JavaScript オブジェクト表記法。JavaScript のオブジェクトリテラル表記法に基づいた、軽量なデータ交換フォーマット。JSONはプログラミング言語には依存しないが、さまざまな言語の規約が使用されている。

## L

lb
: LoopBack のアプリケーションの土台を作ったり、開発したりするコマンドラインインターフェース（CLI）ツール。
旧式の `slc` ツールを置き換える。

LDL
: LoopBack定義言語。LoopBackのモデルやその他の設定を定義するために使われるJSONの構造。

load balancer（ロードバランサ）
: 一つのサーバが過負荷にならないように、複数のサーバに渡って負荷を分配するソフトウェアまたはハードウェア。 ロードバランサは、あるサーバが停止した場合に、別のサーバへユーザを案内もする。

LoopBack connector（コネクタ）
: データベース・REST API・その他のサービスのようなバックエンドシステムへのアクセスを提供するコネクタ。

LoopBack DataSource Juggler
: データベース・REST API・その他のデータソースとの相互作用に共通のインターフェースを提供する ORM（Object-Relational Mapping）。

LoopBack model（モデル）
: 既定ではREST APIを提供する、アプリケーションのデータ・検証ルール・データアクセス能力・ビジネスロジックからなるモデル。

## M

MBaaS（Mobile backend as a service）
: サービスとしてのモバイルバックエンド。モバイルアプリケーションとクラウドサービスを接続し、ユーザ管理・プッシュ通知・ソーシャルネットワークとの統合を、統一されたAPIやSDKで提供するコンピューティングモデル。

middleware function（ミドルウェア関数）
: HTTPリクエストが個別のRESTエンドポイントに届いた時に実行される関数。LoopBack はExpressをベースにしているので、LoopBack のミドルウェアはExpressのミドルウェアと同じです。 [ミドルウェアの定義](Defining-middleware.html) を参照。

middleware phase（ミドルウェアフェーズ）
: アプリケーションにおいて、ミドルウェア関数を呼び出せる段階のこと。[ミドルウェアの定義](Defining-middleware.html) を参照。

model（モデル）
: _LoopBack model_ 参照。

model property（モデルのプロパティ）
: モデルに紐付けられた値。永続化モデルでは、データベースの列や項目に相当する。

## N

npm（Node package manager）
: アプリケーションをインストールしたり、npm レジストリを使って依存関係を管理するコマンドラインツール。

## O

on-premises（オンプレミス）
: ユーザや組織がローカルに保有するコンピュータにインストールされ、実行されるソフトウェアに関するもの。

operation hook（操作フック）
: モデルの高レベルな作成・読取・更新・削除（CRUD）操作によって起動されるコード。[操作フック](Operation-hooks.html)を参照。

## P

Persisted model（永続化モデル）
: 永続化データソースに紐付けられたLoopBackモデル。自動的に、基本的な作成・読取・更新・削除のメソッドを持つ。

production（本番）
: ソフトウェアライフサイクルの段階。アプリケーションやAPIがエンドユーザや消費者から一般的に利用可能になった時を指す。&quot;開発&quot;や&quot;テスト&quot;と対比される。&quot;デプロイ&quot; とも言われる。

production host（本番サーバ）
: 本番のアプリケーションが動作するサーバ。

property（プロパティ）
: モデルのプロパティを参照。

push notification（プッシュ通知）
: モバイルアプリへのアラートまたはメッセージ。[プッシュ通知](Push-notifications.html) を参照。

## R

remote object（リモートオブジェクト）
: モジュールから関数を公開するのと同じように、StrongLoop アプリケーションによってネットワーク越しに公開されたJavaScriptのオブジェクト。ローカルのJavaScriptからリモートオブジェクトのメソッドを呼び出すことができる。

REST
: ワールドワイドウェブのような、分散ハイパーメディアシステムのためのソフトウェア設計スタイル。この用語は、しばしば、SOAPのような追加のメッセージ層を用いずに、XML（またはYAML・JSON・プレインテキスト）をHTTPを介してやりとりする、あらゆるシンプルなインターフェースを表すために使われる。

route（ルート）
: リソースを識別するURLの部分。例えば、<code><span class="nolink">http: //foo.com/products/id</code>のルートは<code>/products/id</code>である。

runtime（ランタイム）
: コンピュータプログラムが実行されている期間に関するもの。

## S

SDK
: ソフトウェア開発キット。特定のプログラミング言語や運用環境でのソフトウェア開発を助けるツール・API・ドキュメントの集合体。

slc
: 開発や運用のための、旧式の StrongLoop コマンドラインツール。LoopBack CLI ツール `lb` で置き換えられた。

synchronization
: プロバイダアプリケーションとモバイルアプリケーションのような２つのエンドポイントの間でデータの一貫性を達成するためのプロセス。プロセスの間も、それぞれのエンドポイントでデータを更新・作成・削除することができる。 [同期](Synchronization.html)を参照。

## W

worker（ワーカー）
: Node.js の子プロセス。
