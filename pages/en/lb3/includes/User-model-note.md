{% include important.html content="If your application requires only a user model with `email` and `password` fields, then you can use
the built-in User model for user management. Otherwise, you must create your own custom model (named something other than \"User,\" for example \"Customer\" or \"Client\") that [extends the built-in User model](Extending-built-in-models.html) rather than use
the built-in User model directly.

Starting with version 3.3.0, LoopBack supports applications with multiple models based on the User model.
(previous versions allowed only one). For more information, see [Access control with multiple user models](Authentication-authorization-and-permissions.html#access-control-with-multiple-user-models).
" %}
