{% include important.html content="If your application requires only a user model with `email` and `password` fields, then you can use the built-in User model for user management. Otherwise, you must create your own custom model (named something other than \"User,\" for example \"Customer\" or \"Client\") that [extends the built-in User model](Extending-built-in-models.html) rather than use the built-in User model directly.

LoopBack 2.x allows only one model in an application that is based on the User model.
" %}
