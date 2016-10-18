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

Available connectors:

* [Cloudant connector](Cloudant-connector.html)
* [DashDB](DashDB.html)
* [DB2 connector](DB2-connector.html)
* [DB2 for z/OS](DB2-for-z-OS.html)
* [Informix](Informix.html)
* [Memory connector](Memory-connector.html)
* [MongoDB connector](MongoDB-connector.html)
* [MySQL connector](MySQL-connector.html)
* [Oracle connector](Oracle-connector.html)
* [PostgreSQL connector](PostgreSQL-connector.html)
* [Redis connector](Redis-connector.html)
* [SQL Server connector](SQL-Server-connector.html)
* [SQLite3](SQLite3.html)
