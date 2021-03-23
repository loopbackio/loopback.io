{% capture navgroup_content %}
  {% unless page.permalink contains 'Creating-models.html' %}
* [Creating models](Creating-models.html)
  {% endunless %}{% unless page.permalink contains 'Customizing-models.html' %}
* [Customizing models](Customizing-models.html)
  {% endunless %}{% unless page.permalink contains 'Creating-model-relations.html' %}
* [Creating model relations](Creating-model-relations.html)
  {% endunless %}{% unless page.permalink contains 'Model-definition-JSON-file.html' %}
* [Model definition JSON file](Model-definition-JSON-file.html)
  {% endunless %}{% unless page.permalink contains 'PersistedModel-REST-API.html' %}
* [PersistedModel REST API](PersistedModel-REST-API.html)
  {% endunless %}
{% endcapture %}

{% include see-also.html content=navgroup_content %}
