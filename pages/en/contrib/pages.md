---
title: Authoring Pages
lang: en
tags: [contributing]
keywords: pages, authoring, exclusion, frontmatter
summary: "This theme primarily uses pages. You need to make sure your pages have the appropriate frontmatter. One frontmatter tag your users might find helpful is the summary tag. This functions similar in purpose to the shortdesc element in DITA."
sidebar: contrib_sidebar
permalink: /doc/en/contrib/pages.html
---

## How to author content
Use a text editor such as Sublime Text, WebStorm, IntelliJ, or Atom to create pages. Atom is recommended because it's created by Github, which is driving some of the Jekyll development through Github Pages.

## Where pages are kept

Some of the documentation is in the `/pages` folder under the `loopback.io` repository.  In that folder, English documentation is in `en`, and other languages are in folders with the name of the ISO language code (for example, `fr` for French).

Under English, the sub-folders are:

- `lb2` - LoopBack 2.x
- `lb3` - LoopBack 3.0
- `lb4` - LoopBack 4
- `contrib` - Information on contributing to the project, published at [http://loopback.io/doc/en/contrib/](http://loopback.io/doc/en/contrib/).
- `community` - Area where community members can put information about their LoopBack-related projects.

However, for LoopBack 4, the documentation is sourced from the [`/docs/site`](https://github.com/strongloop/loopback-next/tree/master/docs/site) folder in the [`loopback-next`](https://github.com/strongloop/loopback-next) repository. 

### Overview content

The site includes some non-documentation "technical overview" information that
pre-dates the move of the documentation to the site.  For the most part, we don't expect community
members to edit this information, though anyone is welcome to report inaccuracies or problems.
This content includes:

- The home page, `index.html`
- Other "overview" content pages:
  - `contributing/index.html`
  - `examples/index.html`
  - `getting-started/index.html`
  - `resources/index.html`
  - `users/index.html`
- Overview layout in `_layouts/overview.html`
- Include files in `_includes/overview/`

## Frontmatter

Make sure each page has frontmatter at the top like this:

```yaml
---
title: Alerts
tags: [formatting]
keywords: notes, tips, cautions, warnings, admonitions

summary: "You can insert notes, tips, warnings, and important alerts in your content."
sidebar: contrib_sidebar
permalink: /doc/en/contrib/alerts.html
---
```

Front matter is always formatted with three hyphens at the top and bottom. Your front matter must have a `title` and `permalink` value. All the other values are optional.

Note that you cannot use variables in front matter.

The following table describes each of the front matter that you can use with this theme:

| Frontmatter | Required? | Description |
|-------------|-------------|-------------|
| **title** | Required | The title for the page |
| **tags** | Optional | Tags for the page. Make all tags single words, with underscores if needed (rather than spaces). Separate them with commas. Enclose the whole list within brackets. Also, note that tags must be added to `_data/tags_doc.yml` to be allowed entrance into the page. This prevents tags from becoming somewhat random and unstructured. You must create a tag page for each one of your tags following the pattern shown in the tags folder. (Tag pages aren't automatically created.)  |
| **keywords** | Optional | Synonyms and other keywords for the page. This information gets stuffed into the page's metadata to increase SEO. The user won't see the keywords, but if you search for one of the keywords, it will be picked up by the search engine.  |
| **last_updated**  | Optional | The date the page was last updated. This information could helpful for readers trying to evaluate how current and authoritative information is. If included, the last_updated date appears in the footer of the page in rather small font.|
| **summary** | Optional | A 1-2 word sentence summarizing the content on the page. This gets formatted into the summary section in the page layout. Adding summaries is a key way to make your content more scannable by users (check out [Jakob Nielsen's site](http://www.nngroup.com/articles/corporate-blogs-front-page-structure/) for a great example of page summaries.) The only drawback with summaries is that you can't use variables in them. |
| **permalink**| Required | The permalink *must* match the filename in order for automated links to work. Additionally, you must include the ".html" in the filename. Do not put forward slashes around the permalink (this makes Jekyll put the file inside a folder in the output). When Jekyll builds the site, it will put the page into the root directory rather than leaving it in a subdirectory or putting it inside a folder and naming the file index.html. Having all files flattened in the root directory is essential for relative linking to work and for all paths to JS and CSS files to be valid. <br/> **NOTE**: For LoopBack, we've changed this to use subdirectories, and adjusted how the CSS and JS files are referred to so it works correctly, regardless of how many subdirectories you use.|
| **datatable** | Optional | 'true'. If you add `datatable: true` in the frontmatter, scripts for the [jQuery Datatables plugin](https://www.datatables.net/) get included on the page. You can see the scripts that conditionally appear by looking in the `_layouts/default.html` page. |
| **toc** | Optional | If you specify `toc: false` in the frontmatter, the page won't have the table of contents that appears below the title. The toc refers to the list of jump links below the page title, not the sidebar navigation. You probably want to hide the TOC on the homepage and product landing pages.|

## Colons in page titles

If you want to use a colon in your page title, you must enclose the title's value in quotation marks.

## Page names and excluding files from outputs

By default, everything in your project is included in the output. To exclude files that don't belong to that project, specify the file name, the folder name, or use wildcards in the `_config.yml` configuration file:

```yaml
exclude:

- filename.md
- subfolder_name/
- mydoc_*
- gitignore
```

Wildcards will exclude every match after the `*`.

## Saving pages as drafts

If you add `published: false` in the front matter, your page won't be published. You can also move draft pages into the `_drafts` folder to exclude them from the build. With posts, you can also keep them as drafts by omitting the date in the title.

## Markdown or HTML format

Pages can be either Markdown or HTML format (specified through either an `.md` or `.html` file extension).

If you use Markdown, you can also include HTML formatting where needed. But if you're format is HTML, you must add a `markdown="1"` attribute to the element in order to use Markdown inside that HTML element:

```
<div markdown="1">This is a [link](http://exmaple.com).</div>
```

For your Markdown files, note that a space or two indent will set text off as code or blocks, so avoid spacing indents unless intentional.

If you have a lot of HTML, as long as the top and bottom tags of the HTML are flush left in a Markdown file, all the tags inside those bookend HTML tags will render as HTML, regardless of their indentation. (This can be especially useful for tables.)

## Kramdown Markdown

This theme uses [kramdown markdown](http://kramdown.gettalong.org/).

This mostly aligns with Github-flavored Markdown, with a few differences.

The configuration file shows the Markdown processor and extension:

```yaml
highlighter: rouge
markdown: kramdown
kramdown:
 input: GFM
 auto_ids: true
 hard_wrap: false
 syntax_highlighter: rouge
```

### List item formatting

Kramdown requires you to line up the indent between list items with the first starting character after the space in your list item numbering.

The spacing of the intercepting text must align with the spacing of the first character after the space of a numbered list item. Basically, with your list item numbering, use two spaces after the dot in the number, like this:

```
1.  First item
2.  Second item
3.  Third item
```

See this [blog post on Kramdown and Rouge](http://idratherbewriting.com/2016/02/21/bug-with-kramdown-and-rouge-with-github-pages/) for more details.

When you want to insert paragraphs, notes, code snippets, or other matter in between the list items, use four spaces to indent. The four spaces will line up with the first letter of the list item (the <b>F</b>irst or <b>S</b>econd or <b>T</b>hird).

```
1.  First item

    ```
    alert("hello");
    ```

2.  Second item

    Some pig!

3.  Third item
```

You can use standard Multi-markdown syntax for tables. You can also use fenced code blocks with lexers specifying the type of code.

## Automatic mini-TOCs

By default, a TOC appears at the top of your pages and posts. If you don't want the TOC to appear for a specific page, such as for a landing page or other homepage, add `toc: false` in the front matter of the page.

The mini-TOC requires you to use the `##` Markdown syntax for headings. If you use `<h2>` elements, you must add an ID attribute for the heading element in order for it to appear in the mini-TOC (for example, `<h2 id="mysampleid">Heading</h2>`.

By default, the table of contents will include all heading levels.  To limit the level of  headings included, use either the `toc_level` property in page frontmatter or, if using the `{% raw %}{% include toc.html %}{% endraw %}` include directly, use the `level` property.  

For example, to display _only_ top-level headings (head2s or `##` headings), use:

- `toc_level: 1` in frontmatter
- `{% raw %}{% include toc.html level=1 %}{% endraw %}` inline

In both cases, the level can be from 1 to 4.

## Headings

Use pound signs before the heading title to designate the level. Note that kramdown requires headings to have one space before and after the heading. Without this space above and below, the heading won't render into HTML.

Since the page title is considered the "top-level" heading, highest-level headings in a page are "second-level" headings.

```
## Second-level heading
```

**Result:**

## Second-level heading

-----

```
### Third-level heading
```
**Result:**

### Third-level heading

------

```
#### Fourth-level heading
```

**Result:**

#### Fourth-level heading

## Headings with ID Tags {#someIdTag}

If you want to use a specific ID tag with your heading, add it like this:

```
## Headings with ID Tags {#someIdTag}
```

Then you can reference it with a link like this on the same page:

```
[Some link](#someIdTag)
```

**Result:**

[Some link](#someIdTag)

## Specify a particular page layout

The default layout for pages is "page" layout.

To specify a different layout, use the `layout` property in the page's frontmatter.

## Comments

Disqus, a commenting system, is integrated into the theme. In the configuration file, specify the Disqus code for the universal code, and Disqus will appear. If you don't add a Disqus value, the Disqus form isn't included.

{% include note.html content= "The site is not currently using Disqus.
" %}
