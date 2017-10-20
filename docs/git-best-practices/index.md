# Best Practices for Using Git

[codecademy.com](https://www.codecademy.com/) has a good tutorial for how to use Git. These are some tips for how to get the most out of it, once you know how to use it.

- Always pull the latest version of the code before making changes, so that the code on your computer is up to date. (`git pull`) Otherwise you will have to deal with merging conflicting changes.
- Create a separate branch (with a short, descriptive name) for all code changes. Never push code directly to the master branch.
    - Branch names should be all lowercase, with words separated by hyphens (not spaces). For example, `drive-base-pid-updates`.
- Before you commit, double-check that you've actually added all the files you need to by typing `git status`. This will list files that have changed but haven't been added in red, and files you have already added in green. Having a file on your computer that isn't anywhere else can be a difficult problem to catch.
- A commit should represent a single logical change. Examples: updating all the PID parameters on the drivetrain could be one commit. Adding a "slow mode" where motor velocities are cut in half could be another commit. You shouldn't have both these changes in a single commit.
- Conversely, you shouldn't break a logical change into multiple commits. So, if you're changing the mappings of motor ports, just put that all in one commit&mdash;you don't need a separate commit for every port.
- Use descriptive commit messages that briefly but clearly explain what you changed. We have plenty of examples of what not to do from previous years: "Fixed Error," "everything better," and "Yeah!" are all commit messages written in 2016 by team members for the competition code. Good examples would be: "remapped motor controllers to match new board layout" or "updated PID values to fix wheel freakouts after stopping."
- If you type just `git commit` instead of `git commit -m ...`, you will get an editor for your commit message. You can put the short title of your commit as the first line, then after a blank line you have much more room to describe in detail the changes you made, if needed.

A more detailed style guide is [here](https://github.com/agis/git-style-guide/blob/master/README.md).
