{% capture navgroup_content %}
  {% unless page.permalink contains 'Connecting-to-SOAP.html' %}
* [Connecting to SOAP web services](Connecting-to-SOAP.html)
  {% endunless %}{% unless page.permalink contains 'SOAP-generator.html' %}
* [SOAP generator](SOAP-generator.html)
  {% endunless %}{% unless page.permalink contains 'SOAP-connector.html' %}
* [SOAP connector](SOAP-connector.html)
  {% endunless %}{% unless page.permalink contains 'SOAP-connector-example.html' %}
* [SOAP example](SOAP-Connector-example.html)
  {% endunless %}
{% endcapture %}

{% include see-also.html content=navgroup_content %}
