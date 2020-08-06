## Contribution Methods

To simplify the contribution process and encourage community contribution, we are gradually switching the contribution method from Contributor License Agreement (CLA) to Developer Certificate of Origin (DCO). See [our blog about switching to DCO](https://strongloop.com/strongblog/switching-to-dco/).

Over time, most of the LoopBack repositories will be using DCO. The best way to find out is to check the `Contributing` section of the README in the repository that you want to contribute.

### Developer Certificate of Origin (DCO)
As an alternative to CLA, a Developer Ceritifcate of Origin (DCO) is a more lightweight contribution method. According to [Wikipedia](https://en.wikipedia.org/wiki/Developer_Certificate_of_Origin):

> Instead a signed legal contract, a DCO is an affirmation that the source code being submitted originated from the developer, or that the developer has permission to submit the code.

The full text of DCO can be found: https://developercertificate.org/.

#### Signing off commits using DCO
For GitHub repositories using DCO, you need to sign off each commit. To sign off, you can use the `-s` flag or adding `Signed-off-By: Name<Email>` in the commit message. For example, 

```sh
git commit -s -m "feat: my commit message"
```

You can also set up alias in `.gitconfig` to sign off automatically. To do that, you can:
- Open the file `~/.gitconfig`
- Add the following:
    ```
    [alias]
    cm = commit -s -m
    ```
- When committing a change, instead of using `git commit` command, use `git cm`. 

To amend the commit message to include the sign off, you can run:
```sh
git commit --amend -s
```

### Contributor License Agreement (CLA)

_Note: Some repositories were not migrated from CLA to DCO yet,
the information below applies only to those repositories that are still
using CLA._

Like many open source projects, you must agree to the contributor license agreement (CLA)
before we can accept (merge) your changes. See the [loopback-connector CLA](https://cla.strongloop.com/agreements/strongloop/loopback-connector).

In summary, by submitting your code or doc contributions, you are granting us a right to use
that code/content under the terms of this agreement, including providing it to
others. You are also certifying that you wrote it, and that you are
allowed to license it to us. You are not giving up your copyright in
your work. The license does not change your rights to use your own
contributions for any other purpose.

Contributor License Agreements are important because they define the
chain of ownership of a piece of software. Some companies won't allow
the use of free software without clear agreements around code ownership.
That's why many open source projects collect similar agreements from
contributors. The LoopBack CLA is based on the Apache CLA.
