# loopback.io

LoopBack community site and documentation, hosted on http://loopback.io.


## Setup

To preview the website locally:

1.  Install [Ruby and
    Bundler](https://help.github.com/articles/setting-up-your-pages-site-locally-with-jekyll/)
    if you don't have them already.

2.  Clone this repo (you might use the SSH URL instead of HTTPS).:

```sh
git clone https://github.com/loopbackio/loopback.io.git
```

3.  `cd` to the repository directory and run the following command:

```sh
cd loopback.io
bundle install
```

You may run into errors during `bundle install` due to compilation failure of
native gems. One such error is:

> An error occurred while installing eventmachine (1.2.7), and Bundler cannot
> continue.

To rectify these errors, install the necessary dependencies that provides the
missing compilers (g++) and devel files (Ruby). For Fedora 44:

```sh
sudo dnf install gcc-c++ ruby-devel
```


## Run and view site locally

Run Jekyll using the following command:

```
npm start
```

Then, load [http://localhost:4001/](http://localhost:4001/) on your browser.


## Formatting

Jekyll uses a variant of Markdown known as
[Kramdown](http://kramdown.gettalong.org/quickref.html).

Jekyll uses the [Liquid template engine](http://liquidmarkup.org/) for
templating.


## Incorporating external READMEs and Blog

The documentation incorporates README files from a number of LoopBack example
repositories, and blog posts from `loopbackio/loopback-blog`. The CI pipeline
will update these files automatically. However, updating these on a
local machine requires a few extra steps:

```sh
npm run fetch-readmes
npm run fetch-blog
```

From there, the README markdown files are incorporated into documentation
articles using the standard Jekyll "include" syntax as follows (for example):

```md
---
title: "Angular example app"
lang: en
layout: readme
source: loopback-example-angular
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Angular-example-app.html
summary: A brief tutorial on creating an Angular client app using the Loopback AngularJS SDK.
---

{% include readmes/loopback-example-angular.md %}
```

## Incorporating updates from loopback-next

LoopBack 4 docs are managed separately and imported via the `@loopback/docs`
NPM package (stored in: `loopback-next/docs`). These changes are pulled by the
build scripts and overrides any changes made to `pages/en/lb4`. Hence, do not
submit changes for that directory here. Instead, submit a PR to
[`loopback-next`](https://github.com/loopbackio/loopback-next/).

Updating these files are done automatically in the CI pipeline and on dev
machines viaa `postinstall` NPM script hook:

```sh
npm ci # This should be enough to sync LB4 docs
npm run postinstall # Alternatively...
```

### Linting Readmes

There is an additional that "lints" the readmes for markdown formatting
problems. It is currently "experimental", see [this
issue](https://github.com/loopbackio/loopback.io/issues/49#issuecomment-253672668)
for more info.

You can run this script thus:

```sh
npm run lint-readmes
```


## Contributing 

This project uses [DCO](https://developercertificate.org/). Be sure to sign off
your commits using the `-s` flag or adding `Signed-off-By: Name<Email>` in the
commit message.

**Example**

```sh
git commit -s -m "feat: my commit message"
```

Also see the [Contributing to LoopBack
documentation](https://loopback.io/doc/en/contrib/doc-contrib.html) to get you
started.

## License

This repository is provided under the [MIT License](LICENSE).
