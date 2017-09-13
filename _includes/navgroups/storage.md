{% capture navgroup_content %}
  {% unless page.permalink contains 'Storage-connector.html' %}
* [Storage connector](Storage-connector.html)
{% endunless %}{% unless page.permalink contains 'Storage-component.html' %}
* [Storage component](Storage-component.html)
  {% endunless %}{% unless page.permalink contains 'Storage-component-REST-API.html' %}
* [Storage component REST API](Storage-component-REST-API.html)
{% endunless %}
* [Storage component API docs](https://apidocs.loopback.io/loopback-component-storage/)
* [Blog: Working with File Storage and LoopBack](https://strongloop.com/strongblog/working-with-file-storage-and-loopback/)
  {% assign page.readme = false %}
{% endcapture %}

{% include see-also.html content=navgroup_content %}
