{% capture navgroup_content %}
  {% unless page.title == 'Oracle connector' %}
  * [Oracle connector](Oracle-connector.html)
  {% endunless %}{% unless page.title == 'Oracle installer command' %}
  * [Oracle installer command](Oracle-installer-command.html)
  {% endunless %}{% unless page.title == 'Installing the Oracle connector' %}
  * [Installing the Oracle connector](Installing-the-Oracle-connector.html)
  {% endunless %}{% unless page.title == 'Oracle Connector Tutorial' %}
  * [Connecting to Oracle tutorial](Connecting-to-Oracle.html)
  {% endunless %}
{% endcapture %}

{% include see-also.html content=navgroup_content %}
