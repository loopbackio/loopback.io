---
title: Contributing code
lang: en
tags: [community, contributing, getting_started]
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

If you are looking to contribute, but aren't sure where to start, review open pull requests for the module.  For example, LoopBack open pull requests for [2.x and 3.x](https://github.com/strongloop/loopback/pulls) and that for [4.x](https://github.com/strongloop/loopback-next/pulls).

Also, please read the source code before contributing. If something is confusing, poorly documented, poorly commented, or could otherwise be improved: open a GitHub issue and link to the file and line of code with a useful description of what you would like to see or think is missing.

Another place to look is to find our issues on GitHub with `good first issue` tag.  See 
[good first issue in our repositories](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3A%22good+first+issue%22+user%3Astrongloop).

### LoopBack versions

LoopBack maintains a current version, a long-term support (LTS) version, and a maintenance version.  New features go into the current version; bug fixes can go into the active LTS and maintenance LTS versions, depending on the nature of the bug.  For more information, see [Long-term support](Long-term-support.html).

Note that we are no longer accepting features for LoopBack versions that are in either LTS versions.  If you are in doubt, please open an issue to discuss first with the maintainers before spending too much time on implementation.


## Submitting a pull request

Follow the [GitHub Flow](http://scottchacon.com/2011/08/31/github-flow.html).  If you are new to GitHub, it is recommended to take a look at this [Getting into open source for the first time article](https://www.nearform.com/blog/getting-into-open-source-for-the-first-time/).

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

### How to rebase your branch

Our code base is always getting updated and being able to successfully rebase your PR is very important. Here are some simple steps to rebase your code:
- Checkout your branch which you are submitting the pull request against `git checkout <my_branch>`
- Add an upstream remote from your fork `git remote add upstream <upstream_repo>`
- Fetch the latest from the **_upstream_** remote `git fetch upstream`
- Rebase your code using the interactive mode `git rebase -i upstream/master`
- If you are happy with the changes and there are no merge conflicts, push the code to your remote branch `git push --force-with-lease origin <my_branch>`

## Running tests

All LoopBack projects follow the same convention for running tests. To run a projects test suite, change to the project's directory and run:

```sh
npm test
```

## Create example repositories

If you create an example repository for any usage demo, the name of repository should follow the following convention:

`loopback{major_version}-example-{example_name}`

Usually the `{major_version}` is the latest major version under development.
If the example aims at a specific version of LoopBack, then use that number as the `{major_version}`.
The `{example_name}` is a few words which briefly describes the functionality of the example,
and joined with `-`.

For example, we build an example app for LoopBack 4 and name it as
[`loopback4-example-shopping`](https://github.com/strongloop/loopback4-example-shopping).

If a test is failing, open an issue on the appropriate repositories GitHub issues page.

{% include content/cla.md %}

## Additional information

Since LoopBack 2.x and 3.x have different codebase as LoopBack 4, there are some information that are specific to those versions.  Please see:
- [Contributing code to LoopBack 2.x and 3.x](code-contrib-lb2-lb3.html)
- [Contributing code to LoopBack 4](code-contrib-lb4.html)
