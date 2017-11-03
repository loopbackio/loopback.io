---
title: Navgroup layout
lang: en
tags: [contributing]
keywords:
summary: Use the navgroup layout to group related articles together
sidebar: contrib_sidebar
permalink: /doc/en/contrib/navgroups.html
toc: false
---
The `navgroup` layout adds a right-aligned "see also" box at the top
of the page.  It's just another way of adding the same set of references
to a set of pages. For pages with an automatically-generated table of contents,
the see-also box will displayed to the right of the TOC.
For an example, see [Managing users](/doc/en/lb2/Managing-users.html).

For a navgroup to work, you must specify the name of the navgroup markdown page in the `page.navgroup` property.  This must match the name of a file
in the `_includes/navgroups` directory; for example:

```
---
title: "Managing users"
lang: en
layout: navgroup
navgroup: user-mgmt
...
```

This uses the `_includes/navgroups/user-mgmt.md` file, which looks like this:

{% raw %}
```
{% capture navgroup_content %}
  {% unless page.permalink contains 'Managing-users.html' %}
  * [Managing users](Managing-users.html)
  {% endunless %}{% unless page.permalink contains 'Authentication-authorization-and-permissions.html' %}
  * [Authentication, authorization, and permissions](Authentication-authorization-and-permissions.html)
  {% endunless %}{% unless page.permalink contains 'Third-party-login-using-Passport.html' %}
  * [Third-party login using Passport](Third-party-login-using-Passport.html)
  {% endunless %}{% unless page.permalink contains 'User-management-example.html' %}
  * [User management example](User-management-example.html)
  {% endunless %}
{% endcapture %}

{% include see-also.html content=navgroup_content %}
```
{% endraw %}

The logic in the navgroup removes the link to the
current page.  That is, the see also box links only to other pages in
the navgroup (not the current page the user is viewing).

You have to create a navgroup markdown file for each navgroup you want to create.
