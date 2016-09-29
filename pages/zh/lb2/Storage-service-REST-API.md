---
title: "Storage service REST API"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Storage-service-REST-API.html
summary:
---



## List containers

List all containers for the current storage provider.

`GET /api/containers`

### Arguments

None.

## Get container information

Get information about specified container.

`GET /api/containers/_container-name_`

### Arguments

*   _container-name_ - name of container for which to return information.

## Create container

Create a new container with the current storage provider.

`POST /api/containers`

### Arguments

Container specification in POST body.

## Delete container

Delete the specified container.

`DELETE /api/containers/_container-name_`

### Arguments

*   _container-name_ - name of container to delete.

## List files in container

List all files within a given container by name.

`GET /api/containers/_container-name_/files`

### Arguments

*   _container-name_ - name of container for which to list files.

## Get file information

Get information for a file within a given container by name

`GET /api/containers/_container-name_/files/_file-name_`

### Arguments

*   _container-name_ - name of container.
*   file-name - name of file for which to get information.

## Delete file

Delete specified file within specified container.

`DELETE /api/containers/_container-name_/files/_file-name_`

### Arguments

*   _container-name_ - name of container.
*   file-name - name of file to delete.

## Upload files

Upload one or more files into the given container by name. The request body should use [multipart/form-data](https://www.ietf.org/rfc/rfc2388.txt) which the file input type for HTML uses.

`POST /api/containers/_container-name_/upload`

### Arguments

*   _container-name_ - name of container to which to upload files.

## Download file

Download specified file within specified container.

`GET /api/containers/_container-name_/download/_file-name_`

### Arguments

*   _container-name_ - name of container from which to download file.
*   file-name - name of file to download.
