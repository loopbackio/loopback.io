---
title: "Database connectors"
lang: zh
layout: page
keywords: LoopBack
tags:
sidebar: zh_lb2_sidebar
permalink: /doc/zh/lb2/Database-connectors.html
summary:
---

*   [Memory connector](/doc/{{page.lang}}/lb2/Memory-connector.html)
*   [MongoDB connector](/doc/{{page.lang}}/lb2/MongoDB-connector.html)
*   [MySQL connector](/doc/{{page.lang}}/lb2/MySQL-connector.html)
*   [Oracle connector](/doc/{{page.lang}}/lb2/Oracle-connector.html)
*   [PostgreSQL connector](/doc/{{page.lang}}/lb2/PostgreSQL-connector.html)
*   [Redis connector](/doc/{{page.lang}}/lb2/Redis-connector.html)
*   [SQL Server connector](/doc/{{page.lang}}/lb2/SQL-Server-connector.html)

LoopBack provides connectors for popular databases, including relational and NoSQL ones. These connectors implement CRUD operations as a common set of methods defined in [PersistedModel](/doc/{{page.lang}}/lb2/PersistedModel-class.html). When a model is attached to a data source backed by one of the database connectors, the methods from the PersistedModel are added to the model class. We sometimes call such models as persisted models. The data access methods on a persisted model are exposed to REST by default. Please see [PersistedModel REST API](/doc/{{page.lang}}/lb2/PersistedModel-REST-API.html) for the available endpoints.

Persisted models can be connected using relations to provide navigation and aggregation of a data graph formed by related model data. For more information about relations, see [Creating model relations](http://docs.strongloop.com/display/LB/Creating+model+relations). Please note relations are only supported for persisted models.
