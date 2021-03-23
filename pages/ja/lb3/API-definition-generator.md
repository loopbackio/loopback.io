---
title: "API 定義生成ツール"
lang: ja
layout: page
keywords: LoopBack
tags: [tools]
sidebar: ja_lb3_sidebar
permalink: /doc/ja/lb3/API-definition-generator.html
summary:
---

{% include content/ja/generator-create-app.html %}

### 概要

LoopBackアプリケーションのSwagger API定義をエクスポートします。

```
lb export-api-def [options]
```

IBM API Connect 開発者ツールキットの場合：

```
apic loopback:export-api-def [options]
```

旧StrongLoopツールの場合：

```
slc loopback:export-api-def [options]
```

### オプション

`-o, --output`
: 出力するファイル名とフルパス。既定では、標準出力（stdout）にAPI定義が表示されます。代わりに定義をファイルに保存するには、このオプションを使用します。

`--json`
: 既定では、YAML形式でAPI定義をエクスポートします。代わりにJSON形式でエクポートする場合は、このオプションを使用するか、単にファイルの拡張子を `.json` にします。

{% include_relative includes/CLI-std-options.md %}
