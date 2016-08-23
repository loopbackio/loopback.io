---
title: "Database connectors"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Database-connectors.html
summary:
---

* [Cloudant connector](/doc/en/lb2/Cloudant-connector.html)
* [DashDB](/doc/en/lb2/DashDB.html)
* [DB2 connector](/doc/en/lb2/DB2-connector.html)
* [DB2 for z/OS](/doc/en/lb2/DB2-for-z-OS.html)
* [Informix](/doc/en/lb2/Informix.html)
* [Memory connector](/doc/en/lb2/Memory-connector.html)
* [MongoDB connector](/doc/en/lb2/MongoDB-connector.html)
* [MySQL connector](/doc/en/lb2/MySQL-connector.html)
* [Oracle connector](/doc/en/lb2/Oracle-connector.html)
* [PostgreSQL connector](/doc/en/lb2/PostgreSQL-connector.html)
* [Redis connector](/doc/en/lb2/Redis-connector.html)
* [SQL Server connector](/doc/en/lb2/SQL-Server-connector.html)
* [SQLite3](/doc/en/lb2/SQLite3.html)

LoopBack provides connectors for popular relational and NoSQL databases.
These connectors implement create, retrieve, update, and delete operations as a common set of methods of
[PersistedModel](https://apidocs.strongloop.com/loopback/#persistedmodel).
When you attach a model to a data source backed by one of the database connectors, the model automatically acquires the create, retrieve, update, and delete methods from  PersistedModel. 
The data access methods on a persisted model are exposed to REST by default; see 
[PersistedModel REST API](/doc/en/lb2/PersistedModel-REST-API.html) for the endpoints.

You can connect models using relations to reflect relationships among data. For more information about relations, see 
[Creating model relations](http://docs.strongloop.com/display/LB/Creating+model+relations).