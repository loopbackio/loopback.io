---
title: Alerts
lang: en
tags: [contributing]
keywords: notes, tips, cautions, warnings, admonitions
summary: "You can insert notes, tips, warnings, and important alerts in your content. "
sidebar: contrib_sidebar
permalink: /doc/en/contrib/alerts.html
---

## About alerts
Alerts are little warnings, info, or other messages that you have called out in special formatting.
You insert alerts by using special "include" templates; for example:

```
{%raw%}{% include note.html content="This is my note. All the content I type here is treated as a single paragraph.
" %}{% endraw%}
```

Here's the result:

{% include note.html content="This is my note. All the content I type here is treated as a single paragraph.
" %}

**IMPORTANT**: Be sure to put the ending <code>&quot; &percnt;&rbrace;</code> on a
**new line** to make the alert lay out properly.

### Parameters

All alerts have a required `content` parameter that contains the text of the alert.

In addition, the **important** and **note** alerts have an optional `title` parameter that you can
use to supply a title other than the default "Important" and "Note", respectively.

### Formatting

If you need multiple paragraphs, enter `<br/><br/>` tags. This is because block level tags aren't allowed here, as Kramdown is processing the content as Markdown despite the fact that the content is surrounded by HTML tags. Here's an example with a break:

```
{%raw%}{% include note.html content="This is my note. All the content I type here is treated as a single paragraph. <br/><br/> Now I'm typing on a  new line.
" %}{% endraw%}
```

Here's the result:

{% include note.html content="This is my note. All the content I type here is treated as a single paragraph. <br/><br/> Now I'm typing on a  new line.
" %}

## Types of alerts

There are four types of alerts you can use:

- **Note**: `note.html`
- **Tip**: `tip.html`
- **Warning**: `warning.html`
- **Important**: `important.html`

They function the same except they have a different color, icon, and alert word. You include the different types by selecting the include template you want. Here are samples of each alert:

{% include note.html content="This is my note.
" %}

{% include tip.html content="This is my tip.
" %}

{% include warning.html content="This is my warning.
" %}

{% include important.html content="This is my important info.
" %}

These alerts leverage includes stored in the `_includes` folder. The `content` option is a parameter that you pass to the include. In the include, the parameter is passed like this:

```
{% raw %}<div markdown="span" class="alert alert-info" role="alert"><i class="fa fa-info-circle"></i> <b>Note:</b> {{include.content}}{% endraw %}</div>
```

The content in `content="This is my note."` gets inserted into the `{% raw %}{{include.content}}}{% endraw %}` part of the template. You can follow this same pattern to build additional includes. See this [Jekyll screencast on includes](http://jekyll.tips/jekyll-casts/includes/) or [this screencast](https://www.youtube.com/watch?v=TJcn_PJ2100) for more information.

## Use Liquid variables inside parameters with includes

Suppose you have a product name or some other property that you're storing as a variable in your `_config.yml` configuration file, and you want to use this variable in the `content` parameter for your alert or callout. You will get an error if you use Liquid syntax inside a include parameter. For example, this syntax will produce an error:

```
{%raw%}{% include note.html content="The {{site.company}} is pleased to announce an upcoming release." %}{%endraw%}
```

The error will say something like this:

```
Liquid Exception: Invalid syntax for include tag. File contains invalid characters or sequences: ... Valid syntax: {%raw%}{% include file.ext param='value' param2='value' %}{%endraw%}
```

To use variables in your include parameters, you must use the "variable parameter" approach. First you use a `capture` tag to capture some content. Then you reference this captured tag in your include. Here's an example.

In my site configuration file (`_config.yml`), I have a property called `company_name`.

```yaml
company_name: Your company
```

I want to use this variable in my note include.

First, before the note I capture the content for my note's include like this:

```liquid
{%raw%}{% capture company_note %}The {{site.company_name}} company is pleased to announce an upcoming release.{% endcapture %}{%endraw%}
```

Now reference the `company_note` in your `include` parameter like this:

```
{%raw%}{% include note-span.html content=company_note %}{%endraw%}
```

Here's the result:

{% capture company_note %} {{site.company_name}} is pleased to announce an upcoming release.{% endcapture %}
{% include note-span.html content=company_note %}

Note the omission of quotation marks with variable parameters.

Instead of storing the variable in your site's configuration file, you could also put the variable in your page's frontmatter. Then instead of using `{%raw%}{{site.company_name}}{%endraw%}` you would use `{%raw%}{{page.company_name}}{%endraw%}`.

Because we've modified the original alert templates to allow for markdown block elements such as lists, you have to use the `note-span.html` template instead of `note.html`.

## Markdown inside of callouts and alerts

You can use Markdown inside of callouts and alerts, even though this content actually gets inserted inside of HTML in the include. This is one of the advantages of kramdown Markdown. The include template has an attribute of `markdown="span"` that allows for the processor to parse Markdown inside of HTML.

NOTE: For LoopBack, we've modified the callouts to have `markdown="1"` so they can take markdown div elements such as bullet lists.

## Validity checking

If you have some of the syntax wrong with an alert or callout, you'll see an error when Jekyll tries to build your site. The error may look like this:

```
{% raw %}Liquid Exception: Invalid syntax for include tag: content="This is my **info** type callout. It has a border on the left whose color you define by passing a type parameter. type="info" Valid syntax: {% include file.ext param='value' param2='value' %} in /en/alerts.md {% endraw %}
```

These errors are a good thing, because it lets you know there's an error in your syntax. Without the errors, you may not realize that you coded something incorrectly until you see the lack of alert or callout styling in your output.

In this case, the quotation marks aren't set correctly. I forgot the closing quotation mark for the content parameter include.

## Blast a warning to users on every page

If you want to blast a warning to users on every page, add the alert or callout to the `_layouts/page.html` page right below the frontmatter. Every page using the page layout (all, by defaut) will show this message.
