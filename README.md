loopback.io
===========

LoopBack community mini-site, http://loopback.io.

NOTE: The website is served from the `gh-pages` branch.

##How to run the site locally

###Get `serve` module if you don't already have it:

   ```$ npm install -g serve```

###Clone the repo:

```
$ git clone -b gh-pages https://github.com/strongloop/loopback.io.git 
$ cd loopback.io
```

###Run:

```
$ serve .
serving /<path>/loopback.io on port 3000
```

To run on a different port:

```
$ serve -p 3001 .
```

###View site:

Load http://localhost:3000 to view the site.
