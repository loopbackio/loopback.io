---
title: "Push Notification REST API"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Push-Notification-REST-API.html
summary:
---

All of the endpoints in the table below are inherited from [Model REST API](http://docs.strongloop.com/display/DOC/Model+REST+API), except for [Send push notification](/doc/{{page.lang}}/lb2/Push-Notification-REST-API.html).

<table>
  <tbody>
    <tr>
      <th>
        <p>URI Pattern</p>
      </th>
      <th>HTTP Verb</th>
      <th>Default Permission</th>
      <th>Description</th>
      <th>Arguments</th>
    </tr>
    <tr>
      <td>
        <p><code>/push</code></p>
        <p>&nbsp;</p>
      </td>
      <td>
        <p>POST</p>
      </td>
      <td>Allow / Deny</td>
      <td>
        <p>Send a push notification by installation query</p>
      </td>
      <td>
        <p>Query parameters: deviceQuery</p>
        <p>Request body: notification</p>
      </td>
    </tr>
  </tbody>
</table>

## Send push notification

Send a pus notification by installation query.

`POST /push`

### **Arguments **

*   deviceQuery - Object; query parameter.
*   notification - Object; request body.

### **Example**

Request: 

```js
curl - X POST - H "Content-Type:application/json" -
  d '{"badge" : 5, "sound": "ping.aiff", "alert": "Hello", "messageFrom": "Ray"}'
http: //localhost:3000/push?deviceQuery[userId]=1
```

Response code: 200

Response body:

`{}`

### **Errors**
