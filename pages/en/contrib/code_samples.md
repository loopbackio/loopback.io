---
title: Code samples
tags: [formatting]
keywords: dcode samples syntax highlighting
last_updated: July 3, 2016
datatable: true
summary: "You can use fenced code blocks with the language specified after the first set of backtick fences."
sidebar: contrib_sidebar
permalink: /doc/en/contrib/code_samples.html
---

## Code Samples

Use fenced code blocks with the language specified, like this:

    ```js
    console.log('hello');
    ````

**Result:**

```js
console.log('hello');
```

For the list of supported languages you can use (similar to `js` for JavaScript), see [Supported languages](https://github.com/jneen/rouge/wiki/list-of-supported-languages-and-lexers).

### Code caption

Sometimes you want a caption on a code sample, for example to show the file name that contains the code.
For example:

    {%raw%}{% include code-caption.html content="/common/models/user.json" %}{%endraw%}
```javascript
"acls": [{
  "principalType": "ROLE",
  "principalId": "$authenticated",
  "permission": "ALLOW",
  "property": "count"
}, {
...
```
