---
title: README guidelines
lang: en
keywords: READMEs, LoopBack
tags: [contributing]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/README-guidelines.html
summary: LoopBack documentation incorporates READMEs from many different repositories. Here are some basic guidelines for writing a README.
---
## Overview

A package's README page is displayed in GitHub, and, if the package is published to npm, also on npmjs.com.  Additionally, the LoopBack documentation incorporates many READMEs, including example
apps, LoopBack data source connector packages, LoopBack components, and so on.

The README should:

- Explain the purpose of the module and how to use it.
- Promote SEO and other mind-share.  
- Encourage community OS contributions and participation

For modules that can used "standalone", the README should provide information on how to use the module.  For modules that are also (or only) within the larger context of LoopBack, the README
can link to other documentation that describes how it is used.

Normally, the README should not be more than a few screens long.  If you need to provide additional information, create a `docs` directory containing additional markdown files with further details.

### Adding a table of contents

For READMEs longer than a few screens, it's often useful to add a table of contents.
One easy way to do this is with [doctoc](https://www.npmjs.com/package/doctoc), a simple command-line tool that adds a linked TOC.  

If your README has its own table of contents, then you should suppress the automatically-generated page TOC when the README is incorporated into the documentation (as explained below).  To do this, set `toc: false` in the page front-matter, for example:

```
title: "SOAP client and server (strong-soap)"
lang: en
layout: readme
toc: false
...
```

## Using READMEs in documentation

As explained in [Including READMEs](Including-READMEs.html), the LoopBack documentation
incorporates READMEs of LoopBack-related repositories.  For this reason, you need
to follow some additional guidelines:

- Follow the [markdown style guide](Markdown-style-guide.html) to ensure the markdown lays out
properly on the doc site as well as in GitHub and npmjs.com.
- **Use only absolute URLS in links**.  DO NOT USE RELATIVE URLs: they won't work in the docs or on npmjs.com.  
- In general, keep in mind that the content may appear in the docs as well as in GitHub.

### Hiding content from the docs

To display content _only_ in GitHub, use HTML and enclose the content in a `<p class="gh-only">...</p>` tag.  The doc site has CSS to hide this content.  This is handy, for example, to hide the "see also" link to the docs, or other content that wouldn't make sense in the docs.

For example:

```
<p class="gh-only">
For more information, see the <a href="http://loopback.io/doc/en/lb2/Cloudant-connector">LoopBack documentation</a>.
</p>
```
Note that you can't use markdown inside such a `div` tag, only HTML.

## Organization

The top-level of the README should be the name of the repository; for example:

```
# loopback-foo-bar
```

Remaining headers should be second-level (`##`) and so on.


The README should have the following sections:

### Summary

A one-sentence description of what the module does.  This should be the same as the npmjs.org blurb (which comes from the description property of package.json).  Since npm doesn't handle markdown for the blurb, avoid using markdown in the summary sentence.

### Overview

 A paragraph with more high-level information on what the module does, what problems it solves, why one would use it and how, etc.  For larger modules, this would include a bullet-list of features.  

### Installation

Typically this is just:

```
npm install module-name
```

But include any other steps or requirements.

### Basic use

{% include tip.html content='This section is often titled "Usage," but we prefer
"Use" because it is a shorter and more common word, and means the same thing.
' %}

- Focus should be on using the module on its own, independently of other modules.  StrongLoop documentation will describe how to use it with other modules (as part of the larger framework).
- Start with a very simple example in the README, then link to further examples in the `/examples` directory, if provided.  
- Briefly explain the most common use cases.

### API documentation

As applicable, include documentation of the package's API.  If the API
documentation is included elsewhere (the LoopBack docs or the API documentation site), then omit it from the README.

### Related resources (optional)

Link to other docs, relevant blog posts, other relevant modules.

### Contributions

Information relevant to contributors, including any specific steps needed to setup the development and test environment.  Link to a common document such as https://github.com/strongloop/loopback/blob/master/CONTRIBUTING.md.  

Suggested blurb:

> IBM/StrongLoop is an active supporter of open source and welcomes contributions to our projects as well as those of the Node.js community in general. For more information on how to contribute please refer to the [Contribution Guide](https://github.com/strongloop/loopback/blob/master/CONTRIBUTING.md).

### Tests

What tests are included; how to run them. The convention for running tests is `npm test`.  All our projects should follow this convention.

### Contributors

Names of module "owners" and other developers who have contributed.

### License

Link to the license, with a short description of what it is (i.e. "MIT License", "StrongLoop License", "Dual License", etc.)
