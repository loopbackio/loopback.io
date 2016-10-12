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

### Examples
````
# This
## This
### This
#Not this
##Not this
###Not this
````
