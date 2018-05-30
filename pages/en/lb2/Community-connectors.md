---
title: "Community connectors"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Community-connectors.html
summary:
---

In addition to the connectors that StrongLoop provides and maintains, there are a number of connectors created by the open-source community.

{% include warning.html content="

IBM and StrongLoop do not support the connectors listed here; they are maintained by the LoopBack community and are listed here for convenience.

Please contact IBM/StrongLoop to request support for one of these connectors or to request an additional connector.

" %}

The following table lists some of the community connectors. See [npmjs.org](https://www.npmjs.org/search?q=loopback-connector) for a complete list.

{% include note.html content="

See also [https://github.com/pasindud/awesome-loopback](https://github.com/pasindud/awesome-loopback) for an extensive list of LoopBack community resources.

" %}

<table>
  <tbody>
    <tr>
      <th>Data source</th>
      <th>Connector</th>
      <th>Notes</th>
    </tr>
    <tr>
      <td><a href="http://couchdb.apache.org/" class="external-link" rel="nofollow">Apache CouchDB</a></td>
      <td><a href="https://www.npmjs.org/package/loopback-connector-couch" class="external-link" rel="nofollow">loopback-connector-couch</a></td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td><a href="http://kafka.apache.org/" class="external-link" rel="nofollow">Apache Kafka</a></td>
      <td><a href="https://www.npmjs.org/package/loopback-connector-kafka" class="external-link" rel="nofollow">loopback-connector-kafka</a></td>
      <td>Provided as option by <a href="Data-source-generator.html">data source generator</a>.</td>
    </tr>
    <tr>
      <td><a href="https://www.arangodb.com/" class="external-link" rel="nofollow">ArangoDB</a></td>
      <td><a href="https://www.npmjs.org/package/loopback-connector-arangodb" class="external-link" rel="nofollow">loopback-connector-arangodb</a></td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td><a href="http://www.couchbase.com/" class="external-link" rel="nofollow">Couchbase</a></td>
      <td><a href="https://github.com/guardly/loopback-connector-couchbase" class="external-link" rel="nofollow">loopback-connector-couchbase</a></td>
      <td>Example at <a href="https://github.com/guardly/loopback-example-couchbase" class="external-link" rel="nofollow">loopback-example-couchbase</a></td>
    </tr>
    <tr>
      <td><a href="http://www.elasticsearch.org/" class="external-link" rel="nofollow">Elasticsearch</a></td>
      <td><a href="https://www.npmjs.com/package/loopback-connector-es" class="external-link" rel="nofollow">loopback-connector-es</a></td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td><a href="https://mandrill.com/" class="external-link" rel="nofollow">Mandrill</a></td>
      <td><a href="https://www.npmjs.org/package/lb-connector-mandrill" class="external-link" rel="nofollow">lb-connector-mandrill</a></td>
      <td>Enables applications to send emails via Mandrill</td>
    </tr>
    <tr>
      <td><a href="http://neo4j.com/" class="external-link" rel="nofollow">Neo4j</a></td>
      <td><a href="https://www.npmjs.org/package/loopback-connector-neo4j" class="external-link" rel="nofollow">loopback-connector-neo4j</a></td>
      <td>
        <p><span>Provided as option by </span> <a href="Data-source-generator.html">data source generator</a><span>.</span></p>
        <p><span>NOTE: This connector has <a href="https://groups.google.com/forum/#!topic/loopbackjs/HONEM1S3CnU" class="external-link" rel="nofollow">known issues</a>.</span></p>
      </td>
    </tr>
    <tr>
      <td><a href="http://ravendb.net/" class="external-link" rel="nofollow">RavenDB</a></td>
      <td><a href="https://www.npmjs.org/package/loopback-connector-ravendb" class="external-link" rel="nofollow">loopback-connector-ravendb</a></td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td><a href="https://aws.amazon.com/redshift/" class="external-link" rel="nofollow">Redshift</a></td>
      <td><a href="https://www.npmjs.com/package/loopback-connector-redshift" class="external-link" rel="nofollow">loopback-connector-redshift</a></td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td><a href="http://basho.com/riak/" class="external-link" rel="nofollow">Riak</a></td>
      <td><a href="https://www.npmjs.com/package/loopback-connector-riak" class="external-link" rel="nofollow">loopback-connector-riak</a></td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td><a href="http://hana.sap.com/abouthana.html" class="external-link" rel="nofollow">SAP HANA</a></td>
      <td><a href="https://www.npmjs.org/package/loopback-connector-saphana" class="external-link" rel="nofollow">loopback-connector-saphana</a></td>
      <td><span>Provided as option by </span> <a href="Data-source-generator.html">data source generator</a><span>.</span></td>
    </tr>
    <tr>
      <td><a href="http://www.sqlite.org/" class="external-link" rel="nofollow">SQLite</a></td>
      <td><a href="https://github.com/Synerzip/loopback-connector-sqlite" class="external-link" rel="nofollow">loopback-connector-sqlite</a></td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td><a href="https://www.twilio.com/" class="external-link" rel="nofollow">Twilio</a></td>
      <td><a href="https://www.npmjs.com/package/loopback-connector-twilio" class="external-link" rel="nofollow">loopback-connector-twilio</a></td>
      <td><a href="https://github.com/dashby3000/loopback-connector-twilio/blob/master/example/example.js" class="external-link" rel="nofollow">Example</a> in GitHub.</td>
    </tr>
    <tr>
      <td><a href="https://www.nexmo.com/" class="external-link" rel="nofollow">Nexmo</a></td>
      <td><a href="https://www.npmjs.com/package/loopback-connector-nexmo" class="external-link" rel="nofollow">loopback-connector-nexmo</a></td>
      <td><a href="https://github.com/InteractiveObject/loopback-connector-nexmo/blob/master/example/example.js" class="external-link" rel="nofollow">Example</a> in GitHub.</td>
    </tr>
  </tbody>
</table>
