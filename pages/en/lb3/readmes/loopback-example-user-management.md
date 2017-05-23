# loopback-example-user-management

```
$ git clone git@github.com:strongloop/loopback-example-user-management.git
$ cd loopback-example-user-management
$ npm install
$ node .
```

- [Project Layout](https://github.com/strongloop/loopback-example-user-management#project-layout)
- [How do you register a new user?](https://github.com/strongloop/loopback-example-user-management#how-do-you-register-a-new-user)
- [How do you send an email verification for a new user registration?](https://github.com/strongloop/loopback-example-user-management#how-do-you-send-an-email-verification-for-a-new-user-registration)
- [How do you log in a user?](https://github.com/strongloop/loopback-example-user-management#how-do-you-log-in-a-user)
- [How do you log out a user?](https://github.com/strongloop/loopback-example-user-management#how-do-you-log-out-a-user)
- [How do you perform a password reset for a registered user](https://github.com/strongloop/loopback-example-user-management#how-do-you-perform-a-password-reset-for-a-registered-user)

###### Notes
- You will need to [configure LoopBack to send email](http://loopback.io/doc/en/lb3/Email-connector.html) for email related features
- If you're using GMail, you can simply [replace the user and pass](https://github.com/strongloop/loopback-example-user-management/blob/master/server/datasources.json#L19-L20) with your own credentials.
- With GMail, you might need to temporarily allow "less secure" apps to access you email account. See [Allowing less secure apps to access your account](https://support.google.com/accounts/answer/6010255) for more information.

## Project Layout
- `common/models` contains the extended user files. `user.js` contains the logic for sending emails and password reset, while `user.json` contains the model definition.
- `server/boot/authentication.js` enables authentication middleware with the `enableAuth()` method. It's this middleware that finds the access token id string (usually from the query string) and appends entire token instance onto the express request object as `req.accessToken`. From there, you can find the user's ID: `req.accessToken.userId` (used in the `routes.js` file, see directly below).
- `server/boot/routes.js` contains all the routing logic. In this example, we have used [Express](http://expressjs.com/) to configure the routing since each LoopBack app is an extended version of an Express app.
- `server/views`contains all the views (or pages) rendered by Express using the [EJS templating framework](http://www.embeddedjs.com/)
- `server/datasources.json` contains the datasource configurations. Here is where we add an email datasource.
- `server/model-config.json` contains the all the model configurations. Here is where we configure the extended user model (lowercase 'u') and the email model. The rest of the models are all built-in LoopBack models.

###### Note
All other files have not been modified from their defaults.

## How do you register a new user?
1. Create a [form](https://github.com/strongloop/loopback-example-user-management/blob/master/server/views/login.ejs#L21-L36) to gather sign up information
2. Create a [remote hook](https://github.com/strongloop/loopback-example-user-management/blob/master/common/models/user.js#L5-L35) to [send a verification email](https://github.com/strongloop/loopback-example-user-management/blob/master/common/models/user.js#L9-L34)

###### Notes
- Upon execution, [`user.verify`](https://github.com/strongloop/loopback-example-user-management/blob/master/common/models/user.js#L19) sends an email using the provided [options](https://github.com/strongloop/loopback-example-user-management/blob/master/common/models/user.js#L9-L17)
- The verification email is configured to [redirect the user to the `/verified` route](https://github.com/strongloop/loopback-example-user-management/blob/master/common/models/user.js#L15) in our example. For your app, you should configure the redirect to match your use case
- The [options](https://github.com/strongloop/loopback-example-user-management/blob/master/common/models/user.js#L9-L17) are self-explanatory except `type`, `template` and `user`
  - `type` - value must be `email`
  - `template` - the path to the template to use for the verification email
  - `user` - when provided, the information in the object will be used in the verification link email

## How do you send an email verification for a new user registration?
See [step 2](https://github.com/strongloop/loopback-example-user-management#how-do-you-register-a-new-user) in the previous question

## How do you log in a user?
1. Create a [form to accept login credentials](https://github.com/strongloop/loopback-example-user-management/blob/master/server/views/login.ejs#L2-L17)
2. Create an [route to handle the login request](https://github.com/strongloop/loopback-example-user-management/blob/master/server/boot/routes.js#L20-L41)

## How do you log out a user?
1. Create a [logout link with the access token embedded into the URL](https://github.com/strongloop/loopback-example-user-management/blob/master/server/views/home.ejs#L4)
2. Call [`User.logout`](https://github.com/strongloop/loopback-example-user-management/blob/master/server/boot/routes.js#L45) with the access token

###### Notes
- We use the LoopBack token middleware to process access tokens. As long as you provide `access_token` in the query string of URL, the access token object will be provided in `req.accessToken` property in your route handler

## How do you perform a password reset for a registered user?
1. Create a [form to gather password reset info](https://github.com/strongloop/loopback-example-user-management/blob/master/server/views/login.ejs#L40-L51)
2. Create an [endpoint to handle the password reset request](https://github.com/strongloop/loopback-example-user-management/blob/master/server/boot/routes.js#L52-L66). Calling `User.resetPassword` ultimately emits a `resetPasswordRequest` event and creates a temporary access token
3. Register an event handler for the `resetPasswordRequest` that sends an email to the registered user. In our example, we provide a [URL](https://github.com/strongloop/loopback-example-user-management/blob/master/common/models/user.js#L40-L41) that redirects the user to a [password reset page authenticated with a temporary access token](https://github.com/strongloop/loopback-example-user-management/blob/master/server/boot/routes.js#L68-L74)
4. Create a [password reset form](https://github.com/strongloop/loopback-example-user-management/blob/master/server/views/password-reset.ejs#L2-L17) for the user to enter and confirm their new password
5. Create an [endpoint to process the password reset](https://github.com/strongloop/loopback-example-user-management/blob/master/server/boot/routes.js#L76-L99)

- For the `resetPasswordRequest` handler callback, you are provided with an [`info`](https://github.com/strongloop/loopback-example-user-management/blob/master/common/models/user.js#L38) object which contains information related to the user that is requesting the password reset. Note that this example is set up to send an initial email to yourself (the FROM and TO fields are the same). You will eventually want to change the address in the FROM field.

---

[More LoopBack examples](https://loopback.io/doc/en/lb3/Tutorials-and-examples.html)
