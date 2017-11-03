---
title: Images
lang: en
tags: [contributing]
keywords: images, screenshots, vectors, svg, markdown syntax
summary: "Store images in the images folder and use the image.html template include to insert images. This include has several options, including figcaptions, that extract the content from the formatting."
sidebar: contrib_sidebar
permalink: /doc/en/contrib/images.html
---

## Image folder

All images are kept in the `images` folder.  Because the site content was originally exported from Confluence,
most of the images are in the top-level and have automatically-generatedd numeric names, for example `4849751.png`.  However, images used in the LoopBack 4 docs are in a sub-folder, `images/lb4`; images used in the "overview" pages are in `images/overview`.  As a best practice, create a new folder for new
releases (e.g. LoopBack 5, or other projects).

## Using images

You can include images in a page using the standard markdown syntax; for example:

```
![LoopBack 4 Architecture](/images/lb4/loopback-overview.png "LoopBack 4 Architecture")
```

The result is:

![LoopBack 4 Architecture](/images/lb4/loopback-overview.png "LoopBack 4 Architecture")

## Image include template

Instead of using Markdown or HMTL syntax directly in your page for images, you can also use the image "include template" that allows you to pass some parameters that provide additional settings. For example:

```liquid
{% raw %}
{% include image.html file="loopback_logo.png" url="http://loopback.io" alt="LoopBack" caption="This is a sample caption" %}
{% endraw %}
```

Here's the result:

{% include image.html file="loopback_logo.png" url="http://loopback.io" alt="LoopBack" caption="This is a sample caption" %}

The following table summarizes the image include template properties:

| Property | description |
|-------|--------|
| file | The name of the file. Store it in the /images folder. If you want to organize your images in subfolders, reference the subfolder path here, like this: `mysubfolder/jekyllrb.png` |
| url | Whether to link the image to a URL |
| alt | Alternative image text for accessibility and SEO |
| caption | A caption for the image |
| max-width | a maximum width for the image (in pixels). Just specify the number, not px.|

The properties of the include get populated into the image.html template.

## Inline image includes

For inline images, such as with a button that you want to appear inline with text, use the inline_image.html include, like this:

```liquid
Click the **Expand** icon {%raw%}{% include inline_image.html
file="4849751.png" alt="SDK button" %}{%endraw%}
```

Click the **Expand** icon {% include inline_image.html file="4849751.png" alt="SDK button" %}

The inline_image.html include properties are as follows:

| Property | description |
|-------|--------|
| file | The name of the file |
| type | The type of file (png, svg, and so on) |
| alt | Alternative image text for accessibility and SEO |

## SVG Images

You can also embed SVG graphics. If you use SVG, you need to use the HTML syntax so that you can define a width/container for the graphic. Here's a sample embed:

```liquid
{% raw %}{% include image.html file="overview/book.svg" url="http://looopback.io" alt="Book icon" caption="A book icon" max-width="600" %}{% endraw %}
```

Here's the result:

{% include image.html file="overview/book.svg" url="http://looopback.io" alt="Book icon" caption="A book icon" max-width="600" %}

The stylesheet even handles SVG display in IE 9 and earlier through the following style (based on this [gist](https://gist.github.com/larrybotha/7881691)):

```css
/*
 * Let's target IE to respect aspect ratios and sizes for img tags containing SVG files
 *
 * [1] IE9
 * [2] IE10+
 */
/* 1 */
.ie9 img[src$=".svg"] {
    width: 100%;
}
/* 2 */
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    img[src$=".svg"] {
        width: 100%;
    }
}
```

Also, if you're working with SVG graphics, note that Firefox does not support SVG fonts. In Illustrator, when you do a Save As with your AI file and choose SVG, to preserve your fonts, in the Font section, select "Convert to outline" as the Type (don't choose SVG in the Font section).

Also, remove the check box for "Use textpath element for text on a path". And select "Embed" rather than "Link."
