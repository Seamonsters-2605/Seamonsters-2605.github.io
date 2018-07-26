# Collaborating on robot code

Now that you know how to use Git to collaborate on code (read [this](../git) if you don't), we are going to practice working together as a group to create a robot program. We'll be reimplementing most of the features from last year's competition robot.

## Instructions

Open Command Prompt and clone the practice repository by typing:

```
cd Documents
git clone https://github.com/Seamonsters-2605/practice-collaboration
```

There's now a folder in your Documents called `practice-collaboration`. Open this folder in Visual Studio Code. In the VS Code Terminal, use Git to make a new branch ([instructions if you forgot how](../git#branches)). Name it with your own name. Make sure there's no spaces or capital letters, and use `-` to separate words.

There is a robot.py file in here which we will all be editing. This has all the motors and joysticks you will need already defined in `robotInit`. Each person/group will be assigned one (or more) of these tasks.

- **Driving**
    - Move the joystick up and down to drive forward and backward, and left and right to turn. This should be at about 30% speed.
- **Conveyor**
    - Pull the trigger (button 1) to run the conveyor and intake wheels forward at full speed. Press button 2 to run them backwards.
- **Wings**
    - Press button 4 to run the left wing motor, and button 5 to run the right wing motor.

## Upload your changes

When you have finished and **tested** your code, you are ready to upload it to GitHub. Open Git Bash (if you closed it earlier, type `cd Documents/practice-teleop` to get back to the repository).

- Type `git add robot.py`. This tells Git you have changed robot.py.
- Type `git commit "description goes here"`. In the quotes, write a short sentence about what the code you added does. This will "commit" your changes.
- Type `git push -u origin your-name`. Use the same name you used earlier when you made the branch.

Now your code is online! Go to [github.com/seamonsters-2605/practice-teleop](https://github.com/Seamonsters-2605/practice-teleop), click on the Branch menu and find your name. Then click robot.py to see the code you added.

Once everybody is ready, I will merge all the changes together into a single file with every feature. Then we can move to [Round 2](#round-2).

## Round 2

Now that we have a teleop that can use all of the robot's functionality, we can add some extra features.

With Git Bash open and navigated to the repository, type `git pull` to get everybody's changes.

Choose an assignment related to a *different* system than the one you worked on! You will need to read and understand someone else's code (you can ask them for help).

- **Strafing**
    - Add buttons to make the robot move sideways
- **Slow mode and fast mode buttons**
    - Add a Slow Mode button which slows down driving, and a Fast Mode button.
