---
title: "Database connectors overview"
lang: en
keywords: LoopBack
tags: [data_sources]
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Database-connectors.html
summary: LoopBack provides connectors for popular relational and NoSQL databases.
---

LoopBack database connectors implement create, retrieve, update, and delete operations as a common set of methods of
[PersistedModel](https://apidocs.strongloop.com/loopback/#persistedmodel).
When you attach a model to a data source backed by one of the database connectors, the model automatically acquires the create, retrieve, update, and delete methods from  PersistedModel. 
The data access methods on a persisted model are exposed to REST by default; see 
[PersistedModel REST API](PersistedModel-REST-API.html) for the endpoints.

You can connect models using relations to reflect relationships among data. For more information about relations, see 
[Creating model relations](Creating-model-relations.html).

There are officially-supported connectors for the following databases:

* [Cloudant](Cloudant-connector.html)
* [DashDB](DashDB.html)
* [DB2](DB2-connector.html)
* [DB2 for iSeries](DB2-iSeries-connector.html)
* [DB2 for z/OS](DB2-for-z-OS.html)
* [Informix](Informix.html)
* [MongoDB](MongoDB-connector.html)
* [MySQL](MySQL-connector.html)
* [Oracle](Oracle-connector.html)
* [PostgreSQL](PostgreSQL-connector.html)
* [Redis](Redis-connector.html)
* [SQL Server](SQL-Server-connector.html)
* [SQLite3](SQLite3.html)
