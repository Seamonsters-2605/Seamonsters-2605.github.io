# Learning Git

We will be practicing Git today. Git is "version control" software&mdash;it remembers the history of all of your code files, and it lets you synchronize changes to code with multiple team members working at once.

A Git **repository** holds all the files for your project. GitHub is a website that hosts Git repositories online, so anyone can download the files and contribute changes from anywhere.

To practice Git you will start by making your own personal repository on GitHub.

- Log in to github.com
- Click the `+` in the top right corner and choose `New repository`
- Type a name and optional description. Make it Public, choose to add a README, and don't add a .gitignore or license.
- Choose Create repository

You have a public repository now! It's availible for anyone to view at `github.com/your-name/your-repository-name`. You'll see a list of files&mdash;right now there's just one, `README.md` where you can put information to introduce your project.

Now you are going to **clone** the repository to your computer. This not only downloads all the files, but links them with Git to the repository on GitHub, so any changes you make can be "pushed" online and "pulled" back to your computer.

- Click the green "Clone or download" button to the right of the repository page. You will see a link that starts with `https://github.com/....`. Click the clipboard button to the right of this to copy the link. (there have been problems in the past with manually selecting this text and copying it).
- Open Command Prompt. Type `cd Documents` and press enter. This will navigate to your Documents folder.
- Type `git clone ` followed by a space, then paste the link you copied and press enter.

If it worked you should see something like this:

```
Cloning into 'test-repository'...
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
```

- Now start Visual Studio Code, and choose *Open folder*. In your Documents you should find a new folder with the name of your repository. Open this folder in Code, and you will see the single `README.md` file.
- Write something nice in the README and save it.
- Open the Integrated Terminal in VS Code (View menu). Type `git status`.

Notice that `README.md` is highlighted in red and listed under "Untracked files". This means that the file has been modified with changes that haven't been saved in the repository yet.

Git keeps track of the history of the repository in the form of **commits**, which are discrete changes to the files in your repository. Since you have modified README, you need to *commit* your changes to make them a permanent part of your repository.

- Type `git add README.md`. This adds the file to the list of changes you will commit. The commit has not been made yet.
- Type `git status` again. README is now highlighted in green and listed under "Changes to be committed".
- Type `git commit -m "Your message goes here"`. In the quotes, write a short sentence about the changes you made. As you look through the history of your repository, you will see this message next to each commit, which can help you identify when important changes were made. So the message should be specific but concise.

Type `git status` again. You will see a different message. README is no longer listed, because all changes to it have been committed. But now it says: `Your branch is ahead of 'origin/master' by 1 commit.`.

This means that although you have made the commit on your computer, it isn't online on GitHub yet. Nobody else can see the changes you made, and if your computer breaks they will be lost forever. You can fix this by typing `git push`. (you'll need your GitHub username and password).

Once this has finished successfully, in your web browser refresh the page for your repository. You'll see everything you added to the README file on the front page. And if you click the text that says "2 commits," you can see the history of all the changes you made, which so far is only 2 commits long (the first was automatically made by GitHub when you created the repository).

Now try adding another file! It can be written text, a Python file, or anything else (try to stick to plain text, Git works best with text). You can add, commit, and push this new file the same way you did with changes to README.

## Branches

Branches are a powerful feature of Git. If you're working on changes to the code that are experimental, not fully tested, or could potentially cause conflicts with other people's work, you'll want them on a separate **branch**. You can make commits to this branch without them affecting the main "master" branch. And commits to the "master" branch will not affect your branch, so you don't have to worry about your code suddenly breaking.

You can imagine the series of commits you've made over the course of a project as points on a timeline, and branches as separate lines that branch off the main one. You actually don't have to imagine this: GitHub will graph it for you! [Here's](https://github.com/Seamonsters-2605/CompetitionBot2018/network) an example from last year's competition code. Click and drag to scroll through it, and hover over the dots to see the commits.

When you are confident enough in your changes that you want them on the master branch, you can **merge** the branches together. The extra commits you made on the separate branch will be added to the master branch. Even if the master branch has been changed since you branched from it, Git will try to find a way to merge the changes together (and if it can't, it will ask you to do it yourself).

Let's practice branches:

- In VS Code Terminal with your repository open, type `git branch name-of-your-branch`. Name it whatever you want (it should be descriptive of its purpose. In general, use `-` to separate words and no capitals).
- Now type `git checkout name-of-your-branch`. You are now on the branch you created. You can check what branch you're on at any time by typing `git status`.
- Make some changes, add them, and commit them. When you push them, use the command `git push -u origin name-of-your-branch`. The extra pieces of this command will create the branch on GitHub as well, and link the branch on your computer to GitHub. In the future you can just use `git push`.

In your web browser, refresh the page for your repository. You will still see the files from your master branch, without the new changes you made. But you can click the "Branch" dropdown to view a different branch. If you check your new branch you can see that the changes you made are there.

Now we'll merge the changes back to the master branch:

- Type `git checkout master` to switch back to the master branch. Look at the repository folder&mdash;notice the changes you made are gone.
- Type `git merge name-of-your-branch`. If you check the repository folder now, your changes should have been merged.
- Now type `git push`, and the branches will merge on GitHub also.

## Collaborating on a repository

The most important feature of git is its ability to allow multiple people to collaborate on a single repository.

I've created a repository that we can practice collaborating with: [https://github.com/Seamonsters-2605/git-practice](https://github.com/Seamonsters-2605/git-practice). Clone this repository to your computer and practice committing to it.

If multiple people try to commit at once, you'll run into a problem. GitHub won't let you push unless you have all of the existing commits from the repository. You'll see an error message like `Updates were rejected because the remote contains work that you do not have locally. This is usually caused by another repository pushing to the same ref.` You can remedy this with the command `git pull`, which brings all the changes that others have made back to your local copy of the repository.

At this point Git will need to merge the changes other people made with the changes you made. It might open up a file in VS Code and ask you to enter a commit message. You can just close this file to keep the default message it generates. This will allow Git to finish pulling changes from the repository. After this, you should be able to push.

For now, we're embracing the chaos. Edit the text file in master and push your changes. If you get errors, pull and sort out the merge conflict and then recommit/push.

But since this is a complicated process, especially when there are many people working at once, it's much easier to work on your changes on a separate branch.

When merging your branch back onto the master, you might get conflicts if the master has been changed since you pulled.
