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

## Formatting

Jekyll uses a variant of Markdown known as [Kramdown](http://kramdown.gettalong.org/quickref.html).

Jekyll uses the [Liquid template engine](http://liquidmarkup.org/) for templating.
