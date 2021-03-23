---
title: "単純なAPIの作成"
lang: ja
layout: page
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/Create-a-simple-API.html
summary: アプリケーション生成ツールを使い、LoopBackアプリケーション・モデル・データソースを素早く作成する。
---

{% include content/ja/gs-prereqs.html %}

## 新しいアプリケーションを作成する

新しいアプリケーションを作成するには、LoopBack [アプリケーション生成ツール](Application-generator)を実行します。

`loopback-cli` を使用している場合

```
$ lb
```

`apic`を使用している場合

```
$ apic loopback
```

`slc`を使用している場合

```
$ slc loopback
```

LoopBackアプリケーション生成ツールは、フレンドリーなアスキーアートがあなたに挨拶し、アプリケーションの名前を尋ねてきます。
（`apic` や `slc` は少し異なる表示になりますが、アプリケーションの名前を要求します）

`loopback-getting-started` と入力します。
すると、生成ツールはプロジェクトを含むディレクトリの名前を尋ねます。Enterを押して既定値（アプリケーション名と同じ）を受け入れてください。

```
     _-----_
    |       |    .--------------------------.
    |--(o)--|    |  Let's create a LoopBack |
   `---------´   |       application!       |
    ( _´U`_ )    '--------------------------'
    /___A___\
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `
[?] What's the name of your application? loopback-getting-started
[?] Enter name of the directory to contain the project: loopback-getting-started
```

{% include note.html content="アプリケーションに別の名前を使うこともできます。そうする場合、チュートリアルの残りの部分を通して、\"loopback-getting-started\" を別の名前に置き換えてください。
" %}

するとツールは、作成するアプリケーションの種類を尋ねます。

If using `apic`:

```
? What kind of application do you have in mind? (Use arrow keys)
❯ empty-server (An empty LoopBack API, without any configured models or datasources)
  hello-world (A project containing a controller, including a single vanilla Message and
    a single remote method)
  notes (A project containing a basic working example, including a memory database)
```

Press **Enter** to accept the default selection, `empty server`.

If using `slc`:

```
? What kind of application do you have in mind? (Use arrow keys)
  api-server (A LoopBack API server with local User auth)
  empty-server (An empty LoopBack API, without any configured models or datasources)
❯ hello-world (A project containing a controller, including a single vanilla Message and
    a single remote method)
  notes (A project containing a basic working example, including a memory database)
```

Arrow down and choose `hello-world`.

The generator will then display messages as it scaffolds the application including:

1.  Initializing the [project folder structure](Project-layout-reference).
2.  Creating default JSON files.
3.  Creating default JavaScript files.
4.  Downloading and installing dependent Node modules (as if you had manually done `npm install`).

## モデルを作成する。

さて、最初のプロジェクトの土台ができあがりました。自動的にREST API エンドポイントが生成される _CoffeeShop_ モデルを作りましょう。

新しいアプリケーションのディレクトリに移動し、LoopBack [モデル生成ツール](Model-generator)を実行します。

```
$ cd loopback-getting-started
```

Then, using IBM API Connect developer toolkit:
```
$ apic create --type model
```

StrongLoop ツールを使用している場合、
```
$ lb model
```

生成ツールがモデル名を尋ねてくるので、**CoffeeShop**~と入力します~。

```
[?] モデル名を入力します: CoffeeShop
```

すると、モデルを既に定義したデータソースに紐付けるかどうかを聞いてきます。

この時点では、既定のインメモリデータソースのみが利用可能です。**Enter**~を押下して~選択します。

```
...
[?] CoffeeShop を付加するデータ・ソースを選択します: (Use arrow keys)
❯ db (memory)
```

次に生成ツールは、モデルに使用する基本クラスを尋ねます。ゆくゆくは、データベースにある永続的なデータソースにこのモデルを接続しますので、下矢印を押して**PersistedModel**を選んで、**Enter**を押下してください。

```
[?] モデルの基本クラスを選択します (Use arrow keys)
  Model
❯ PersistedModel
  ACL
  AccessToken
  Application
  Change
  Checkpoint
```

[PersistedModel ](http://apidocs.loopback.io/loopback/#persistedmodel)は、データベースのような永続的データソースに接続する全てのモデルの基本となるオブジェクトです。
モデルの継承階層についての概要は[LoopBack の核となる概念](LoopBack-core-concepts)を参照してください。

LoopBackの強力な優位性の一つが、モデルについて自動的に生成される REST API です。
生成ツールは、REST APIを公開するかどうか質問します。

再度**Enter**を押下し、既定値を受け入れて、CoffeeShopモデルをREST経由で公開します。

```
[?] REST API を介して CoffeeShop を公開しますか? (Y/n) Y
```

LoopBack automatically creates a REST route associated with your model using the _plural_ of the model name.  By default, it pluralizes the name for you (by adding "s"), but you can specify a custom plural form if you wish.  See [Exposing models over REST](Exposing-models-over-REST) for all the details.  

Press **Enter** to accept the default plural form (CoffeeShops):

```
[?] Custom plural form (used to build REST URL):
```

Next, you'll be asked whether you want to create the model on the server only or in the `/common` directory, where it can potentially be used by both server and [client LoopBack APIs](LoopBack-in-the-client).  Keep, the default, common, even though in this application you'll only be working with server-side models:

```
? Common model or server only?
❯ common
  server
```

Every model has properties.  Right now, you're going to define one property, "name," for the CoffeeShop model.  

Select **`string`** as the property type (press **Enter**, since string is the default choice):

```
Let's add some CoffeeShop properties now.
Enter an empty property name when done.
[?] Property name: name
   invoke   loopback:property
[?] Property type: (Use arrow keys)
❯ string
  number
  boolean
  object
  array
  date
  buffer
  geopoint
  (other)
```

Each property can be optional or required. Enter **`y`** to make `name` required:

`[?] Required? (y/N)`

Then you'll be prompted to enter a default value for the property; press Enter for no default value:

`? Default value[leave blank for none]: `

Then, you'll be prompted to add another property.  Follow the prompts to add a required property named "city."

```
Let's add another CoffeeShop property.
? Property name: city
? Property type: string
? Required? Yes
? Default value[leave blank for none]:
```

End the model creation process by pressing **Enter** when prompted for the name of the next property.

The model generator will create two files in the application's `common/models` directory that define the model: `coffee-shop.json` and `coffee-shop.js`.

{% include note.html content="The LoopBack [model generator](Model-generator.html),automatically converts camel-case model names (for example MyModel) to lowercase dashed names (my-model).  For example, if you create a model named \"FooBar\" with the model generator, it creates files `foo-bar.json` and `foo-bar.js` in `common/models`.  However, the model name (\"FooBar\") will be preserved via the model's name property.
" %}

## Check out the project structure

For all the details of the canonical LoopBack application structure, see [Project layout reference](Project-layout-reference).

## Run the application

Start the application:

```
$ node .
...
Browse your REST API at http://0.0.0.0:3000/explorer
Web server listening at: http://0.0.0.0:3000/
```

{% include note.html content="Running your app with the `node` command is appropriate when you're developing on your local machine.   In production, consider using [API Connect](https://developer.ibm.com/apiconnect/) or a [process manager](http://strong-pm.io/) for scalability and reliability.
" %}

Open your browser to [http://0.0.0.0:3000/](http://0.0.0.0:3000/) (on some systems, you may need to use [http://localhost:3000](http://localhost:3000/) instead).  You'll see the default application response that displays some JSON with some status information; for example:

```
{"started":"2016-09-10T21:59:47.155Z","uptime":42.054}
```

Now open your browser to [http://0.0.0.0:3000/explorer](http://0.0.0.0:3000/explorer) or [http://localhost:3000/explorer](http://localhost:3000/explorer).  You'll see the StrongLoop API Explorer:

{% include image.html file="5570638.png" alt="" %}

Through a set of simple steps using LoopBack, you've created a CoffeeShop model, specified its properties and then exposed it through REST. 

{% include next.html content= "
In [Use API Explorer](Use-API-Explorer.html), you'll explore the REST API you just created in more depth and exercise some of its operations.
" %}
