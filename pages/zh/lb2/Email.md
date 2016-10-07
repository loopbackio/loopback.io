---
title: "Email"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Email.html
summary:
---

Module: loopback

*   [Class: Email](about:blank#email)
*   [Email.send](about:blank#email-send)
*   [email.send](about:blank#email-prototype-send)

<section class="code-doc ">

### Class: Email

#### Email

Email model. Extends LoopBack base [Model](about:blank#model-new-model).

Class Properties

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">to</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Email addressee. Required.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">from</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Email sender address. Required.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">subject</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Email subject string. Required.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">text</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Text body of email.</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">html</strong></td>
      <td><code>String</code></td>
      <td>
        <p>HTML body of email.</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### Email.send(options, callback)

Send an email with the given `options`.

Example Options:

```
{
  from: "Fred Foo <foo@blurdybloop.com>", // sender address
  to: "bar@blurdybloop.com, baz@blurdybloop.com", // list of receivers
  subject: "Hello", // Subject line
  text: "Hello world", // plaintext body
  html: "<b>Hello world</b>" // html body
}
```

See [https://github.com/andris9/Nodemailer](https://github.com/andris9/Nodemailer) for other supported options.

Arguments

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">options</strong></td>
      <td><code>Object</code></td>
      <td>
        <p>See below</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">callback</strong></td>
      <td><code>Function</code></td>
      <td>
        <p>Called after the e-mail is sent or the sending failed</p>
      </td>
    </tr>
  </tbody>
</table>

options

<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><strong class="code-arg-name">from</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Senders's email address</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">to</strong></td>
      <td><code>String</code></td>
      <td>
        <p>List of one or more recipient email addresses (comma-delimited)</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">subject</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Subject line</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">text</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Body text</p>
      </td>
    </tr>
    <tr>
      <td><strong class="code-arg-name">html</strong></td>
      <td><code>String</code></td>
      <td>
        <p>Body HTML (optional)</p>
      </td>
    </tr>
  </tbody>
</table>

</section>

<section class="code-doc ">

#### email.send()

A shortcut for Email.send(this).

</section>
