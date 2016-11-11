{% capture navgroup_content %}
  {% unless page.permalink contains 'Accessing-related-models.html' %}
* [Accessing related models](Accessing-related-models.html)
  {% endunless %}{% unless page.permalink contains 'Controlling-data-access.html' %}
* [Controlling data access](Controlling-data-access.html)
  {% endunless %}{% unless page.permalink contains 'Tutorial-access-control.html' %}
* [Tutorial access control](Tutorial-access-control.html)
    {% assign page.readme = false %}
  {% endunless %}
{% endcapture %}

{% include see-also.html content=navgroup_content %}
