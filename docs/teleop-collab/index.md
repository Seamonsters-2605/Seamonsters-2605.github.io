# Collaborating on robot code

We will be working together to make robot teleop code with most of the features from last year's competition robot.

## Instructions

Open `Git Bash`. See [Setup Instructions](../setup#install-git) if you haven't installed Git yet.

Type `cd Documents` and press Enter. Then type `git clone https://github.com/seamonsters-2605/practice-teleop`

> You have just "cloned" a "repository" from GitHub. A repository holds code that multiple people can collaborate on. You now have a new folder in your Documents folder called "practice-teleop" which contains this code. You will be able to add your own code and upload it so that everybody else can get your changes (sort of like collaborating on a document with Google Docs).

Type `cd practice-teleop` to go to the new repository you just cloned. Then type `git checkout -b your-name`. Use your own name instead of `your-name`. Make sure there are no spaces or capital letters. Use `-` to separate words.

> This created a new "branch." While everybody is working on their own changes to the code, this means you can make your changes without them interfering with other people's changes.

There is a robot.py file in here which we will all be editing. This has all the motors and joysticks you will need already defined in `robotInit`. Each person/group will be assigned one (or more) of these tasks. Click the link to see more information.
- [Driving](#driving)
- [Climbing](#climbing)
- [Shooting](#shooting)
- [Ball feeder](#ball-feeder)
- [Gear light](#gear-light)
- [Shake button](#shake-button)

When you finish, skip to [Upload your changes](#upload-your-changes).

## Specific instructions

specific instructions to each assignment will go here.

### Driving

### Climbing

### Shooting

### Ball Feeder

### Gear Light

### Shake Button

## Upload your changes

When you have finished and **tested** your code, you are ready to upload it to GitHub. Open Git Bash (if you closed it earlier, type `cd Documents/practice-teleop` to get back to the repository).

- Type `git add robot.py`. This tells Git you have changed robot.py.
- Type `git commit "description goes here"`. In the quotes, write a short sentence about what the code you added does. This will "commit" your changes.
- Type `git push -u origin your-name`. Use the same name you used earlier when you made the branch.

Now your code is online! Go to [github.com/seamonsters-2605/practice-teleop](https://github.com/Seamonsters-2605/practice-teleop), click on the Branch menu and find your name. Then click robot.py to see the code you added.

Once everybody is ready, I will merge all the changes together into a single file with every feature. Then we can move to [Round 2](#round-2).

## Round 2

Now that we have a teleop that can use all of the robot's functionality, we can add some extra features.

- [Slow mode and fast mode buttons]()
- more things will go here
