# Robot Simulator

Pyfrc has a built in robot simulator&mdash;it lets you drive a virtual robot with real joysticks. This is useful if you want to test your code, and don't have access to a robot.

## Installation instructions
- Make sure you installed all of the libraries in the [Setup Instructions](../setup#install-python-libraries)
- Open SeamonstersTemplate in Visual Studio Code and create your `robot.py` file inside. Write some robot code.
- Somewhere in your code, add a line that registers your drivetrain in the simulator like this:
```python
sea.setSimulatedDrivetrain("""put your drivetrian here""")
```
- Before starting the simulator, plug a joystick (or however many you need for your bot). It is also possible to control the robot without joysticks.
- With your file open in VS Code, switch to the Debug tab on the left (the no-bug icon). At the top of the Debug panel, change the configuration to "Simulate". Then click the green play button.
- You have a robot simulator! Drag the joystick from System Joysticks to Joystick[0] under the Joysticks tab. The joystick movement should show feedback in the window. Click the "Teleoperated" option to enable your robot and drive it around.

## Debugging the simulator in VS Code

Being able to pause the program mid-run (called 'breaking into a debugger') is one of the most important skills to develop when diving into programming. Doing so allows you to step through code line-by-line, stop at any break-point, and inspect the state of your program to test and verify the code behaves as you'd expect it to. We've created a sim configuration for VS Code to allow you to have the editor start the simulation and attach to it for you.
- Hover your mouse just to the left of the line numbers in your editor, on the first line below the line
```python
    def teleop(self):
```
- You should see a light red circle. Click your mouse and it should turn bright red. You've just set a break-point.
- In the debug panel, press the green play button.
- The simulator should start. Trigger Teleoperated mode.
- Your simulator should pause, and you should see a bar appear in the top center of VS Code. Click into VS Code.
- The buttons in the center bar allow you to step through code line by line or continue the whole program until the next breakpoint is hit.
- In the debug panel, the 'variables' tab will show you the value of variables that are accessible to the program at the current line of code. Explore what the 'self' variable represents- it's the instance of your robot that was created by wpilib!
- To stop your running process, e.g. if the simulator freezes, press the red Stop square in the debug tools panel and run it again. 
