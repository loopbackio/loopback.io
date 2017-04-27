---
title: Contributing code
tags: [community, contributing]
keywords: LoopBack, open-source
summary: "This article explains the process and guidelines for contributing code to the LoopBack project."
sidebar: contrib_sidebar
permalink: /doc/en/contrib/code-contrib.html
---

## How to contribute to the code

You can contribute in a number of ways:

* [Report an issue](#reporting-an-issue).   Reporting it first will ensure that it is
  in fact an issue, and there is not already a fix in the works.
* After reporting a bug, go one step further and fix it.
* Ensure that your effort is aligned with the project's roadmap by
  talking to the maintainers, especially if you are going to spend a
  lot of time on it.
* Adhere to code style outlined in the [style guide](style-guide.html).
* Agree to the [Contributor License Agreement](#agreeing-to-the-cla).
* [Submit a pull request](#submitting-a-pull-request) through Github.
* Run tests; see [Running tests](#running-tests).

## Where to start

If you are looking to contribute, but aren't sure where to start, review open pull requests for the module.  For example: [LoopBack open pull requests](https://github.com/strongloop/loopback/pulls).

Also, please read the source code before contributing. If something is confusing, poorly documented, poorly commented, or could otherwise be improved: open a GitHub issue and link to the file and line of code with a useful description of what you would like to see or think is missing.

### LoopBack versions

LoopBack maintains a current version, a long-term support (LTS) version, and a maintenance version.  New features go into the current version; bug fixes can go into the LTS and maintenance versions, depending on the nature of the bug.  For more information, see [Long-term support](Long-term-support.html).

### Recommended Node.js version

{% include note.html content="Check your Node.js version with the command `node -v`.
" %}

LoopBack 2.x supports Node.js v0.10 and v0.12, but LoopBack 3.0 does not support Node.js v0.10 or v0.12.  For details, see the blog post [LoopBack Drops Support for Node 0.10 and 0.12](https://strongloop.com/strongblog/loopback-drops-support-for-node-0-10-and-0-12/).

## Submitting a pull request

Follow the [GitHub Flow](http://scottchacon.com/2011/08/31/github-flow.html).

 1. Create a GitHub issue for large changes and discuss the change there before
    coding. You can skip this step and submit the pull request for minor
    changes.
 1. Fork the repository on GitHub.
 1. Create a branch for you change/feature off of the master branch.
 1. Make your change. Remember to update tests as well as code! Always
    run all the tests to assure nothing else was accidentally broken. For bugs, adding a failing test and submitting a pull request usually leads to the bug being fixed quickly. For features, include tests that cover the entire feature. For remote / client facing features, include integration tests in the [loopback-example-app](](https://github.com/strongloop/loopback-example-app).
 1. Check for unnecessary whitespace with `git diff --check` before committing.
 1. Make commits of logical units and push them to Github.
 1. Use a descriptive commit message, and follow
    [50/72 format](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).
 1. Use GitHub's pull requests to submit the patch. Feel free to issue the pull
    request as soon as you have something partial to show and get reviewed.
    You can add more commits to your pull request as you are progressing
    on the implementation.  The title of the pull request should start
    with "WIP" for "work in progress" when the pull request is not complete
    yet.
 1. Request a code review. Add a specific committer to speed up this process. (for example, `@bajtos`, `@raymondfeng`).
 1. Make any requested changes and push to your fork. Make sure your changes are still based on the latest code (use `git rebase upstream/master`).

 ### How to rebase your branch ###

Our code base is always getting updated and being able to successfully rebase your PR is very important. Here are some simple steps to rebase your code:
- Checkout your branch which you are submitting the pull request against `git checkout <my_branch>`
- Add an upstream remote from your fork `git remote add upstream <upstream_repo>`
- Fetch the latest from the **_upstream_** remote `git fetch upstream`
- Rebase your code using the interactive mode `git rebase -i upstream/master`
- If you are happy with the changes and there are no merge conflicts, push the code to your remote branch `git push origin <my_branch>`

## Running tests

All LoopBack projects follow the same convention for running tests. To run a projects test suite, change to the project's directory and run:

```sh
npm test
```

If a test is failing, open an issue on the appropriate repositories GitHub issues page.

{% include content/cla.md %}
