---
title: Markdown style guide
keywords: LoopBack documentation
tags: [community, contributing]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/Markdown-style-guide.html
summary:
---

{% include note.html content="This is a work in progress.
"%}

## Introduction

Github uses [Redcarpet](https://github.com/vmg/redcarpet/) to parse readmes & other markdown files on Github. It is, generally speaking, more permissive/forgiving than [Kramdown](https://github.com/gettalong/kramdown), the markdown parser Jekyll uses.

Each has some features that the other does not. This document outlines rules to avoid syntax that **works on github, but breaks when READMEs are pulled into loopback.io or npm**.

If the rules herein are followed, markdown should be parsed consistently & accurately in both settings. 

## Lists

1. Indent nested lists by **4 spaces** (refer to [The Blog Post](http://daringfireball.net/projects/markdown/syntax#list)'s guidelines on lists.)
2. Fenced code blocks in list items
    1. Align code blocks in list item **with the first character of text in the first line of that list item**
    2. Leave **one blank line** before code blocks in list items and **none** after

### Examples

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
1. Always put spaces after the hash(es)
2. Only put **one** `<h1>` header in a readme (*all* `<h1>`s are removed by Jekyll, which adds its own).
3. Precede headers with a blank line

### Examples
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

1. To convert a URL to a link, wrap the URL in angle brackets.

### Examples

```
https://this.will.not/create/a/link
<https://this.WILL.create/a/link>
```

## Fenced Code blocks
1. Always preceed with an empty line

### Examples

````
BAD: Jekyll will render the following block as inline code
```js
console.log('on no! No empty line above me :(');
console.log('Oh well.')
```

Good: works on github & Jekyll

```js
console.log('I\'m preceded by an empty line!');
console.log('Hooray!');
```
````