---
title: "Security advisories"
lang: en
layout: page
toc: false
keywords: LoopBack
tags:
sidebar: home_sidebar
permalink: /doc/en/sec/Security-advisories.html
summary:
---

These are important advisories about known security issues:

{% include list-children.html in=site.data.sidebars.home_sidebar %}

{% include important.html content="
Some advisories may require action on your part, for example to upgrade certain packages.
" %}

## How to report a security issue

If you think you have discovered a new security issue with any StrongLoop package, please do not report it on GitHub.  Instead, send an email to [reachsl@us.ibm.com](mailto:reachsl@us.ibm.com) with a full description and steps to reproduce.

## Resources

The security advisories are accessible as human-readable HTML files and <a href="https://docs.oasis-open.org/csaf/csaf/v2.0/cs01/csaf-v2.0-cs01.html">OASIS <abbr title="Common Security Advisory Framework Version">CSAF</abbr> 2.0</a> documents.

### OASIS CSAF 2.0

OASIS CSAF 2.0 is the latest specification to "standardize existing practice in structured machine-readable vulnerability-related advisories". LoopBack takes on the role of a CSAF Publisher, and provides the following resources:

- Freely-accessible, valid, <abbr title="Traffic Light Protocol">TLP</abbr>:WHITE CSAF documents with valid filenames over <abbr title="Transport Layer Security">TLS</abbr> only (Requirement 1, 2, 3, 4)

The following resources are NOT available yet but are planned:

- HTTP Header-based redirection, if needed (Requirement 6)
- `provider-metadata.json` with <a href="https://loopback.io/.well-known/csaf/provider-metadata.json">well-known</a> URL (Requirement 7, 9)
- `https://csaf.data.security.loopback.io` web server (Requirement 10)
- Valid <abbr title="Resource-Oriented Lightweight Information Exchange">ROLIE</abbr> feed document (TLP:WHITE) (Requirement 15)
- Valid ROLIE service document (Requirement 16)
- Valid ROLIE category document (Requirement 17)
- CSAF document hash file (Requirement 18)
- CSAF document detached OpenPGP signatures (Requirement 19)
- Public PGP key (Requirement 20)

Other CSAF 2.0 resources not mentioned above are NOT available with no plans for adoption.
