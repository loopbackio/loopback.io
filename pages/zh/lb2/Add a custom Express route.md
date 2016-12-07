---
title: "添加自己的 Express 路由"
lang: zh
layout: page
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Add-a-custom-Express-route.html
summary: 因为 LoopBack 是建立在Express 之上的, 所以你可以像express中那样添加自己的路由.
---

{% include content/gs-prereqs.html lang=page.lang %}
在这个教程里,你可以学习添加一个自定义的路由.

{% include note.html content="
如果你已经学习了这个教程中之前的步骤,可以直接跳到  [Introducing boot scripts](#introducing-boot-scripts).

如果你直接跳到本章节, 那就老老实实看完如下步骤进行操作...
" %}

从github获取如下app应用,然后安装所有依赖 :

```
$ git clone https://github.com/strongloop/loopback-getting-started.git
$ cd loopback-getting-started
$ git checkout lb2-step4
$ npm install
```

## 启动脚本介绍

当 LoopBack 应用 启动时 , 它会运行如下目录中的脚本: `/server/boot` , 被当做 _boot scripts_.   LoopBack 会默认按顺序启动boot目录下的脚本 .  

标准的 LoopBack 脚手架应用会被[application generator](Application-generator) 创建,包括如下的这些标准启动脚本 (in `/server/boot`) ,这些脚本会初始化应用:

*   `authentication.js` - 打开 鉴权中间件,他们会被应用所调用,通过如下代码启动=>  [`app.enableAuth()`](http://apidocs.strongloop.com/loopback/#app-enableauth).
*   `root.js` - 定义一个默认路由来处理 `/` 的请求 [`loopback.status()`](https://apidocs.strongloop.com/loopback/#loopback-status) middleware.  You already encountered this in the previous step, when you renamed this file so your app could serve static content.

想了解更多关于启动脚本的话, 请看 [Defining boot scripts](Defining-boot-scripts).

## 添加一个新的启动脚本

比如, 增加一个新的路由 `routes.js` 在 `/server/boot` 目录, 复制一下代码:

{% include code-caption.html content="/server/boot/routes.js" %}
```javascript
module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/ping', function(req, res) {
    res.send('pong');
  });
}
```

另外, 你也可以使用这个 [Express router middleware](http://expressjs.com/4x/api.html#router) instead, like this:

{% include code-caption.html content="/server/boot/routes.js" %}
```javascript
module.exports = function(app) {
  var router = app.loopback.Router();
  router.get('/ping', function(req, res) {
    res.send('pongaroo');
  });
  app.use(router);
}
```

事实上你也可以直接把路由添加在 `server.js` 使用express的方式.  例如, 添加这个调用 [`app.use()`](http://expressjs.com/4x/api.html#app.use) 必须在调用 `app.start()`之前:

{% include code-caption.html content="server/server.js" %}
```javascript
...
app.use('/express-status', function(req, res, next) {
  res.json({ running: true });
});

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
```

LoopBack应用可以实现(而且是更简单的方式)express所有能做的事情,而且效率很高,如果你熟悉expresss的话,那么学习looopback就会更容易 .

## 运行脚本

现在启动应用使用如下命令:

`$ node .`

打开浏览器 [http://0.0.0.0:3000/ping](http://0.0.0.0:3000/ping).  你就可以看到响应. 

{% include next.html content="Check out [Next steps](Next-steps.html) 点我就可以看到下一个页面."
%}
