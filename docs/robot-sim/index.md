# Robot Simulator

Pyfrc has a built in robot simulator&mdash;it lets you drive a virtual robot with real joysticks. This is useful if you want to test your code, and don't have access to a robot.

## Installation instructions
- Make sure you installed all of the libraries in the [Setup Instructions](../setup#install-python-libraries)
- Open Command Prompt and type these commands:
```
cd Documents
git clone https://github.com/seamonsters-2605/SeamonstersTemplate
```
> This will navigate to your Documents folder and download a repository hosted on GitHub called [SeamonstersTemplate](https://github.com/seamonsters-2605/SeamonstersTemplate). This is a template that we use for robot development, including some Python libraries we have developed over the years.
- Open SeamonstersTemplate in Visual Studio Code and create your `robot.py` file inside. Write some robot code.
- At the bottom of your `robot.py`, modify the last two lines:
```python
if __name__ == '__main__':
    wpilib.run(MyRobot, physics_enabled=True)
```
- Before starting the simulator, plug in 2 joysticks. It is also possible to control the robot without joysticks.
- Open the Terminal in VS Code, and type `python robot.py sim`.
- You have a robot simulator! The joystick movement should show feedback in the window. Click the "Teleoperated" option to enable your robot and drive it around. If you don't have joysticks, click in the X/Y axis boxes below Stick 0 and Stick 1.

## Debugging the simulator in VS Code

Being able to pause the program mid-run (called 'breaking into a debugger') is one of the most important skills to develop when diving into programming. Doing so allows you to step through code line-by-line, stop at any break-point, and inspect the state of your program to test and verify the code behaves as you'd expect it to. We've created a sim configuration for VS Code to allow you to have the editor start the simulation and attach to it for you. 
- With your robot.py file open, click on the Debugger icon on the left panel of VS Code (It's the no-bug icon)
- In the top of the Debug panel, you should see the configuration is set to 'wpilib simulate'
- Hover your mouse just to the left of the line numbers in your editor, on the first line below the line
```python
    def teleopPeriodic(self):
```
- You should see a light red circle. Click your mouse and it should turn bright red. You've just set a break-point.
- In the debug panel, press the green arrow.
- The simulator should start. Trigger Teleoperated mode.
- Your simulator should pause, and you should see a bar appear in the top center of VS Code. Click into VS Code.
- The buttons in the center bar allow you to step through code line by line or continue the whole program until the next breakpoint is hit.
- In the debug panel, the 'variables' tab will show you the value of variables that are accessible to the program at the current line of code. Explore what the 'self' variable represents- it's the instance of your robot that was created by wpilib!
- To stop your running process, e.g. if the simulator freezes, press the red Stop square in the debug tools panel and run it again. 
