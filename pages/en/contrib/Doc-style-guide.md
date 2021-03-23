---
title: Documentation style guide
lang: en
keywords: LoopBack documentation
tags: [community, contributing]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/Doc-style-guide.html
summary: This style guide is intended to ensure that LoopBack documentation has a consistent, clear, and unified style.  It is intended to be prescriptive but not onerous and is open to community contribution and discussion.
---

## Headings

Use [sentence case](http://grammar.about.com/od/rs/g/Sentence-Case.htm) for headings. Always capitalize the first word; other words are capitalized if they would normally be capitalized in a sentence.

Page titles are rendered as heading1 tags. Therefore, use:

- `##` for top-level headings.
- `###` for the next level of sub-headings.
- **Heading4** for the next level.

Avoid using **Heading5** headings and lower as that generally presents too many levels of headings, and it's often better to reorganize. However, if you cannot avoid, there is no strict prohibition from using them.

## Formatting conventions

### File names, code literals, routes

Format the following items as `monospace` in the toolbar, so they are rendered inline in fixed-pitch font:

- File names and directory paths; for example `package.json`.
- Code elements when used inline, for example object names, function calls, and the like; for example `app.route()`.
- URLs and routes, for example `<span class="nolink">http://localhost:8000</span>` or `/birds/about`.

### Code samples

Put code samples longer than one line within a code block
enclosed by triple-backticks to provide syntax highlighting:

<pre>
```js
This is some JavaScript code.
```
</pre>

Yields:

```js
This is some JavaScript code.
```

### Lists

Use numbered lists _only_ when the order of the items is important; for example, the steps in a procedure:

1.  Step one.
2.  Step two.
3.  And so on.

Use bullet lists (unordered lists) for three or more items when the order is not significant; for example:

Lists:

- Are easier to read than big blocks of text.
- Make items stand out.
- Clearly identify parallel items.

Do not use bullets simply to start a regular paragraph.

Capitalize list items. End each item with a period only when ending a sentence, such as:

- In this example.
- In this other example.
- In this final example.

Never end a list item with a comma, semicolon, or colon.

### Notes, warnings, and information callouts

Use [alerts](alerts.html) to highlight text for notes, warnings, and so on.

## Spelling, grammar, and style

Use American spelling and grammar: "behavior" instead of "behaviour," "color" instead of "colour," and so on.

Collective nouns, such as corporations, are singular, not plural:

- CORRECT: IBM is a company that helps promote Node.js (standard American use).
- INCORRECT: IBM are a company that helps promote Node.js (standard British use).

In lists of three or more items, use the [serial comma](http://grammar.about.com/od/grammarfaq/f/QAoxfordcomma.htm).

Spell out acronyms and abbreviations upon first use, with the acronym in parenthesis. For example:

> This enables you to create a service-oriented architecture (SOA).

Do not use Latin abbreviations, which may not be understood by all readers. Instead use the English equivalent:

- Instead of "i.e." use "that is".
- Instead of "e.g." use "for example".
- Instead of "etc." use "and so on".

Put punctation inside quotation marks when they appear.

EXCEPTION: If the item within the quotes is a literal such as used in keystroke entry, or if the meaning would otherwise be unclear, put the comma outside of the quotation mark. For example:

> At the prompt enter "Y", then hit Enter.

### Capitalization

Capitalize proper nouns such as product and company names. Avoid gratuitous capitalization.

When product, tool, or names other names don't begin with a capital letter (npm, io.js, iPhone, eBay) capitalize them when starting a sentence. For example:

> Npm is the Node package manager, but apparently doesn't stand for "Node Package Manager."

When a sentence begins with something rendered in monospace font, don't capitalize it:

> `man` is the Linux command to display documentation "man pages."
