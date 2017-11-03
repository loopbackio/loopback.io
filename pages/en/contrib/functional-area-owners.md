---
title: Functional area owners
lang: en
tags: [contributing]
keywords:
summary: "List of who oversees each functional area of Loopback"
sidebar: contrib_sidebar
permalink: /doc/en/contrib/functional-area-owners.html
redirect_from:
- /fa-owner/
- /fa-owners/
- /functional-area-owner/
- /functional-area-owners/
---

**Missing ownership for strong-error handler, strong-docs, apidocs-strongloop.com**

{%include note.html content= "Data for this table is from [fa-owners.yml](https://github.com/strongloop/loopback.io/tree/gh-pages/_data/fa-owners.yml).
" %}

{% for category in site.data.fa-owners %}
  <h2>{{category[0]}}</h2>

  <table width="930" border="1">
  <thead><tr>
    <th width="170">GitHub Label</th>
    <th width="150">Owner</th>
    <th width="300">Repo(s)</th>
    <th width="180">SME(s)</th>
    <th width="130">Community maintainers</th>

  </tr></thead>
  <tbody>
    {% for fa in category[1] %}
      {% if category[0] != fa.area %}
        <tr><td colspan="5" style="margin: 0; background-color: #ddd; font-weight: bold; text-align: center;"> {{ fa.area }} </td></tr>
      {% endif %}
      <tr>
        <td> {{fa.label}}</td>
        <td> {% include show-links.html type='team' list=fa.owner %} </td>
        <td>
            {% include show-links.html type='repo' list=fa.repos %}
            {% include show-links.html type='file' list=fa.files %}
        </td>
        <td> {% include show-links.html type='person' list=fa.smes %} </td>
        <td> {% include show-links.html type='person' list=fa.community %} </td>
      </tr>
    {% endfor %}
  </tbody>
  </table>

{% endfor %}
