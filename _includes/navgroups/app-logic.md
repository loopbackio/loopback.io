{% capture navgroup_content %}
  {% unless page.permalink contains 'Remote-hooks.html' %}
* [Remote hooks](Remote-hooks.html)
  {% endunless %}{% unless page.permalink contains 'Remote-methods.html' %}
* [Remote methods](Remote-methods.html)
  {% endunless %}{% unless page.permalink contains 'Operation-hooks.html' %}
* [Operation hooks](Operation-hooks.html)
  {% endunless %}{% unless page.permalink contains 'Connector-hooks.html' %}
* [Connector hooks](Connector-hooks.html)
  {% endunless %}{% unless page.permalink contains 'Tutorial-Adding-application-logic.html' %}
* [Tutorial: Adding application logic](Tutorial-Adding-application-logic.html)
{% assign page.readme = false %}
  {% endunless %}
{% endcapture %}

{% include see-also.html content=navgroup_content %}
