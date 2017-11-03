---
title: Getting started with Jekyll
lang: en
keywords: Jekyll
tags: [getting_started, contributing]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/jekyll_getting_started.html
summary: These brief instructions will help you get started quickly working with the docs. The other topics in this help provide additional information and detail about working with other aspects of this theme and Jekyll.
---

## Previewing the site

To preview the website locally:

1. Install [Ruby and Bundler](https://help.github.com/articles/setting-up-your-pages-site-locally-with-jekyll/) if you don't have them already.

1. `cd` to the repository directory and run the following command:

```
$ cd loopback.io
$ bundle install
```

Bundler will look in the Gemfile for which gems to install. The `github-pages` gem includes the same version of Jekyll and other dependencies as used by GitHub Pages, so that your local setup mirrors GitHub Pages as closely as possible.

### Running Jekyll and viewing the site locally

Run Jekyll using the following command:

```
$ bundle exec jekyll serve
```

Then, load [http://localhost:4001/](http://localhost:4001/) on your browser.

NOTE:  The docs part will be at [http://localhost:4001/doc](http://localhost:4001/doc).  

When you modify a content file while Jekyll is running, it will automatically regenerate the site
content.  You'll see a message in the console such as:

```
Regenerating: 1 file(s) changed at 2017-11-03 10:46:25 ...done in 1.913827 seconds.
```

{% include tip.html content="Use the `-i` option to run Jekyll in incremental mode,
which will make Jekyll rebuild only the files that have changed, rather than the whole site.
This makes rebuilding much quicker.   The full command is:

`bundle exec jekyll serve -i`
" %}

## Relative links and offline viewing

This theme uses relative links throughout so that you can view the site offline and not worry about which server or directory you're hosting it. It's common with tech docs to push content to an internal server for review prior to pushing the content to an external server for publication. Because of the need for seamless transference from one host to another, the site has to use relative links.

To view pages locally on your machine (without the Jekyll preview server), they need to have the `.html` extension. The `permalink` property in the page's frontmatter (without surrounding slashes) is what pushes the files into the root directory when the site builds.

## Page frontmatter

When you write pages, include these same frontmatter properties with each page:

```yaml
---
title: "Some title"
tags: [sample1, sample2]
keywords: keyword1, keyword2, keyword3

summary: "optional summary here"
sidebar: sidebarname
permalink: /doc/en/contrib/filename.html
---
```

(You will customize the values for each of these properties, of course.)

For titles, surrounding the title in quotes is optional, but if you have a colon in the title, you must surround the title with quotation marks. If you have a quotation mark inside the title, escape it first with a backlash `\`.

Values for `keywords` get populated into the metadata of the page for SEO.

Values for `tags` must be defined in your `_data/tags.yml` list. You also need a corresponding tag file inside the tags folder that follows the same pattern as the other tag files shown in the tags folder. (Jekyll won't auto-create these tag files.)

If you don't want the mini-TOC to show on a page (such as for the homepage or landing pages), add `toc: false` in the frontmatter.

The `permalink` value should be the same as your filename and include the ".html" file extension.

For more detail, see [Authoring pages](pages.html).

## Generating PDF

To generate PDF, you'll need a license for [Prince XML](http://www.princexml.com/). You will also need to [install Prince](http://www.princexml.com/doc/en/installing/).  You can generate PDFs by product (but not for every product on the site combined together into one massive PDF). Prince will work even without a license, but it will imprint a small Prince image on the first page, and you're supposed to buy the license to use it.

If you're on Windows, install [Git Bash client](https://git-for-windows.github.io/) rather than using the default Windows command prompt.

Open up the `css/printstyles.css` file and customize the email address (`youremail@domain.com`) that is listed there. This email address appears in the bottom left footer of the PDF output. You'll also need to create a PDF configuration file following the examples shown in the `pdfconfigs` folder, and also customize some build scripts following the same pattern shown in the root: `pdf-product1.sh`.

To accommodate the title page and table of contents in PDF outputs, each product sidebar must list these pages before any other:

```yaml
- title:
  output: pdf
  type: frontmatter
  folderitems:
  - title:
    url: /titlepage
    output: pdf
    type: frontmatter
  - title:
    url: /tocpage
    output: pdf
    type: frontmatter
```

Leave the output as `output: pdf` for these frontmatter pages so that they don't appear in the web output.
