---
title: "Installing the Oracle connector"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Installing-the-Oracle-connector.html
summary:
---

## Overview

To install the Oracle connector, use the following command:

```
$ npm install loopback-connector-oracle --save
```


The Oracle connector version 3.0.0 or above depends on the [oracledb](https://github.com/oracle/node-oracledb) module as the Node.js driver for Oracle databases.  Since `oracledb` is a [C++ add-on](http://nodejs.org/api/addons.html), the installation requires the presence of C++ development tools to compile and build the module from source code. At runtime, `oracledb` also requires dynamic libraries from [Oracle Database Instant Client](http://www.oracle.com/technetwork/database/features/instant-client/index.html).

The [LoopBack Oracle Installer](https://github.com/strongloop/loopback-oracle-installer) module takes care of the binary dependencies and simplifies the whole process. The installer automatically downloads and extracts the prebuilt `oracledb` to /loopback-connector-oracle/node_modules directory and Oracle Database Instant Client into `<UserHomeDirectory>/oracle-instant-client`. 
If a prebuilt bundle does not exist for your client platform and node version, the installer prompts the user to install oracle pre-requisites offline following instructions for their OS in https://github.com/oracle/node-oracledb/blob/master/INSTALL.md. 

Once oracle pre-requisites are installed, user needs to re install loopback-connector-oracle node module by executing 'npm install loopback-connector-oracle --save' which will internally execute 'npm install oracledb' installing oracledb node module successfully. 

Troubleshooting Tip: If you have problem installing loopback-connector-oracle make sure these env variables are set and these symbolic links exist. For e.g on OS X

``` 
export OCI_LIB_DIR=$HOME/oracle-instant-client 
export OCI_INC_DIR=$HOME/oracle-instant-client/sdk/include

If a prebuilt bundle does not exist for your client platform and node version, and you have installed 
oracle pre-requisites as per https://github.com/oracle/node-oracledb/blob/master/INSTALL.md then,

export OCI_LIB_DIR=/opt/oracle/instantclient
export OCI_INC_DIR=/opt/oracle/instantclient/sdk/include

```

```
libclntsh.dylib -> libclntsh.dylib.11.1
```


## Post installation setup

{% include warning.html content="

Before you run the application, you **MUST** configure the environment variable depending on the target platform to make sure the dynamic libraries
from Oracle Instant Client will be available to your Node process.

" %}

### MacOS X or Linux

Linux:

`export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:$HOME/oracle-instant-client"`

If a prebuilt bundle does not exist for your client platform and node version, and you have installed oracle pre-requisites as per https://github.com/oracle/node-oracledb/blob/master/INSTALL.md then

`export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:$OCI_LIB_DIR"`

### Linux

On Linux systems, the `libaio` library is required. If it is not present, you must install it as follows:

* On Ubuntu/Debian:
  ```shell
  $ sudo apt-get install libaio1
  ```
* On Fedora/CentOS/RHEL:
  ```shell
  $ sudo yum install libaio
  ```

### Windows

The change is made to the PATH environment variable for the logged in user. Please note the PATH setting will NOT be effective immediately.
You have to activate it using one of the methods below:

1.  Log off the current user session and log in.
2.  Open Control Panel --> System --> Advanced System Settings --> Environment Variables.
    Examine the Path under User variables, and click OK to activate it.
    You need to open a new Command Prompt. Please run 'path' command to verify.

## Installation from behind a proxy server

{% include important.html content="
This feature is supported by loopback-oracle-installer vesion 1.1.3 or later.
" %}

If your system is behind a corporate HTTP/HTTPS proxy to access the internet, you'll need to set the proxy for npm before running 'npm install'.

For example,

```shell
$ npm config set proxy http://proxy.mycompany.com:8080
$ npm config set https-proxy http://https-proxy.mycompany.com:8080
```

If the proxy url requires username/password, you can use the following syntax:

```shell
$ npm config set proxy http://youruser:yourpass@proxy.mycompany.com:8080
$ npm config set https-proxy http://youruser:yourpass@https-proxy.mycompany.com:8080
```

The proxy can also be set as part of the npm command as follows:

```shell
$ npm --proxy=http://proxy.mycompany.com:8080 install
$ npm --https-proxy=http://https-proxy.mycompany.com:8080 install
```

Please note that npm's default value for [proxy](https://www.npmjs.org/doc/misc/npm-config.html#proxy) is from the HTTP_PROXY or http_proxy environment variable.
And the default value for [https-proxy](https://www.npmjs.org/doc/misc/npm-config.html#https-proxy) 
is from the HTTPS_PROXY, https_proxy, HTTP_PROXY, or http_proxy environment variable.
So you can configure the proxy using environment variables too.

Linux or Mac:

```shell
HTTP_PROXY=http://proxy.mycompany.com:8080 npm install
```

Windows:


```shell
set HTTP_PROXY=http://proxy.mycompany.com:8080
npm install
```
