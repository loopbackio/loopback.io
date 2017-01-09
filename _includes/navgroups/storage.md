{% capture navgroup_content %}
  {% unless page.permalink contains 'Storage-connector.html' %}
* [Storage connector](Storage-connector.html)
{% endunless %}{% unless page.permalink contains 'Storage-component.html' %}
* [Storage component](Storage-component.html)
  {% endunless %}{% unless page.permalink contains 'Storage-component-REST-API.html' %}
* [Storage component REST API](Storage-component-REST-API.html)
{% endunless %}
* [Storage component API docs](https://apidocs.strongloop.com/loopback-component-storage/)
  {% assign page.readme = false %}
{% endcapture %}

{% include see-also.html content=navgroup_content %}
