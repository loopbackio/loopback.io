---
title: "ACL generator"
lang: zh
layout: page
keywords: LoopBack
tags: [authentication]
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/ACL-generator.html
summary:
---

{% include content/generator-create-app.html lang=page.lang %}

### 详情介绍

添加一个新的访问控制列表(ACL)进入一个LoopBack应用程序。
```shell
$ [slc | apic] loopback:acl [options]
```

{% include content/generator-builtin-model-caveat.html lang=page.lang%}

### 选项

`-h, --help`
输出 generator的 选择和使用.

`--skip-cache`
不记住提示符. 默认是 false.

`--skip-install`
不自动安装的依赖. 默认是 false.

### 交互式提示符

该工具将提示您必要的信息,然后修改(模型定义JSON文件) [Model definition JSON file](Model-definition-JSON-file.html) .

 generator 提示符 包括如下:

* 你想应用访问控制或全部模型的模型名字.
* 你想访问的域: 所有的方法和属性或者特殊方法 .
* 如果你选择一个特定的方法,该方法的名字.
* 访问类型 : read, write, execute, or 全部.
* 角色: 全部 users, 任何 未授权 user, 任何 授权的 user, 只能是所有者 .
* 谁允许访问: 显式授权访问或明确拒绝访问.

有关设置acl的更多信息,访问控制数据(Controlling-data-access.html)。
