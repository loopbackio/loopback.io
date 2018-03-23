# loopback.io

LoopBack community site, http://loopback.io.  This website now includes the LoopBack documentation.

NOTE: The website is served from the `gh-pages` branch.

This repository is provided under the [MIT License](LICENSE).

##  Setup

To preview the website locally:

1. Install [Ruby and Bundler](https://help.github.com/articles/setting-up-your-pages-site-locally-with-jekyll/) if you don't have them already.

2. Clone this repo (you might use the SSH URL instead of HTTPS).:
```
git clone https://github.com/strongloop/loopback.io.git
```
3. `cd` to the repository directory and run the following command:
```
$ cd loopback.io
$ bundle install
```

Bundler will look in the Gemfile for which gems to install. The `github-pages` gem includes the same version of Jekyll and other dependencies as used by GitHub Pages, so that your local setup mirrors GitHub Pages as closely as possible.

## Run and view site locally

Run Jekyll using the following command:

```
$ npm start
```

Then, load [http://localhost:4001/](http://localhost:4001/) on your browser.

NOTE:  The docs part will be at [http://localhost:4001/doc](http://localhost:4001/doc).  It's not yet linked from the main "overview" part of the site, but will be once we launch (RSN).

## Formatting

Jekyll uses a variant of Markdown known as [Kramdown](http://kramdown.gettalong.org/quickref.html).

Jekyll uses the [Liquid template engine](http://liquidmarkup.org/) for templating.

## Incorporating external READMEs

The documentation incorporates README files from a number of LoopBack example repositories.
We use the [get-readmes](https://github.com/strongloop/get-readmes) utility to fetch
the README files directly from GitHub.  Here is how to update the READMEs

1. `npm install` (*first time/setup only*)
2. `npm run fetch-readmes`

From there, the README markdown files are incorporated into documentation articles
using the standard Jekyll "include" syntax as follows (for example):

```
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

We use a node script `update-lb4-docs` to copy over contents from loopback-next
repository using `@loopback/docs` package. The script is responsible for copying
over the markdown documentation and related tables, as well as the sidebar used
for LoopBack 4 content. The changes are then picked up as part of Travis CI's
builds along with README update scripts and deployed to GitHub Pages once
successful. If you'd like to make documentation changes for LoopBack 4, please
do so on its own [repository](https://github.com/strongloop/loopback-next/).

### Linting Readmes

There is an additional `npm script` that "lints" the readmes for markdown formatting problems. It is currently "experimental", see [this issue](https://github.com/strongloop/loopback.io/issues/49#issuecomment-253672668) for more info.

You can run this script thus:

```js
$ npm run lint-readmes
```
