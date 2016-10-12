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

This page outlines how to author markdown so it will display properly on this site
as well as GitHub (and npm, as applicable).

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
2. Only put one `<h1>` header in a readme (*all* `<h1>`s are removed by Jekyll, which adds its own).
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

## Blockquotes

1. Only **unfenced** code blocks may go in block quotes. If highlighting is crucial, consider removing the block from the blockquote.

### Examples
```
> This:
>
>     console.log('indented 4 spaces');
>
> NOT this:
> 
> ```js
> console.log('indented 4 spaces');
> ```
>
```

## Links

1. To convert a URL to a link, wrap the URL in angle brackets.

### Examples

```
https://this.will.not/create/a/link
<https://this.WILL.create/a/link>
```

## Fenced Code blocks
1. Always preceed with an empty line