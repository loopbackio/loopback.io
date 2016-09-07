---
title: "Deploying your application"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Deploying-your-application.html
summary:
---

{% include content/gs-prereqs.html lang=page.lang %}

[StrongLoop Process Manager](http://strong-pm.io/) manages Node applications, providing automatic restart, cluster control, profiling, monitoring and many other features.


Get the application (in the state following the last article plus all the client files) from GitHub and install all its dependencies:

```
$ git clone https://github.com/strongloop/loopback-getting-started-intermediate.git
$ cd loopback-getting-started-intermediate
$ git checkout step7
$ npm install
```

If you've followed the tutorial this far, you have an idea of how easy it is to create and modify an application. Now, you are ready to build and deploy it with StrongLoop Process Manager.

 You'll see how to use both here.

## Running StrongLoop Process Manager

{% include note.html content="
In practice, when you're ready to deploy to production, you would install and run StrongLoop PM on your production host, then use Arc to deploy your app there. For more information, see [Setting up a production host](https://docs.strongloop.com/display/SLC/Setting-up-a-production-host)

For the purposes of this tutorial, you'll just run StrongLoop PM locally, then deploy your app to `localhost`. It all works basically the same, but there are few differences when you're actually ready to go to production. You might want to do this, for example, to test your application's behavior under clustered mode for scaling.
" %}

Run StrongLoop PM with the following command. By default, StrongLoop PM listens on port 8701\. You can change this default with the `-l` option.  See [slc pm](https://docs.strongloop.com/display/NODE/slc-pm) for more information.  Process Manager will display some information in the console as it starts:

```
$ slc pm
slc pm(51470): StrongLoop PM v5.1.0 (API v6.1.0) on port `8701`
slc pm(51470): Base folder `/Users/rand/.strong-pm`
slc pm(51470): Applications on port `3000 - service ID`
Browse your REST API at http://127.0.0.1:8701/explorer
```

## Starting Arc

Next, make sure you are in `loopback-getting-started-intermediate` directory, then start the StrongLoop Arc with the [`slc arc`](https://docs.strongloop.com/display/NODE/slc-arc) command:

```
$ cd loopback-getting-started-intermediate
$ slc arc
```

StrongLoop Arc will open in your default browser, and you'll see the login page.  Arc is free to use, but you must log in. If you haven't registered for an account, click **[Register](https://strongloop.com/register/)** on the bottom right of the **Sign In** page to do so.  See [Using Arc](https://docs.strongloop.com/display/APIS/Using-Arc) for details.

Once you log in, you'll see the StrongLoop Arc launchpad:

{% include image.html file="6848580.png" alt="" %}

## Connecting Arc to Process Manager

Click on **Process Manager** to display the Process Manager module.

Then in the Process Manager module:

1.  Click **- Add PM Host**. You'll see this:  
    {% include image.html file="9830409.png" alt="" %}
2.  Enter:
    *   `localhost` under **Strong PM**.
    *   `8701` under **Port**.

    Then click the green plug icon next to Activate to connect to that Process Manager.

3.  You'll see this:  
    {% include image.html file="9830411.png" alt="" %}

The grey connected plug indicates that Arc is now connected to that StrongLoop PM, and the "No App" indicates there is no application deployed to it.  Now you'll deploy your application.

## Building and deploying with Arc

Click **Build & Deploy** in the module selector in the title bar to display the Arc Build and Deploy module:

{% include image.html file="6848575.png" alt="" %}

Arc provides two ways to build and deploy an application: using a tar file and using a Git archive.  You're going to use a tar file, so leave the default **Tar file** selected.

1.  Click **Build** to build a tar file for the app.  You'll see a progress spinner, and then the message "Successfully built using tar file" when it completes.  Arc creates a tar file in the parent directory of your working directory.  It will display the name of the .tgz file it creates, in this case:  `../loopback-getting-started-intermediate-0.0.1.tgz`.
2.  Then, under **Deploy tar file**, enter the following:
    *   **Fully qualified path to archive**: the path to the tar file just created, for example: `/Users/rand/loopback-getting-started-intermediate-0.0.1.tgz`.
    *   **Hostname**: localhost (for real production deployment, you'd use the remote host name)
    *   **Port**: 8701
    *   **Processes**: Enter a number less than or equal to the number of processors on the system to which you're deploying; for example, 2.
3.  Click **Deploy**.  
    You'll see a progress spinner, then when the deployment completes, the message "Successfully deployed using tar file".

You can then load the application home page at [http://localhost:3001/](http://localhost:3001/) and the API explorer at [http://localhost:3001/explorer/](http://localhost:3001/explorer/).

The app is now deployed to the local Process Manager.  If you had set up StrongLoop PM on a remote production host, you'd have a production deployment with clustering and automatic restart.

<div class="sl-hidden"><strong>Non-public Information</strong><br>
  <p>Let's not show this for now. We can add later if need be.</p>
  <p><strong>Deploying with slc</strong></p>
  <p>Deploying with&nbsp;<code>slc</code>, the command-line tool, just takes two commands:&nbsp;<a href="https://docs.strongloop.com/display/NODE/slc-start" rel="nofollow">slc start</a>&nbsp;and&nbsp;<a href="https://docs.strongloop.com/display/NODE/slc-deploy"
      rel="nofollow">slc deploy</a>. Here, put in your server for&nbsp;<code><a href="http://myserver.myco.com" class="external-link" rel="nofollow">myserver.myco.com</a></code>. or use&nbsp;<code>localhost</code>&nbsp;if you don't have a remote host to
    use.</p>
  <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl"><pre class="theme: Emacs; brush: jscript; gutter: false" style="font-size:12px;">$ slc start
$ slc deploy http://myserver.myco.com:8701</pre></div>
  </div>
</div>

Next: Go to [Learn more](/doc/{{page.lang}}/lb2/Learn-more.html) for some tips on what to read next.
