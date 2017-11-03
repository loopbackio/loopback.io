---
title: Content reuse
lang: en
tags: [contributing]
keywords: includes, conref, dita, transclusion, transclude, inclusion, reference
summary: "You can reuse content from files in the `_includes` folder. "
sidebar: contrib_sidebar
permalink: /doc/en/contrib/content_reuse.html

---

## About content reuse
You can embed content from one file inside another using includes. Put the file containing content you want to reuse (e.g., mypage.html) inside the `_includes/custom` folder and then use a tag like this:

{% raw %}
```
{% include custom/mypage.html %}
```
{% endraw %}

With content in your `_includes`folder, you don't add any frontmatter to these pages because they will be included on other pages already containing frontmatter.

{% include note.html content= "By convention, content intended to be included in other pages is kept in the `_includes/content` directory, to distinguish it from include templates and other snippets of HTML such as header and footer layout.   
" %}

When you include a file, all of the file's contents get included. You can't specify that you only want a specific part of the file included. However, you can use parameters with includes. See the following Jekyll cast for more info about using parameters with includes:

<iframe width="640" height="480" src="https://www.youtube.com/embed/kzpGqdEMbIs" frameborder="0" allowfullscreen></iframe>

### Relative includes

In addition to using the `{%raw%}{% include .. %}{%endraw%}` directive, Jekyll has an `{%raw%}{% include_relative .. %}{%endraw%}` directive
that enables you to specify a relative path for the content, instead of keeping it on the `_include` directory.  This is enables you to have included/reused content that is specific to a particular release.
For example, see the files in `pages/en/lb3/includes`.

## Page-level variables

You can also create custom variables in your frontmatter like this:

{% raw %}
```yaml
---
title: Page-level variables
permalink: /doc/en/contrib/page_level_variables/
thing1: Joe
thing2: Dave
---
```
{% endraw %}

You can then access the values in those custom variables using the `page` namespace, like this:

{% raw %}
```
thing1: {{page.thing1}}
thing2: {{page.thing2}}
```
{% endraw %}


I use includes all the time. Most of the includes in the `_includes` directory are pulled into the theme layouts. For those includes that change, I put them inside custom and then inside a specific project folder.
