# Learning Git

We will be practicing Git today. Git lets you share code with team members and synchronize changes.

A Git **repository** holds all the files for your project. GitHub is a website that hosts Git repositories online, so anyone can view and contribute changes from anywhere.

To practice Git you will start by making your own personal repository on GitHub.

- Go to github.com
- Click the `+` in the top right corner and choose `New repository`
- Type a name and optional description. Make it Public, choose to add a README, and don't add a .gitignore or license.
- Choose Create repository

You have a public repository now! It's availible for anyone to view at `github.com/your-name/your-repository-name`. You'll see a list of files&mdash;right now there's just one, `README.md` where you can put information to introduce your project.

Now you are going to **clone** the repository to your computer. This not only downloads all the files, but links them with Git to the repository on GitHub, so any changes you make can be "pushed" online and "pulled" back to your computer.

- Click the green "Clone or download" button to the right of the repository page. You will see a link that starts with `https://github.com/....`. Click the clipboard button to the right of this to copy the link. (there have been problems in the past with manually selecting this text and copying it).
- Open Git Bash (not Git GUI). Type `cd Documents` and press enter. This will navigate to your Documents folder.
- Type `git clone ` followed by a space, then paste the link you copied by right clicking and choosing Paste (Ctrl-V doesn't work). Press enter.

If it worked you should see something like this:

```
Cloning into 'test-repository'...
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
```

- Open your Documents folder. There is now a new folder with the name of your repository, which has the single `README.md` file in your repository.
- Edit this README file. Add some information about yourself, or how incredible and revolutionary your project is going to be. Save it.
- Go back to Git Bash. (If you closed the window earlier you will need to type `cd Documents` again). Type `cd your-repository-name` and press enter to navigate to your repository.
- Type `git status`.

Notice that `README.md` is highlighted in red. This means that the file has been modified with changes that haven't been saved in the repository yet.

Git keeps track of every change you make to a repository in the form of **commits**, which are discrete changes to the files in your repository. The entire history of your repository is kept as a series of commits. Since you have modified README, you need to *commit* your changes to make them a permanent part of your repository.

- Type `git add README.md`. This adds the file to the list of changes you will commit. The commit has not been made yet.
- Type `git commit -m "Your message goes here"`. In the quotes, write a short sentence about the changes you made. As you look through the history of your repository, you will see this message next to each commit, which can help you identify when important changes were made. So the message should be specific but concise.

Type `git status` again. You will see a different message. README is no longer in red, because all changes to it have been committed. But now it says: `Your branch is ahead of 'origin/master' by 1 commit.`.

This means that although you have made the commit on your computer, it isn't online on GitHub yet. Nobody else can see the changes you made, and if your computer breaks they will be lost forever. You can fix this by typing `git push`. (you'll need your GitHub username and password).

Once this has finished successfully, in your web browser refresh the page for your repository. You'll see everything you added to the README file on the front page. And if you click the text that says "2 commits," you can see the history of all the changes you made, which so far is only 2 commits long (the first was automatically made by GitHub when you created the repository).

Now try adding another file! It can be written text, a Python file, or anything else (try to stick to plain text, Git works best with text). You can add, commit, and push this new file the same way you did with changes to README.

## Branches

Branches are a powerful feature of Git. If you're working on changes to the code that are experimental, not fully tested or could potentially cause problems, you'll want it on a separate **branch**. You can make commits to this branch without them affecting the main "master" branch. And commits to the "master" branch will not affect your branch, so you don't have to worry about your code suddenly breaking.

You can imagine the series of commits you've made over the course of a project as points on a timeline, and branches as separate lines that branch off the main one. (You actually don't have to imagine this, GitHub will graph it for you. [Here's](https://github.com/Seamonsters-2605/CompetitionBot2017/network) an example from last year's competition code. Click and drag to scroll through it, and hover over the dots to see the commits.).

When you are confident enough in your changes that you want them on the master branch, you can **merge** the branches together. The extra commits you made on the separate branch will be added to the master branch. Even if the master branch has been changed since you branched from it, Git will try to find a way to merge the changes together (and if it can't, it will ask you to do it yourself).

Let's practice branches:

- In Git Bash with your repository open, type `git branch name-of-your-branch`. Name it whatever you want (it should be descriptive of its purpose. In general, use `-` to separate words).
- Now type `git checkout name-of-your-branch`. You are now on the branch you created. You can see that the blue text in parentheses has changed from `(master)` to your branch's name.
- Make some changes, add them, and commit them. When you push them, use the command `git push -u origin name-of-your-branch`. The extra pieces of this command will create the branch on GitHub as well, and link the branch on your computer to GitHub. In the future you can just use `git push`.

In your web browser, refresh the page for your repository. You will still see the files from your master branch, without the new changes you made. But you can click the "Branch" dropdown to view a different branch. If you check your new branch you can see that the changes you made are there.

Now we'll merge the changes back to the master branch:

- Type `git checkout master` to switch back to the master branch. Look at the repository folder&mdash;notice the changes you made are gone.
- Type `git merge name-of-your-branch`. If you check the repository folder now, your changes should have been merged.
- Now type `git push`, and the branches will merge on GitHub also.

## Collaborating on a repository

add this later...