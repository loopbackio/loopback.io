---
title: “访问令牌REST API”
lang: zh
keywords: LoopBack
tags: [authentication, models]
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Access-token-REST-API.html
summary: 内置访问令牌模型表示LoopBack为已验证用户创建的访问令牌。
---
访问令牌REST API中的所有端点都从通用[PersistedModel REST API]（PersistedModel-REST-API.html）继承。
为方便起见，此处提供了参考。

<br clear="all"/>
**快速参考**

<table>
  <tbody>
    <tr>
      <th> URI模式</ th>
      <th> HTTP动词</ th>
      <th>默认权限</ th>
      <th width =“200”>说明</ th>
      <th width =“300”>参数</ th>
    </ tr>
    <tr>
      <td> <code> / accessTokens </ code> </ td>
      <td> POST </ td>
      <td>允许</ td>
      <td>
        <a href="PersistedModel-REST-API.html#create-model-instance">添加访问令牌实例</a>并持久保存到数据源。
      </ td>
      <td> JSON对象（在请求正文中）</ td>
    </ t>
    <tr>
      <td> <code> / accessTokens </ code> </ td>
      <td> GET </ td>
      <td>拒绝</ td>
      <td> <a href="PersistedModel-REST-API.html#find-matching-instances">查找与指定过滤器匹配的accessTokens的实例</a>。</ td>
      <td>
        查询参数中的一个或多个过滤器：
        <ul>
          <li>其中</ li>
          <li>包括</ li>
          <li>订购</ li>
          <li>限制</ li>
          <li>跳过/偏移</ li>
          <li>字段</ li>
        </ ul>
      </ td>
    </ tr>
    <tr>
      <td> <code> / accessTokens </ code> </ td>
      <td> PUT </ td>
      <td>拒绝</ td>
      <td> <a href="PersistedModel-REST-API.html#update--insert-instance">更新/插入访问令牌实例</a>并持久保存到数据源。</ td>
      <td> JSON对象（在请求正文中）</ td>
    </ tr>
    <tr>
      <td> <code> / accessTokens / <em> id </ em> </ code> </ td>
      <td> GET </ td>
      <td>拒绝</ td>
      <td> <a href="PersistedModel-REST-API.html#find-instance-by-id">按ID查找访问令牌</a>：返回指定访问令牌实例ID的数据。</ td>
      <td> <em> id </ em>，访问令牌实例ID（在URI路径中）</ td>
    </ tr>
    <tr>
      <td> <code> / accessTokens / <em> id </ em> </ code> </ td>
      <td> PUT </ td>
      <td>拒绝</ td>
      <td> <a href="PersistedModel-REST-API.html#update-model-instance-attributes">更新指定访问令牌ID的属性</a>并持久保存。</ td>
      <td>
        查询参数：
        <ul>
          <li> data＆nbsp; - 包含属性名称/值对的对象</ li>
          <li> <em> id </ em>＆nbsp; - 模型ID </ li>
        </ ul>
      </ td>
    </ tr>
    <tr>
      <td> <code> / accessTokens / <em> id </ em> </ code> </ td>
      <td> DELETE </ td>
      <td>拒绝</ td>
      <td> <a href="PersistedModel-REST-API.html#delete-model-instance">使用指定的实例ID删除访问令牌</a>。</ td>
      <td> <em> id </ em>，访问令牌ID <em> </ em>（在URI路径中）</ td>
    </ tr>
    <tr>
      <td> <code> / accessTokens / <em> id </ em> / exists </ code> </ td>
      <td> GET </ td>
      <td>拒绝</ td>
      <td>
        <a href="PersistedModel-REST-API.html#check-instance-existence">检查实例存在</a>：如果存在指定的访问令牌ID，则返回true。
      </ td>
      <td>
        URI路径：
        <ul>
          <li> <em> id </ em> - 模型实例ID </ li>
        </ ul>
      </ td>
    </ tr>
    <tr>
      <td> <code> / accessTokens / count </ code> </ td>
      <td> GET </ td>
      <td>拒绝</ td>
      <td>
        <a href="PersistedModel-REST-API.html#get-instance-count">返回与指定的where子句匹配的访问令牌实例数</a>。
      </ td>
      <td>查询参数</ td>中指定的过滤器
    </ tr>
    <tr>
      <td> <code> / accessTokens / findOne </ code> </ td>
      <td> GET </ td>
      <td>拒绝</ td>
      <td>
        <a href="PersistedModel-REST-API.html#find-first-instance">查找与指定过滤器匹配的第一个访问令牌实例</a>。
      </ td>
      <td>与<a href="PersistedModel-REST-API.html#find-matching-instances">查找匹配的实例</a>相同。</ td>
    </ tr>
  </ tbody>
</ table>
