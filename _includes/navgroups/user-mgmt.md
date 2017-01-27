{% capture navgroup_content %}
  {% unless page.permalink contains 'Managing-users.html' %}
  * [Managing users](Managing-users.html)
  {% endunless %}{% unless page.permalink contains 'Authentication-authorization-and-permissions.html' %}
  * [Authentication, authorization, and permissions](Authentication-authorization-and-permissions.html)
  {% endunless %}{% unless page.permalink contains 'Logging-in-users.html' %}
  * [Logging in users](Logging-in-users.html)
  {% endunless %}{% unless page.permalink contains 'Third-party-login-using-Passport.html' %}
  * [Third-party login using Passport](Third-party-login-using-Passport.html)
  {% endunless %}{% unless page.permalink contains 'User-management-example.html' %}
  * [User management example](User-management-example.html)
  {% endunless %}{% unless page.permalink contains 'Tutorial-third-party-login.html' %}
  * [Tutorial: third-party login](Tutorial-third-party-login.html)
  {% endunless %}
{% endcapture %}

{% include see-also.html content=navgroup_content %}
