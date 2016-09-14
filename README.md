# loopback.io

LoopBack community mini-site, http://loopback.io.

NOTE: The website is served from the `gh-pages` branch.

##  Setup

To preview the website locally:

1. Install [Ruby and Bundler](https://help.github.com/articles/setting-up-your-pages-site-locally-with-jekyll/) if you don't have them already.

2. Install the [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from) gem:
```
$ gem install jekyll-redirect-from
```

1. `cd` to the repository directory and run the following command:

```
$ cd loopback.io
$ bundle install
```

Bundler will look in the Gemfile for which gems to install. The `github-pages` gem includes the same version of Jekyll and other dependencies as used by GitHub Pages, so that your local setup mirrors GitHub Pages as closely as possible.

## Run and view site locally

Run Jekyll using the following command:

```
$ bundle exec jekyll serve
```

Then, load [http://localhost:4000/](http://localhost:4000/) on your browser.

NOTE:  The docs part will be at [http://localhost:4000/doc](http://localhost:4000/doc).  It's not yet linked from the main "overview" part of the site, but will be once we launch (RSN).

## Formatting

Jekyll uses a variant of Markdown known as [Kramdown](http://kramdown.gettalong.org/quickref.html).

Jekyll uses the [Liquid template engine](http://liquidmarkup.org/) for templating.

## Getting external READMEs

The documentation incorporates README files from a number of LoopBack example repositories.
We use the [get-readmes](https://github.com/strongloop/get-readmes) utility to fetch
the README files directly from GitHub.  Here is how to update the READMEs and save the result in the `_includes/readmes` directory (assuming you've cloned this repo already):

```
$ cd loopback.io
$ git clone https://github.com/strongloop/get-readmes.git
$ cd get-readmes
$ npm i
$ node get-readmes --repos=../_data --out=../_includes/readmes
```
From there, the README markdown files are incorporated into documentation articles
using the standard Jekyll "include" syntax.
