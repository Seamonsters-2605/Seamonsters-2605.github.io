# Learning Git

We will be practicing with Git today. Git lets you share code between team members and synchronize changes to it.

A Git **Repository** holds all the files for your project. GitHub is a website that hosts Git repositories in the "cloud," so anyone can view and contribute changes from anywhere.

To practice Git you will start by making your own person repository on GitHub.

- Go to github.com
- Click the `+` in the top right corner and choose `New repository`
- Type a name and optional description. Make it Public, choose to add a README, and don't add a .gitignore or license.
- Choose Create repository

You have a public repository now! It's availible for anyone to view at `github.com/your-name/your-repository-name`. You'll see a list of files&mdash;right now there's just one, `README.md` where you can put information to introduce your project.

Now you are going to Clone the repository to your computer. This not only downloads all the files, but links them with Git to the repository on GitHub, so any changes you make can be "pushed" online and "pulled" back to your computer.

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


- Open your Documents folder in a file browser. There is now a new folder with the name of your repository, which has the single `README.md` file in your repository.
- Edit this README file. Add some information about how incredible and revolutionary your project is going to be. Save it.
- Go back to Git Bash. (If you closed the window earlier you will need to type `cd Documents` again). Type `cd your-repository-name` and press enter to navigate to your repository.
- Type `git status`.

Notice that `README.md` is highlighted in red. This means that the file has been modified with changes that haven't been saved in the repository yet.

Git keeps track of every change you make to a repository in the form of commits, which are discrete changes to the files in your repository. The entire history of your repository is split into individual commits. Since you have modified README, you need to *commit* your changes.

- Type `git add .`. This adds the file to the list of changes you will commit. The commit has not been made yet.
- Type `git commit -m "Your message goes here"`. In the quotes, write a short sentence about the changes you made. As you look through the history of your repository, you will see this message next to each commit which can help you identify when important changes were made. So the message should be specific but concise.

Type `git status` again. You will see a different message. README is no longer in red, because all changes to it have been committed. But now it says: `Your branch is ahead of 'origin/master' by 1 commit.`.

This means that, although you have made the commit on your computer, it isn't online on GitHub yet. Nobody else can see the changes you made, and if your computer breaks they will be lost forever. You can fix this by typing `git push origin master`. (you'll need your GitHub username and passwork).

Once this finished successfully, refresh the page for your repository. You'll see everything you added to the README file on the front page. And if you click the text that says "2 commits," you can see the history of all the changes you made, which so far is only 2 commits long (the first was automatically made by GitHub when you created the repository).

[continue]
