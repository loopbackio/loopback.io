{% include warning.html content="
Changing privileges like this is appropriate _only_ on your local development system. Never do this on a server system.
" %}

To install Node and StrongLoop , you need permissions to write to directories:

*   `/usr/local/bin` 
*   `/usr/local/lib/node_modules` 

If you see errors such as:

```
npm ERR! Error: EACCES, mkdir '/usr/local/lib/node_modules/strongloop'
...
npm ERR! Please try running this command again as root/Administrator
...
```

Then you don't have the required rights to create files or directories.  Either change the rights for the specified directories, or run the command using `sudo`.  In general, it's better to fix the directory rights as follows:

```
$ sudo chown -R $USER /usr/local
```

This command makes your user account the owner of the `/usr/local` directory. Then you won't ever have to use `sudo` to install Node or install packages globally with `npm`. For more information, see [How to Node](http://howtonode.org/introduction-to-npm).

{% include warning.html content="
**DO NOT** use the above `chown` command on the `/usr/bin` directory. Doing so can severely misconfigure your system.
" %}

If you have to use `sudo`, use the following command:

```
$ sudo npm install -g --unsafe-perm install strongloop
```
