---
title: Code samples
lang: en
tags: [contributing]
keywords: dcode samples syntax highlighting
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

{%raw%}<pre>
{% include code-caption.html content="/common/models/user.json" %}

```javascript
...
// Some code
...
```
</pre>{%endraw%}

Results in the following:

{% include code-caption.html content="/common/models/user.json" %}

```javascript
...
// Some code
...
```

## Syntax highlighting
For syntax highlighting, use fenced code blocks optionally followed by the language syntax you want:

<pre>
```ruby
    def foo
      puts 'foo'
    end
```
</pre>

This looks as follows:

```ruby
    def foo
      puts 'foo'
    end
```

Fenced code blocks require a blank line before and after.

If you're using an HTML file, you can also use the `highlight` command with Liquid markup:

{% raw %}
<pre>
{% highlight ruby %}
    def foo
      puts 'foo'
    end
{% endhighlight %}
</pre>
{% endraw %}

It renders the same:

{% highlight ruby %}
    def foo
      puts 'foo'
    end
{% endhighlight %}

The theme has syntax highlighting specified in the configuration file as follows:

```
highlighter: rouge
```

The syntax highlighting is done via the css/syntax.css file.

## Available lexers

The keywords you must add to specify the highlighting (in the previous example, `ruby`) are called "lexers." You can search for "lexers." Here are some common ones I use:

* js
* html
* yaml
* css
* json
* php
* java
* cpp
* dotnet
* xml
* http
