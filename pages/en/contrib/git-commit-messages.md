---
title: Git Commit Message Guidelines
lang: en
tags: [contributing]
keywords:
summary: "Follow these guidelines for your Git commit messages."
sidebar: contrib_sidebar
permalink: /doc/en/contrib/git-commit-messages.html
---

## Commit messages

Summaries should be short (50 chars or less) and use normal sentence capitalization rules.

The full commit message can contain more detailed explanatory text, if necessary.  
Wrap it to about 72 characters or so.  In some contexts, the first line is treated as the
subject of an email and the rest of the text as the body.  The blank
line separating the summary from the body is critical (unless you omit
the body entirely); tools like rebase can get confused if you run the
two together.

## Style

Write your commit message in the imperative: "Fix bug" and not "Fixed bug"
or "Fixes bug."  This convention matches up with commit messages generated
by commands like git merge and git revert.

Further paragraphs come after blank lines.

- Bullet points are okay, too.

- Typically a hyphen or asterisk is used for the bullet, followed by a
  single space, with blank lines in between, but conventions vary here.

- Use a hanging indent.

See [A Note About Git Commit Messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
for additional information.
