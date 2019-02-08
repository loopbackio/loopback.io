---
title: Submitting a pull request to Loopback 4
lang: en
keywords: LoopBack community, pull request, PR, loopback
tags: [contributing, community, pull request, loopback 4, Loopback 4]
sidebar: contrib_sidebar
permalink: /doc/en/contrib/submitting_a_pr.html
summary: Follow these guidelines for submitting a pull request (PR) to Loopback 4.
---

## How to submit a pull request (PR) for Loopback 4

Here is a tutorial on how to submit a pull request (PR) for loopback v4.

### 1. Log in to github

Ensure you are logged in to your user account at <https://github.com>

### 2. Fork the loopback-next repository

In your browser, navigate to : <https://github.com/strongloop/loopback-next>  .

Create your own fork of the repository, by pressing the `Fork` link on the right-hand side .

![submit_pr_fork_main_repo.png](/images/lb4/submit_pr_fork_main_repo.png)

Wait patiently as your fork is being created.

When the forking process is complete, the repository will show up as `{your user id}/loopback-next`. In my case, it is `emonddr/loopback-next` .

![submit_pr_my_forked_repo.png](/images/lb4/submit_pr_my_forked_repo.png)



### 3. Create a feature branch for your work 

Notice your repo has a `master` branch already created ( refer bottom left corner of the picture above). It is commonplace to have this branch represent the latest, clean version of this repository's content. For the purposes of your PR, let's create a feature branch with a name indicative of your changes. In my case, it is `emonddr-doc-changes`.

Click on the `down arrow` on the right-hand side of the `master` branch button.

![submit_pr_create_feature_branch_1.png](/images/lb4/submit_pr_create_feature_branch_1.png)

This brings up a small dialog for finding or creating a branch.

![submit_pr_create_feature_branch_2.png](/images/lb4/submit_pr_create_feature_branch_2.png)

Enter the `name` of your new `feature branch` in the search field. Because the branch `emonddr-doc-changes` doesn't yet exist, a menu item to create it appears below the search field. Click on the `Create branch` link.

![submit_pr_create_feature_branch_3.png](/images/lb4/submit_pr_create_feature_branch_3.png)

Your feature branch is created.

![submit_pr_create_feature_branch_4.png](/images/lb4/submit_pr_create_feature_branch_4.png)


### 4. Clone a local copy of your repository

Click on the `Clone or download` button

![submit_pr_clone_1.png](/images/lb4/submit_pr_clone_1.png)

This brings up tiny dialog with different choices : Clone with SSH, Use HTTPS, Open in Desktop, or Download Zip).

In my case, I will leave it as `Clone with SSH`, and click on the `copy to clipboard` icon on the right side of the repository url (we are going to paste this value in a terminal window soon).

![submit_pr_clone_2.png](/images/lb4/submit_pr_clone_2.png)


Open a terminal window, and navigate to the directory where you want to clone the repository. In my case, this is `/Users/dremond/git` .

(For all the terminal commands mentioned below, be sure to press the `ENTER` key.)

![submit_pr_clone_3.png](/images/lb4/submit_pr_clone_3.png)

Type `git clone ` and `Ctrl+V` to paste the github repository url currently in memory.

You should have

```
git clone git@github.com:{your user id}/{repository name}.git
```

In my case it is 

```
git clone git@github.com:emonddr/loopback-next.git
```
Wait until the cloning process completes.

![submit_pr_clone_4.png](/images/lb4/submit_pr_clone_4.png)

### 5. Navigate to your repository directory

Type 

```
cd loopback-next
```

![submit_pr_clone_5.png](/images/lb4/submit_pr_clone_5.png)

Type 

```
git status
```

and you will see that you are currently on the `master` branch.

![submit_pr_clone_6.png](/images/lb4/submit_pr_clone_6.png)

You can also see this by typing 

```
git branch -a
``` 

![submit_pr_clone_7.png](/images/lb4/submit_pr_clone_7.png)

Type `q` to quit viewing the list of branches.

### 6. Checkout your feature branch 

You want to start making changes in your feature branch and not your `master` branch, so switch to your `feature` branch.

Type 

```
git checkout emonddr-doc-changes
```


![submit_pr_clone_8.png](/images/lb4/submit_pr_clone_8.png)

You have successfully switched to your feature branch, and you can also confirm this by typing 

```
git branch -a
``` 

![submit_pr_clone_9.png](/images/lb4/submit_pr_clone_9.png)

Type `q` to quit viewing the list of branches.


### 7. Set up remote tracking 

The local copy of your repository needs to track both your remote repository and the original repository from which it was forked. By default, when cloning, a link is created back to your copy but not the original repository.

Let's find out what remotes currently exist.

Type 

```
git remote
```

![submit_pr_remote_tracking_1.png](/images/lb4/submit_pr_remote_tracking_1.png)

There should be one remote named **origin** and it points to the forked remote repository.

If a remote named **upstream** (pointing to the original remote repository) does not exist, you need to create it.

In your browser, navigate to original repository  <https://github.com/strongloop/loopback-next> and ensure that the `master` branch is selected.


![submit_pr_remote_tracking_2.png](/images/lb4/submit_pr_remote_tracking_2.png)

Click on the `Clone or download` button, leave the cloning option as `Clone with SSH` and press the `copy to clipboard` icon.

![submit_pr_remote_tracking_3.png](/images/lb4/submit_pr_remote_tracking_3.png)


Return to your terminal window and type :

```
git remote add upstream git@github.com:strongloop/loopback-next.git
```

then type :

```
git remote
```

there should now be two remotes : **origin** and **upstream**.

![submit_pr_remote_tracking_4.png](/images/lb4/submit_pr_remote_tracking_4.png)

Typing

```
git remote -v
```

provides more details.

![submit_pr_remote_tracking_5.png](/images/lb4/submit_pr_remote_tracking_5.png)

### 8. Install dependencies

The `loopback-next` has several package dependencies.

Type `npm install` to install them.

![submit_pr_npm_install_1.png](/images/lb4/submit_pr_npm_install_1.png)


### 9. Do some work in your local feature branch directory

Whether you are contributing to code or documentation, be sure to make all your changes inside in the local feature branch directory.

Be sure to read, understand, and abide by the instructions provided in [Contributing code](https://loopback.io/doc/en/contrib/code-contrib.html), [Contributing to docs](https://loopback.io/doc/en/contrib/doc-contrib.html), and
[Contributing to LoopBack](https://github.com/strongloop/loopback-next/blob/master/docs/CONTRIBUTING.md)

### 10. Verifying your code changes

Before `staging your changes` (the next step), be sure your files are free of formatting, syntax, and logical/execution errors.

To flush out any **formatting** issues in code, run `npm run lint`. If there are issues, run `npm run lint:fix`.

To flush out any **syntax** issues in code, run `npm run build`. If there are issues, fix them, and run `npm run build` again. Repeat until all issues are gone.

To flush out any **logical/execution** issues in code, run `npm run test`. This will run the existing mocha test cases, and any new test cases you have added. If there are issues, fix them, run `npm build`, and run `npm run test` again. Repeat until all issues are gone.

### 11. Verifying your documentation changes

To flush out any **formatting** issues in documentation, run `npm run lint`. If there are issues, run `npm run lint:fix`.

Documentation written in **Markdown** format needs to be compiled into **HTML** files. To flush out any layout or substitution issues ( from using 'includes' for example), run `npm run build:site`. If there are any issues, fix them and run `npm run build:site` again. 
Then `cd sandbox/loopback.io/` and run `npm start` to start a local web server that hosts the HTML documentation. 

![submit_pr_check_local_docs_1.png](/images/lb4/submit_pr_check_local_docs_1.png)


In your browser, navigate to the specified server address, click on `Docs`, click on `Loopback 4`, and verify that your document changes appear and are well-rendered.

Press `Ctrl+C` to stop the local documentation server.




### 12. Staging your changes

When you are pleased with the work you have done on the local copy of your feature branch, you will want to `stage` your changes in preparation for a `commit`.

To find out what has changed in your local copy of your feature branch, type :

```
git status
```

In my case I have :

![submit_pr_staging_1.png](/images/lb4/submit_pr_staging_1.png)

There is a new file `docs/site/submitting_a_pr.md` that is `untracked` and needs to be `staged`.

To stage all untracked files, you can type:

```
git add --all
```

To stage one untracked file at a time, you can type:

```
git add {relative path to file from root directory}
```

In my case, this would be

```
git add docs/site/submitting_a_pr.md
```

To see which files are `staged` and `unstaged`, type:

```
git status
```
![submit_pr_staging_2.png](/images/lb4/submit_pr_staging_2.png)

In my case, the file `docs/site/submitting_a_pr.md` is properly `staged`, and there are no `unstaged (untracked)` files.

### 13. Committing your changes

When you are pleased with your staged changes, it is time to create a `commit` and give it a message.

Please read the [Commit Message Format](https://loopback.io/doc/en/contrib/code-contrib-lb4.html#commit-message-guidelines) guidelines to correctly format your commit message.

To help with abiding by the rules of commit messages, please use the `commitizen` tool mentioned in the documentation above. This means will we use `git cz` instead of `git commit`.

In my case, I want the commit message to look like this:

```
docs: tutorial on how to submit a pull request to lb4
    
This tutorial shows contributors step-by-step instructions on how to submit a pull request (PR) to Loopback v4  

```

If you need the long description to span multiple lines, use `\n` characters to separate the sentences.

Let's go through the interactive prompts of `commitizen`.

Type 
```
git cz
```

The first prompt asks you to choose the `type` value: 

![submit_pr_git_cz_1.png](/images/lb4/submit_pr_git_cz_1.png)


Using the `down arrow` key, I will choose `docs` and press `ENTER`.

![submit_pr_git_cz_2.png](/images/lb4/submit_pr_git_cz_2.png)

The next prompt asks you to choose the `scope` value:

![submit_pr_git_cz_3.png](/images/lb4/submit_pr_git_cz_3.png)

In my case, I won't be specifying a scope value, so I will simply press `ENTER` to skip.

The next prompt asks you to specify the `short description` value:

![submit_pr_git_cz_4.png](/images/lb4/submit_pr_git_cz_4.png)

I specify : `tutorial on how to submit a pull request to lb4` .

![submit_pr_git_cz_5.png](/images/lb4/submit_pr_git_cz_5.png)

The next prompt asks you to specify the `long description` value:

![submit_pr_git_cz_6.png](/images/lb4/submit_pr_git_cz_6.png)

I specify : `This tutorial shows contributors step-by-step instructions on how to submit a pull request (PR) to Loopback v4`

![submit_pr_git_cz_7.png](/images/lb4/submit_pr_git_cz_7.png)


The next prompt asks if any `breaking changes` will be introduced.

![submit_pr_git_cz_8.png](/images/lb4/submit_pr_git_cz_8.png)

I specify : `N`

![submit_pr_git_cz_9.png](/images/lb4/submit_pr_git_cz_9.png)

The next prompt asks if this change affects any open issues.

![submit_pr_git_cz_10.png](/images/lb4/submit_pr_git_cz_10.png)

I specify : `N`

![submit_pr_git_cz_11.png](/images/lb4/submit_pr_git_cz_11.png)

The interactive `commitizen` prompts complete and the commit is created with a properly formatted message.

![submit_pr_git_cz_12.png](/images/lb4/submit_pr_git_cz_12.png)

To view the commit message that `commitizen` has created, you can type :

```
git log
```

![submit_pr_git_cz_13.png](/images/lb4/submit_pr_git_cz_13.png)

Press `q` to exit the list of commits.


### 14. Push commits to your remote feature branch

It is now time to push your local committed changes from your local feature branch directory to your remote feature branch; to keep them in synch.

Type :

```
git push
```

![submit_pr_git_push_1.png](/images/lb4/submit_pr_git_push_1.png)

Open your browser, and navigate to your forked repository, and you will notice the commit.

![submit_pr_git_push_2.png](/images/lb4/submit_pr_git_push_2.png)


### 15. Rebasing

Eventually your copy of the original repository will become stale, and it will be necessary to bring it up-to-date before actually creating a pull request.


In my case, the local copy of the repository is behind by several commits.

![submit_pr_rebase_1.png](/images/lb4/submit_pr_rebase_1.png)


At this point, it will be necessary to perform a `rebase` .


Checkout your master branch

```
git checkout master
```

Now we need to rebase the master branch so that it matches the upstream master branch.

```
git pull --rebase upstream master
```

Rebase is destructive and will rewrite your current master branch. This is fine because we always want the master branch to be identical to the upstream repository's master branch.

By default, Git may reject the update because it will detect that the changes are due to a rebase, so it is necessary to `force` the update.

```
git push -f origin master
```

Next we need to check out the feature branch.

```
git checkout { feature branch }

```

In my case:

```
git checkout emonddr-doc-changes
```


 Now, rebase the local feature branch with the local copy of the master branch.

```
git rebase master
```

Next we need to push the local feature branch to the remote feature branch.

```
git push -f origin { feature branch }
```

In my case:

```
git push -f origin emonddr-doc-changes
```

Now we can see that the copy of the repository is no longer behind in several commits.

The `master` branch the forked repository is `even` with original repository.

![submit_pr_rebase_3.png](/images/lb4/submit_pr_rebase_3.png)


The `feature` branch of the forked repository is 1 commit ahead of the `master` branch, and not `behind` on any number of commits.

![submit_pr_rebase_2.png](/images/lb4/submit_pr_rebase_2.png)


### 16. Squashing Commits

Squashing commits is the process of compressing many commits into one, and is a great way to keep repositories concise and clean. It is also a necessary step before actually creating a pull request.

In my case, I have 3 commits in my remote feature branch that I need to squash into one.

![submit_pr_squash_commits_1.png](/images/lb4/submit_pr_squash_commits_1.png)

Before squashing commits, ensure that you have performed the `rebase` steps described in the previous section.

Ensure that you currently have your feature branch checked out.

Type :

```
git status
```

![submit_pr_squash_commits_2.png](/images/lb4/submit_pr_squash_commits_2.png)

I do have my feature branch checked out.

Now let's rebase the feature branch off of the master branch in an interactive mode that allows us to `squash` the commits.
```
git rebase -i master
```

![submit_pr_squash_commits_3.png](/images/lb4/submit_pr_squash_commits_3.png)

The `vim` editor opens and lists my 3 commits, and some commands that are available.

Type `i` to place the editor into `INSERT` mode.

![submit_pr_squash_commits_4.png](/images/lb4/submit_pr_squash_commits_4.png)

I want to keep the commit message from the first commit, so I will leave the word `pick` in front of the first commit, and change the words from `pick` to `squash` for the second and third commits. (Use the `arrow` keys to move around, and the `delete` or `backspace` key for deleting characters)

![submit_pr_squash_commits_5.png](/images/lb4/submit_pr_squash_commits_5.png)

To save these changes, press the `escape` key, and type:

```
:wq
```
![submit_pr_squash_commits_6.png](/images/lb4/submit_pr_squash_commits_6.png)

The `vim` editor comes up again to give me a chance to change my commit message.
You'll notice that because I previously chose `squash` for the second and third commits, it appended the commit messages of the second and third commits onto the commit message of the first.

![submit_pr_squash_commits_7.png](/images/lb4/submit_pr_squash_commits_7.png)

This can give a user a chance to view all messages before forumating one final message.

If I had a large number of commits and didn't want all commit messages to be appended together, I would have specified: `pick, fixup, fixup` instead of `pick, squash, squash` . The command `fixup` is like `squash`, except that it discards a commit's log message.

In my case, I only like the message of the first commit, so I will delete the others.

Press `i` to place the editor into `INSERT` mode, and prepare the single commit message.

![submit_pr_squash_commits_8.png](/images/lb4/submit_pr_squash_commits_8.png)

To save these changes, press the `escape` key, and type:

```
:wq
```

The interactive `rebase` command finally completes.

![submit_pr_squash_commits_9.png](/images/lb4/submit_pr_squash_commits_9.png)


Now it is time to push the changes from the local feature branch to the remote feature branch.

Type : 

```
git push -f
```

You can confirm that there is only 1 commit by typing:

```
git log
```

![submit_pr_squash_commits_11.png](/images/lb4/submit_pr_squash_commits_11.png)

or via your browser in your remote feature branch.

![submit_pr_squash_commits_10.png](/images/lb4/submit_pr_squash_commits_10.png)


### 17. Creating the pull request (PR)

Now that you have completed the `rebase` and `commit squashing` steps, it is finally time to create the pull request.

In your browser, navigate to your remote `feature` branch, and press the `Compare & pull request` button. 

![submit_pr_create_pr_1.png](/images/lb4/submit_pr_create_pr_1.png)

The short and long description fields of the pull request are auto-filled using the short and long description of your commit.

![submit_pr_create_pr_2.png](/images/lb4/submit_pr_create_pr_2.png)

Fill in as much extra information as possible to properly describe the purpose of the pull request ( for example, fixing a specific bug or implementing an extension point, etc).

(The title of the pull request should start with “WIP” for “work in progress” when the pull request is not complete yet.)

 Press the `Create pull request` button.



![submit_pr_create_pr_3.png](/images/lb4/submit_pr_create_pr_3.png)

The pull request is created, and some continuous integration jobs commence.

![submit_pr_create_pr_4.png](/images/lb4/submit_pr_create_pr_4.png)

Make certain all these jobs complete successfully.

### 18. Agreeing to the contributor license agreement (CLA)

You must agree to the contributor license agreement (CLA) before the pull request can be `merged`. Please read
[Agreeing to the CLA](https://loopback.io/doc/en/contrib/code-contrib.html#agreeing-to-the-cla).

### 19. Go through the PR review process

Request a code review or document review.

Add a specific committer to speed up this process. (for example, @bajtos, @raymondfeng).

The review process is iterative, so it is normal that multiple extra commits may be required until the pull request is finally accepted.


### 20. Final rebase and squashing of commits

Once the pull request is finally approved, repeat the `Rebase` and the `Squashing Commits` sections so that your pull request has a single, clean final commit and corresponding message.

Ensure all the continuous integration (CI) jobs pass successfully.

![submit_pr_final_commit_ci_jobs_pass_1.png](/images/lb4/submit_pr_final_commit_ci_jobs_pass_1.png)

### 21. Merge your pull request

 Finally `merge` your pull request changes into the `master` branch of the `strongloop/loopback-next` [repo](https://github.com/strongloop/loopback-next).


### References 

- [Getting into open source for the first time](https://www.nearform.com/blog/getting-into-open-source-for-the-first-time/)

- [Contributing code](https://loopback.io/doc/en/contrib/code-contrib.html)

- [Contributing to docs](https://loopback.io/doc/en/contrib/doc-contrib.html)

- [Contributing to LoopBack](https://github.com/strongloop/loopback-next/blob/master/docs/CONTRIBUTING.md)

- [Commit Message Format](https://loopback.io/doc/en/contrib/code-contrib-lb4.html#commit-message-guidelines) 

- [Agreeing to the CLA](https://loopback.io/doc/en/contrib/code-contrib.html#agreeing-to-the-cla)


