---
title: "Storage component REST API"
lang: en
layout: navgroup
navgroup: storage
toc_level: 1
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Storage-component-REST-API.html
summary: The LoopBack storage component enables you to upload and download files to cloud storage providers and the local (server) file system.  It has Node.js and REST APIs.
---

## List containers

List all containers for the current storage provider. 

`GET /api/containers`

### Arguments

None.

## Get container information

Get information about specified container.

`GET /api/containers/<container-name>`

### Arguments

* `<container-name>` - name of container for which to return information.

## Create container

Create a new container with the current storage provider.

`POST /api/containers`

### Arguments

Container specification in POST body.

## Delete container

Delete the specified container.

`DELETE /api/containers/<container-name>`

### Arguments

* `<container-name>` - name of container to delete.

## List files in container

List all files within a given container by name.

`GET /api/containers/<container-name>/files`

### Arguments

* `<container-name>` - name of container for which to list files.

## Get file information

Get information for a file within a given container by name

`GET /api/containers/<container-name>/files/file-name`

### Arguments

* `<container-name>` - name of container.
* file-name - name of file for which to get information.

## Delete file

Delete specified file within specified container.

`DELETE /api/containers/container-name/files/file-name`

### Arguments

* `<container-name>` - name of container.
* file-name - name of file to delete.

## Upload files

Upload one or more files into the given container by name.
The request body should use [multipart/form-data](https://www.ietf.org/rfc/rfc2388.txt) which the file input type for HTML uses.

`POST /api/containers/container-name/upload`

### Arguments

* `<container-name>` - name of container to which to upload files.

## Download file

Download specified file within specified container.

`GET /api/containers/container-name/download/file-name`

### Arguments

* `<container-name>` - name of container from which to download file.
* file-name - name of file to download.
