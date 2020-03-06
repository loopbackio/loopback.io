# LoopBack Storage Component

**⚠️ LoopBack 3 is in Maintenance LTS mode, only critical bugs and critical
security fixes will be provided. (See
[Module Long Term Support Policy](#module-long-term-support-policy) below.)**

We urge all LoopBack 3 users to migrate their applications to LoopBack 4 as
soon as possible. Refer to our
[Migration Guide](https://loopback.io/doc/en/lb4/migration-overview.html)
for more information on how to upgrade.

## Overview

LoopBack storage component provides Node.js and REST APIs to manage binary file contents
using pluggable storage providers, such as local file systems, Amazon S3, or
Rackspace cloud files. It uses [pkgcloud](https://github.com/pkgcloud/pkgcloud) to support cloud-based
storage services including:

- Amazon
- Azure
- Google Cloud
- Openstack
- Rackspace

> Please see the [Storage Service Documentation](http://loopback.io/doc/en/lb3/Storage-component.html).

For more details on the architecture of the module, please see the introduction section of the [blog post](https://strongloop.com/strongblog/managing-nodejs-loopback-storage-service-provider/). 

## Examples

See https://github.com/strongloop/loopback-example-storage.

## Module Long Term Support Policy

This module adopts the [
Module Long Term Support (LTS)](http://github.com/CloudNativeJS/ModuleLTS) policy,
 with the following End Of Life (EOL) dates:

| Version | Status          | Published | EOL      |
| ------- | --------------- | --------- | -------- |
| 3.x     | Maintenance LTS | Dec 2016  | Dec 2020 |

Learn more about our LTS plan in [docs](https://loopback.io/doc/en/contrib/Long-term-support.html).
