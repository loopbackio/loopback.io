---
title: "LoopBack - 中文"
layout: translation
toc: false
sidebar: zh_lb2_sidebar
lang: zh
tags:
permalink: /doc/zh/lb2/index.html
summary:
---

{% include styled-box.html
content="
LoopBack 是一个可扩展的开源Node.js 框架。它可以让我们

- 无需写任何代码(或少量的代码)来创建REST API
- 访问任意数据库中的数据甚至是外部的REST API
- 可以在API上定义关系型数据模型和访问限制(ACL)
- 在移动APP中使用地理位置，文件访问和推送消息
- 提供 Android, iOS 和 JavaScript SDKs快速创建有数据支持的应用程序
- 方便的应用部署，无论在云上还是自己的服务器
" %}

阅读 [LoopBack &#26680;&#24515;&#27010;&#24565;](6095111.html)， 学习核心概念和理解LoopBack的用法。

根据 [LoopBack&#21021;&#32423;&#25945;&#31243;](6095006.html)

了解LoopBack的一些关键功能。在Google Group上订阅 [LoopBack 开发论坛 提问，讨论，心得](https://groups.google.com/forum/#!forum/loopbackjs)

## LoopBack 框架

{% include see-also.html title="no" content="
Node JS新手可以参考以下文章

- [PHP Developers](http://strongloop.com/strongblog/node-js-php-get-started/)
- [Rails Developers](http://strongloop.com/strongblog/node-js-ruby-on-rails-getting-started/)
- [Java Developers](http://strongloop.com/strongblog/node-js-java-getting-started/)
" %}

LoopBack 框架是由一组Node.js的模块构成的。你可以单独使用这些模块或把它们组合在一起使用。
应用通过LoopBack model API可以使用以下三种方式访问数据。

- 将模型作为一个标准的Node对象使用
- 通过HTTP <a href="/display/zh/Built-in+models+REST+API">REST API</a> 调用
- 通过封装好的API SDK，包括<a href="/display/zh/Client+SDKs">iOS, Android &#21644; Angular</a>

应用程序通过LoopBack model API用以上三种方式查询数据，储存数据，上传文件，发送email, 推送消息，注册/登陆用户等远程或本地的服务。用户也可以通过<a href="/display/LB/Strong+Remoting">Strong Remoting</a>将后端的API通过REST, WebSocket(或其他传输协议)供客户端调用。

以下的图表展示了核心LoopBack模块，以及他们之间的关系。

{% include image.html file="9830413.png" alt="LoopBack modules" %}

### LoopBack 框架模块

<table class="confluenceTable">
<tbody>
<tr><th>模块类型</th><th>描述</th><th>用途</th><th>模块</th></tr>
<tr><td>数据模型</td><td>数据模型和API服务</td><td>迅速创建动态的数据模型及API且无需关注数据是如何储存的。</td><td>loopback</td></tr>
<tr><td>抽象方式</td><td>数据模型的抽象层，用与实现和不同数据库的交互</td><td>可以连接到不同的数据库或服务，并且提供一个对象用于CRUD，通过这个对象用户不必关心数据层具体使用的是什么数据库，可以是RDBS, MongoDB, Memory。</td><td><div style="width: 200px;">loopback-datasource-juggler</div></td></tr>
<tr><td>初始化</td><td>初始化应用</td><td>用于配置数据源, 定制/设置数据模型，并且将数据模型加载到指定的数据源上。同时可以 配置应用本身和执行启动脚本。</td><td>loopback-boot</td></tr>
<tr><td>执行序列</td><td>执行Express中间件</td><td>设置中间件，使得这些中间件可以在应用程序的不同阶段被执行。</td><td>loopback-phase</td></tr>
<tr><td>数据</td><td>连接RDBMS 和 noSQL 数据库</td><td>用于连接各种<span style="line-height: 1.4285715;">RDBMS和noSQL数据源的模块。</span></td><td>loopback-connector-mongodb
loopback-connector-mysql
loopback-connector-postgresql
loopback-connector-msssql
loopback-connector-oracle</td></tr>
<tr><td>集成</td><td>连接现有的企业或外部数据服务</td><td>用于连接到已有的REST或SOAP数据服务。</td><td>loopback-connector-rest
loopback-connector-soap</td></tr>
<tr><td>服务</td><td>连接常用服务</td><td>整合已有的服务到Loopback应用中，包括推送消息，第三方验证等......</td><td>loopback-component-push
loopback-component-storage
loopback-component-passport
loopback-component-sync <br />(开发中)</td></tr>
<tr><td>Gateway</td><td>API gateway</td><td>Secure your APIs and inject quality of service aspects to the invocation and response workflow.
 </td><td>loopback-gateway
loopback-component-oauth2</td></tr>
<tr><td>客户端</td><td>客户端 SDK</td><td>可以使用通过REST访问LoopBack API的原生平台组件 (iOS, Android, AngularJS)</td><td>loopback-sdk-ios
loopback-sdk-android
loopback-sdk-angular</td></tr></tbody></table>
