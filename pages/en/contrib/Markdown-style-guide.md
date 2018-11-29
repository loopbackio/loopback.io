---
title: Markdown style guide
lang: en
keywords: LoopBack documentation
tags: [community, contributing]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/Markdown-style-guide.html
summary:
---

{% include important.html content="Follow the rules outlined here to ensure that Markdown displays consistently and accurately on this site, GitHub, and npmjs.com (where applicable).
"%}

## Introduction

Github uses [Redcarpet](https://github.com/vmg/redcarpet/) to parse READMEs and other markdown files. It is, generally speaking, more permissive/forgiving than [Kramdown](https://github.com/gettalong/kramdown), the markdown parser Jekyll uses.

Each has some features that the other does not. This document outlines rules to avoid syntax that works on GitHub, but breaks when READMEs are pulled into this site (loopback.io) or npmjs.com.

## Lists

- Indent nested lists by **four spaces** (refer to [the original markdown blog post](http://daringfireball.net/projects/markdown/syntax#list) for guidelines on lists.)
- Fenced code blocks in list items:
    1. Align code blocks in list item **with the first character of text in the first line of that list item**
    2. Leave **one blank line** before code blocks in list items and **none** afterward.

Examples:

````md
1. Top Level
    0. Second level, indented **four spaces**
    1. One blank line below here

       ```js
       //this block **lined up with the capital "O" above**
       function getRandomNumber(){
           return 5;
       }
       ```
    2. Second level. No blank line above
2. Top Level 2
````

## Headers

- Always put spaces after the hash(es).
- Only put **one** `<h1>` header in a readme (The Jekyll layout we use (`_layouts/readme.html`) removes *all* `<h1>`s and replaces it with the value of the `title` page property.
- Precede headers with a blank line.

Examples:

````
## This

### This

##Not this

###Not this

# This gets removed

# This one gets removed as well

## This is fine

Here's a paragraph of text
## This isn't a heading!! Needs a newline above
````

## Links

### Use absolute URLs in READMEs

When authoring READMEs in external repositories for use in the LoopBack documentation (see [Including READMEs from other repositories](Including-READMEs.html)),
always use absolute URLs, not relative URLs.  

For example:

INCORRECT:

```
...create a script named [`automigrate.js`](bin/automigrate.js).
```

Results in (broken link):

...create a script named [`automigrate.js`](bin/automigrate.js).

CORRECT:

```
...create a script named [`automigrate.js`](https://github.com/strongloop/loopback-example-database/blob/postgresql/bin/automigrate.js).
```

Results in a working link:

...create a script named [`automigrate.js`](https://github.com/strongloop/loopback-example-database/blob/postgresql/bin/automigrate.js).

### Bare URL links

You can use a "bare" URL for a link instead of using the `[text](url)` syntax,
however, with Jekyll you must wrap the URL in angle brackets for it to be made
into a link (GitHub automatically detects URL strings and does it automatically)

For example:

```
https://this.will.not/create/a/link
<https://this.WILL.create/a/link>
```
Results in the following:

https://this.will.not/create/a/link

<https://this.WILL.create/a/link>

## Fenced code blocks

Always precede a code block with an empty line.

Examples:

<pre><code>INCORRECT: Jekyll will render the following block as inline code:
```js
console.log('Oh no! No empty line above me :(');
console.log('Oh well.')
```
</code></pre>


<pre><code>CORRECT: Works on BOTH GitHub and Jekyll:

```js
console.log('I\'m preceded by an empty line!');
console.log('Hooray!');
```
</code></pre>
