# loopback-component-passport

**NOTE: This module supersedes [loopback-passport](https://www.npmjs.org/package/loopback-passport). Please update your package.json accordingly.**

The module provides integration between [LoopBack](http://loopback.io) and
[Passport](http://passportjs.org) to support third-party login and account
linking for LoopBack applications.

<img src="./ids_and_credentials.png" width="600px" />

> Please see the [official documentation](http://loopback.io/doc/en/lb2/Third-party-login-using-Passport.html) for more information.

## All local accounts requires verification

### All third party accounts will login with an email of `uniqueID@loopback.provider.com` example `123456@loopback.facebook.com`

which will allow the user to link the social media accounts that they want as well as the users could sign up with the same email account that is used for facebook/twitter/google/local if they wish to keep them separate.

Facebook profile information (such as email, gender, timezone, etc) may still be included if necessary. See
https://github.com/strongloop/loopback-example-passport/blob/master/README.md#4-facebook-profile-info.

All user required info including the email will be available, but the main email for the account will remain `uniqueID@loopback.facebook.com`.
